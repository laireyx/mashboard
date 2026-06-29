import remainingTimeLabelTemplateUrl from '../assets/remaining-time-label.png';
import { findBestFilterKeyCaptureRegion } from './filterKeyCaptureMatcher';
import {
  FILTER_KEY_CAPTURE_REGION_HEIGHT,
  FILTER_KEY_CAPTURE_REGION_WIDTH,
  getFilterKeyCaptureRegion,
} from './filterKeyCaptureRoi';

export {
  FILTER_KEY_CAPTURE_REGION_HEIGHT,
  FILTER_KEY_CAPTURE_REGION_WIDTH,
  getFilterKeyCaptureRegion,
  type FilterKeyCaptureRegion,
} from './filterKeyCaptureRoi';

export interface FilterKeyCaptureConditionContext {
  sourceName: string;
  video: HTMLVideoElement;
}

const MAX_TEMPLATE_AVERAGE_RGB_DISTANCE = 34;

let templateImageData: ImageData | undefined;
let isTemplateLoadStarted = false;

export function drawFilterKeyCaptureRegion(
  video: HTMLVideoElement,
  canvasContext: CanvasRenderingContext2D,
) {
  const template = getRemainingTimeTemplateImageData();
  const match = template
    ? findBestFilterKeyCaptureRegion(video, template)
    : undefined;
  const region = match?.region ?? getFilterKeyCaptureRegion(video);

  if (!region) {
    return undefined;
  }

  canvasContext.drawImage(
    video,
    region.sourceX,
    region.sourceY,
    region.width,
    region.height,
    0,
    0,
    region.width,
    region.height,
  );

  return region;
}

export function isFilterKeyCaptureConditionMet({
  video,
}: FilterKeyCaptureConditionContext) {
  const template = getRemainingTimeTemplateImageData();

  if (!template) {
    return false;
  }

  const match = findBestFilterKeyCaptureRegion(video, template);

  return Boolean(
    match && match.averageDistance <= MAX_TEMPLATE_AVERAGE_RGB_DISTANCE,
  );
}

function getRemainingTimeTemplateImageData() {
  if (templateImageData) {
    return templateImageData;
  }

  if (isTemplateLoadStarted) {
    return undefined;
  }

  isTemplateLoadStarted = true;

  const image = new Image();

  image.onload = () => {
    const templateCanvas = document.createElement('canvas');

    templateCanvas.width = FILTER_KEY_CAPTURE_REGION_WIDTH;
    templateCanvas.height = FILTER_KEY_CAPTURE_REGION_HEIGHT;

    const templateContext = templateCanvas.getContext('2d', {
      willReadFrequently: true,
    });

    if (!templateContext) {
      return;
    }

    templateContext.drawImage(
      image,
      0,
      0,
      FILTER_KEY_CAPTURE_REGION_WIDTH,
      FILTER_KEY_CAPTURE_REGION_HEIGHT,
    );

    templateImageData = templateContext.getImageData(
      0,
      0,
      FILTER_KEY_CAPTURE_REGION_WIDTH,
      FILTER_KEY_CAPTURE_REGION_HEIGHT,
    );
  };

  image.src = remainingTimeLabelTemplateUrl;

  return undefined;
}
