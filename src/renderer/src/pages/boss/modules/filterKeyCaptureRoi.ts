const REMAINING_TIME_LABEL_MIN_SEARCH_OFFSET_X = -130;
const REMAINING_TIME_LABEL_MAX_SEARCH_OFFSET_X = -60;
const REMAINING_TIME_LABEL_MIN_SEARCH_OFFSET_Y = 52;
const REMAINING_TIME_LABEL_MAX_SEARCH_OFFSET_Y = 100;

export const FILTER_KEY_CAPTURE_REGION_WIDTH = 76;
export const FILTER_KEY_CAPTURE_REGION_HEIGHT = 26;

export interface FilterKeyCaptureRegion {
  height: number;
  sourceX: number;
  sourceY: number;
  videoHeight: number;
  videoWidth: number;
  width: number;
}

export function getFilterKeyCaptureRegion(video: HTMLVideoElement) {
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return undefined;
  }

  const sourceX = Math.round(
    videoWidth / 2 +
      (REMAINING_TIME_LABEL_MIN_SEARCH_OFFSET_X +
        REMAINING_TIME_LABEL_MAX_SEARCH_OFFSET_X) /
        2,
  );
  const sourceY = Math.round(
    (REMAINING_TIME_LABEL_MIN_SEARCH_OFFSET_Y +
      REMAINING_TIME_LABEL_MAX_SEARCH_OFFSET_Y) /
      2,
  );

  if (
    sourceX < 0 ||
    sourceY < 0 ||
    sourceX + FILTER_KEY_CAPTURE_REGION_WIDTH > videoWidth ||
    sourceY + FILTER_KEY_CAPTURE_REGION_HEIGHT > videoHeight
  ) {
    return undefined;
  }

  return {
    height: FILTER_KEY_CAPTURE_REGION_HEIGHT,
    sourceX,
    sourceY,
    videoHeight,
    videoWidth,
    width: FILTER_KEY_CAPTURE_REGION_WIDTH,
  };
}

export function getFilterKeyCaptureSearchRegion(video: HTMLVideoElement) {
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return undefined;
  }

  const minSourceX = Math.max(
    0,
    Math.round(videoWidth / 2 + REMAINING_TIME_LABEL_MIN_SEARCH_OFFSET_X),
  );
  const maxSourceX = Math.min(
    videoWidth - FILTER_KEY_CAPTURE_REGION_WIDTH,
    Math.round(videoWidth / 2 + REMAINING_TIME_LABEL_MAX_SEARCH_OFFSET_X),
  );
  const minSourceY = Math.max(0, REMAINING_TIME_LABEL_MIN_SEARCH_OFFSET_Y);
  const maxSourceY = Math.min(
    videoHeight - FILTER_KEY_CAPTURE_REGION_HEIGHT,
    REMAINING_TIME_LABEL_MAX_SEARCH_OFFSET_Y,
  );

  if (minSourceX > maxSourceX || minSourceY > maxSourceY) {
    return undefined;
  }

  return {
    height: maxSourceY - minSourceY + FILTER_KEY_CAPTURE_REGION_HEIGHT,
    sourceX: minSourceX,
    sourceY: minSourceY,
    videoHeight,
    videoWidth,
    width: maxSourceX - minSourceX + FILTER_KEY_CAPTURE_REGION_WIDTH,
  };
}
