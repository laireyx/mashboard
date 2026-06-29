import { style } from '@vanilla-extract/css';

export const appShell = style({
  display: 'grid',
  gridTemplateColumns: 'clamp(206px, 18vw, 260px) minmax(0, 1fr)',
  height: '100vh',
  minHeight: 0,
  overflow: 'hidden',
  background:
    'linear-gradient(135deg, rgba(194, 69, 51, 0.09), transparent 36%), linear-gradient(315deg, rgba(54, 122, 169, 0.11), transparent 38%), #f5f3ee',
  '@media': {
    '(max-width: 1080px)': {
      gridTemplateColumns: 'clamp(184px, 21vw, 206px) minmax(0, 1fr)',
    },
    '(max-width: 920px)': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto minmax(0, 1fr)',
    },
  },
});
