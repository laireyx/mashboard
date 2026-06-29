export interface MapleStoryCaptureSession {
  sourceName: string;
  stream: MediaStream;
  videoTrackLabel: string;
}

const TARGET_WINDOW_TITLE = 'MapleStory';

function stopStream(stream: MediaStream) {
  stream.getTracks().forEach((track) => {
    track.stop();
  });
}

export async function startMapleStoryWindowCapture() {
  if (!navigator.mediaDevices?.getDisplayMedia) {
    throw new Error('Display capture is unavailable in this renderer.');
  }

  const stream = await navigator.mediaDevices.getDisplayMedia({
    audio: false,
    video: true,
  });
  const videoTrackLabel = stream.getVideoTracks()[0]?.label ?? '';

  return {
    sourceName: videoTrackLabel || TARGET_WINDOW_TITLE,
    stream,
    videoTrackLabel,
  };
}

export function stopMapleStoryWindowCapture(stream: MediaStream) {
  stopStream(stream);
}
