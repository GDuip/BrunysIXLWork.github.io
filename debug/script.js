        
        class PerformanceMonitor {
  constructor() {
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.fps = 0;
    this.cpuUsage = 0;
  }

  getCPUUsage() {
    try {
      const cpuEntries = performance.getEntriesByType('measure');
      const cpuEntry = cpuEntries[0];
      return cpuEntry ? cpuEntry.duration : 0;
    } catch (error) {
      console.error('Error getting CPU usage:', error);
      return 0;
    }
  }

  calculateFPS() {
    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastFrameTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFrameTime = currentTime;
    }
  }

  updateOverlay() {
    this.cpuUsage = this.getCPUUsage();
    const fpsRate = this.fps;

    document.getElementById('cpuUsage').textContent = `CPU Usage: ${this.cpuUsage}%`;
    document.getElementById('fpsRate').textContent = `FPS: ${fpsRate}`;
  }

  start() {
    requestAnimationFrame(() => {
      this.calculateFPS();
      this.updateOverlay();
      this.start();
    });
  }
}

const performanceMonitor = new PerformanceMonitor();
performanceMonitor.start();
