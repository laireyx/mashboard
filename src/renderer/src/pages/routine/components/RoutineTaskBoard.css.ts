import { style } from '@vanilla-extract/css';

export const boardLayout = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 'clamp(10px, 1.2vw, 14px)',
  alignItems: 'stretch',
  minHeight: 0,
  overflow: 'hidden',
  '@media': {
    '(max-width: 1080px)': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'minmax(0, 1fr)',
    },
  },
});
