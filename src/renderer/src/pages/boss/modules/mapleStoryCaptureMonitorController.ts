export type MapleStoryCaptureConditionChangeHandler = (
  isMatched: boolean,
) => void;

class MapleStoryCaptureMonitorController {
  private readonly video = document.createElement('video');
  private monitorStream: MediaStream | undefined;
  private onConditionChange: MapleStoryCaptureConditionChangeHandler = () =>
    undefined;

  constructor() {
    this.video.autoplay = true;
    this.video.muted = true;
    this.video.playsInline = true;
  }

  get currentStream() {
    return this.monitorStream;
  }

  get currentVideo() {
    return this.video;
  }

  setOnConditionChange(handler: MapleStoryCaptureConditionChangeHandler) {
    this.onConditionChange = handler;
  }

  async startStream(stream: MediaStream) {
    const videoTrackSettings = stream.getVideoTracks()[0]?.getSettings();

    this.monitorStream = stream;
    this.video.srcObject = null;
    this.video.srcObject = stream;
    this.video.width = videoTrackSettings?.width ?? 0;
    this.video.height = videoTrackSettings?.height ?? 0;

    await this.video.play().catch(() => undefined);
    await this.waitForFrame();
  }

  clearStream() {
    this.monitorStream = undefined;
    this.video.srcObject = null;
  }

  notifyConditionChange(isMatched: boolean) {
    this.onConditionChange(isMatched);
  }

  private async waitForFrame() {
    await this.waitForVideoData();

    if (!this.video.requestVideoFrameCallback) {
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });
      return;
    }

    await new Promise<void>((resolve) => {
      const timeoutId = window.setTimeout(resolve, 1000);

      this.video.requestVideoFrameCallback(() => {
        window.clearTimeout(timeoutId);
        resolve();
      });
    });
  }

  private async waitForVideoData() {
    const video = this.video;

    if (
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      video.videoWidth > 0 &&
      video.videoHeight > 0
    ) {
      return;
    }

    await new Promise<void>((resolve) => {
      let timeoutId = 0;

      function cleanUp() {
        window.clearTimeout(timeoutId);
        video.removeEventListener('loadeddata', handleVideoData);
        video.removeEventListener('canplay', handleVideoData);
        resolve();
      }

      const handleVideoData = () => {
        cleanUp();
      };

      timeoutId = window.setTimeout(cleanUp, 1000);

      video.addEventListener('loadeddata', handleVideoData, {
        once: true,
      });
      video.addEventListener('canplay', handleVideoData, {
        once: true,
      });
    });
  }
}

export const mapleStoryCaptureMonitorController =
  new MapleStoryCaptureMonitorController();
