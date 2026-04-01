/**
 * 青塘園守護者 - 感測器系統
 * 搖晃偵測、相機、音量、傾斜、QR碼等
 */

class SensorManager {
  constructor() {
    this.shakeThreshold = 25;
    this.shakeCount = 0;
    this._shakeCallbacks = [];
    this._motionListener = null;
    this._cameraStream = null;
  }

  // ══════════════════════════════════════════
  // 搖晃偵測
  // ══════════════════════════════════════════
  async startShakeDetection(callback) {
    // iOS 13+ 需要請求權限
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceMotionEvent.requestPermission();
        if (perm !== 'granted') {
          console.warn('[Sensor] Motion permission denied');
          return false;
        }
      } catch (e) {
        console.warn('[Sensor] Motion permission error:', e);
        return false;
      }
    }

    this.shakeCount = 0;
    this._shakeCallbacks.push(callback);

    if (!this._motionListener) {
      this._motionListener = (e) => {
        const acc = e.accelerationIncludingGravity;
        if (!acc) return;
        const force = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
        if (force > this.shakeThreshold) {
          this.shakeCount++;
          this._shakeCallbacks.forEach(fn => fn(this.shakeCount, force));
        }
      };
      window.addEventListener('devicemotion', this._motionListener);
    }
    return true;
  }

  stopShakeDetection() {
    if (this._motionListener) {
      window.removeEventListener('devicemotion', this._motionListener);
      this._motionListener = null;
    }
    this._shakeCallbacks = [];
    this.shakeCount = 0;
  }

  // 模擬搖晃（開發用 + 桌面瀏覽器替代方案）
  simulateShake() {
    this.shakeCount++;
    this._shakeCallbacks.forEach(fn => fn(this.shakeCount, 30));
  }

  // ══════════════════════════════════════════
  // 相機
  // ══════════════════════════════════════════
  async startCamera() {
    try {
      this._cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      const video = document.getElementById('camera-video');
      if (video) {
        video.srcObject = this._cameraStream;
      }
      return true;
    } catch (e) {
      console.warn('[Sensor] Camera error:', e);
      return false;
    }
  }

  stopCamera() {
    if (this._cameraStream) {
      this._cameraStream.getTracks().forEach(t => t.stop());
      this._cameraStream = null;
    }
    const video = document.getElementById('camera-video');
    if (video) video.srcObject = null;
  }

  capturePhoto() {
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');
    if (!video || !canvas) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  }

  // 簡易物件偵測（顏色分析替代 TensorFlow）
  analyzePhoto() {
    const canvas = document.getElementById('camera-canvas');
    if (!canvas) return { colors: [], hasObject: false };

    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCounts = { red: 0, green: 0, blue: 0, yellow: 0, white: 0, dark: 0 };
    const total = data.length / 4;

    for (let i = 0; i < data.length; i += 16) { // sample every 4th pixel
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r > 180 && g < 100 && b < 100) colorCounts.red++;
      else if (r < 100 && g > 150 && b < 100) colorCounts.green++;
      else if (r < 100 && g < 100 && b > 180) colorCounts.blue++;
      else if (r > 180 && g > 180 && b < 100) colorCounts.yellow++;
      else if (r > 200 && g > 200 && b > 200) colorCounts.white++;
      else if (r < 50 && g < 50 && b < 50) colorCounts.dark++;
    }

    const dominantColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .filter(([, count]) => count > total / 40)
      .map(([color]) => color);

    return {
      colors: dominantColors,
      hasObject: true, // MVP: 簡化判定，拍照即算成功
      brightness: (colorCounts.white + colorCounts.yellow) / (total / 4),
    };
  }

  // ══════════════════════════════════════════
  // 音量偵測
  // ══════════════════════════════════════════
  async startAudioDetection(callback) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let running = true;

      const check = () => {
        if (!running) return;
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const db = Math.round(avg * 100 / 256); // 簡化dB估算
        callback(db);
        requestAnimationFrame(check);
      };
      check();

      return {
        stop: () => {
          running = false;
          stream.getTracks().forEach(t => t.stop());
          ctx.close();
        }
      };
    } catch (e) {
      console.warn('[Sensor] Audio error:', e);
      return null;
    }
  }

  // ══════════════════════════════════════════
  // 傾斜偵測
  // ══════════════════════════════════════════
  async startTiltDetection(callback) {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceOrientationEvent.requestPermission();
        if (perm !== 'granted') return null;
      } catch (e) {
        return null;
      }
    }

    const handler = (e) => {
      callback({
        alpha: e.alpha || 0, // 指南針方向 0-360
        beta: e.beta || 0,   // 前後傾斜 -180~180
        gamma: e.gamma || 0, // 左右傾斜 -90~90
      });
    };

    window.addEventListener('deviceorientation', handler);
    return {
      stop: () => window.removeEventListener('deviceorientation', handler)
    };
  }

  // ══════════════════════════════════════════
  // 震動回饋
  // ══════════════════════════════════════════
  vibrate(pattern = [100]) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  // ══════════════════════════════════════════
  // 瀏覽器通知
  // ══════════════════════════════════════════
  async requestNotificationPermission() {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      return perm === 'granted';
    }
    return false;
  }

  sendNotification(title, body, icon = '🛡️') {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon });
    }
  }
}

export const sensors = new SensorManager();
