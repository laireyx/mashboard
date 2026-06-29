import { globalStyle, style } from '@vanilla-extract/css';

export const settingsShell = style({
  display: 'grid',
  gridTemplateRows: 'auto minmax(0, 1fr)',
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

export const header = style({
  display: 'grid',
  gap: 5,
});

globalStyle(`${header} h1`, {
  margin: 0,
  fontSize: 'clamp(1.65rem, 2.4vw, 2.1rem)',
  lineHeight: 1,
});

export const eyebrow = style({
  margin: 0,
  color: '#767a71',
  fontSize: '0.72rem',
  fontWeight: 850,
  letterSpacing: 0,
  textTransform: 'uppercase',
});

export const content = style({
  display: 'grid',
  gap: 14,
  alignSelf: 'start',
  justifySelf: 'start',
  minWidth: 0,
  width: 'min(100%, 720px)',
});
