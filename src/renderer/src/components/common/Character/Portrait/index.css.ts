import { style } from '@vanilla-extract/css';

const portraitSize = 64;
const sourceSize = 300;
const centerOffset = (sourceSize - portraitSize) / 2;

export const frame = style({
  display: 'block',
  width: portraitSize,
  height: portraitSize,
  overflow: 'hidden',
  flex: '0 0 auto',
});

export const image = style({
  width: sourceSize,
  height: sourceSize,
  maxWidth: 'none',
  objectFit: 'none',
  transform: `translate(-${centerOffset}px, -${centerOffset}px)`,
});
