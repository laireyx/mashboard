import {
  FILTER_KEY_CAPTURE_REGION_HEIGHT,
  FILTER_KEY_CAPTURE_REGION_WIDTH,
  getFilterKeyCaptureSearchRegion,
  type FilterKeyCaptureRegion,
} from './filterKeyCaptureRoi';

export interface FilterKeyCaptureMatch {
  averageDistance: number;
  region: FilterKeyCaptureRegion;
}

let searchCanvas: HTMLCanvasElement | undefined;

export function findBestFilterKeyCaptureRegion(
  video: HTMLVideoElement,
  template: ImageData,
): FilterKeyCaptureMatch | undefined {
  const searchRegion = getFilterKeyCaptureSearchRegion(video);

  if (!searchRegion) {
    return undefined;
  }

  searchCanvas ??= document.createElement('canvas');
  searchCanvas.width = searchRegion.width;
  searchCanvas.height = searchRegion.height;

  const searchContext = searchCanvas.getContext('2d', {
    willReadFrequently: true,
  });

  if (!searchContext) {
    return undefined;
  }

  searchContext.imageSmoothingEnabled = false;
  searchContext.drawImage(
    video,
    searchRegion.sourceX,
    searchRegion.sourceY,
    searchRegion.width,
    searchRegion.height,
    0,
    0,
    searchRegion.width,
    searchRegion.height,
  );

  let searchImageData: ImageData;

  try {
    searchImageData = searchContext.getImageData(
      0,
      0,
      searchRegion.width,
      searchRegion.height,
    );
  } catch {
    return undefined;
  }

  let bestTotalDistance = Number.POSITIVE_INFINITY;
  let bestX = 0;
  let bestY = 0;
  const maxCandidateX = searchRegion.width - template.width;
  const maxCandidateY = searchRegion.height - template.height;

  for (let y = 0; y <= maxCandidateY; y++) {
    for (let x = 0; x <= maxCandidateX; x++) {
      const totalDistance = getTemplateTotalDistance(
        searchImageData.data,
        searchRegion.width,
        template.data,
        x,
        y,
        bestTotalDistance,
      );

      if (totalDistance < bestTotalDistance) {
        bestTotalDistance = totalDistance;
        bestX = x;
        bestY = y;
      }
    }
  }

  const averageDistance =
    bestTotalDistance /
    (FILTER_KEY_CAPTURE_REGION_WIDTH * FILTER_KEY_CAPTURE_REGION_HEIGHT * 3);

  return {
    averageDistance,
    region: {
      height: FILTER_KEY_CAPTURE_REGION_HEIGHT,
      sourceX: searchRegion.sourceX + bestX,
      sourceY: searchRegion.sourceY + bestY,
      videoHeight: searchRegion.videoHeight,
      videoWidth: searchRegion.videoWidth,
      width: FILTER_KEY_CAPTURE_REGION_WIDTH,
    },
  };
}

function getTemplateTotalDistance(
  searchData: Uint8ClampedArray,
  searchWidth: number,
  templateData: Uint8ClampedArray,
  candidateX: number,
  candidateY: number,
  maxTotalDistance: number,
) {
  let totalDistance = 0;

  for (let y = 0; y < FILTER_KEY_CAPTURE_REGION_HEIGHT; y++) {
    for (let x = 0; x < FILTER_KEY_CAPTURE_REGION_WIDTH; x++) {
      const searchOffset =
        ((candidateY + y) * searchWidth + candidateX + x) * 4;
      const templateOffset = (y * FILTER_KEY_CAPTURE_REGION_WIDTH + x) * 4;

      totalDistance += Math.abs(
        (searchData[searchOffset] ?? 0) - templateData[templateOffset],
      );
      totalDistance += Math.abs(
        (searchData[searchOffset + 1] ?? 0) - templateData[templateOffset + 1],
      );
      totalDistance += Math.abs(
        (searchData[searchOffset + 2] ?? 0) - templateData[templateOffset + 2],
      );

      if (totalDistance >= maxTotalDistance) {
        return totalDistance;
      }
    }
  }

  return totalDistance;
}
