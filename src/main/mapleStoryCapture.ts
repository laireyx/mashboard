import type { DesktopCapturerSource } from 'electron';
import { desktopCapturer, session } from 'electron';

function isMapleStorySource(source: DesktopCapturerSource) {
  return source.name === 'MapleStory';
}

async function findMapleStorySource() {
  const sources = await desktopCapturer.getSources({
    types: ['window'],
    fetchWindowIcons: false,
    thumbnailSize: {
      width: 0,
      height: 0,
    },
  });

  const candidates = sources.filter(isMapleStorySource);

  if (candidates.length === 0) {
    return undefined;
  }

  return candidates[0];
}

export function registerMapleStoryDisplayMediaRequestHandler() {
  session.defaultSession.setDisplayMediaRequestHandler((_request, callback) => {
    findMapleStorySource()
      .then((source) => {
        callback(source ? { video: source } : {});
      })
      .catch(() => {
        callback({});
      });
  });
}
