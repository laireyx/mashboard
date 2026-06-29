import { globalStyle, style } from '@vanilla-extract/css';

export const pageShell = style({
  minWidth: 0,
  minHeight: 0,
  height: '100vh',
  overflow: 'hidden',
  padding: 'clamp(16px, 2.2vw, 30px)',
  '@media': {
    '(max-width: 920px)': {
      height: '100%',
      padding: 16,
    },
  },
});

globalStyle(`${pageShell} h1`, {
  margin: 0,
  color: '#20231f',
  fontSize: 'clamp(1.5rem, 2vw, 2rem)',
  fontWeight: 850,
  letterSpacing: 0,
});
