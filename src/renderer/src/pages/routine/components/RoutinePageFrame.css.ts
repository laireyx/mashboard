import { style } from '@vanilla-extract/css';

export const dashboardShell = style({
  position: 'relative',
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr)',
  gap: 'clamp(12px, 1.4vw, 18px)',
  height: '100vh',
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
  padding: 'clamp(16px, 2.2vw, 30px)',
  '@media': {
    '(max-width: 920px)': {
      height: '100%',
      padding: 16,
    },
  },
});

export const dashboardContent = style({
  display: 'grid',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  gap: 'clamp(12px, 1.4vw, 18px)',
  minWidth: 0,
  minHeight: 0,
});

export const lockedContent = style({
  filter: 'blur(4px)',
  pointerEvents: 'none',
  userSelect: 'none',
});
