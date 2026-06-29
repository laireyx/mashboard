import { style } from '@vanilla-extract/css';

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

export const pageStack = style({
  display: 'flex',
  minHeight: 0,
  flexDirection: 'column',
  gap: 18,
});

export const pageTitle = style({
  margin: 0,
  color: '#20231f',
  fontSize: 'clamp(1.5rem, 2vw, 2rem)',
  fontWeight: 850,
  letterSpacing: 0,
});

export const cardSurface = style({
  border: '1px solid rgba(32, 35, 31, 0.1)',
  borderRadius: 8,
  background: 'rgba(255, 255, 255, 0.82)',
  boxShadow: '0 16px 46px rgba(32, 35, 31, 0.07)',
});

export const mutedText = style({
  color: '#6f766a',
  fontSize: '0.82rem',
  lineHeight: 1.5,
});

export const buttonRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 10,
});

export const primaryButton = style({
  minHeight: 38,
  border: 0,
  borderRadius: 8,
  padding: '8px 14px',
  color: '#ffffff',
  background: '#20231f',
  fontSize: '0.82rem',
  fontWeight: 850,
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
});

export const secondaryButton = style({
  minHeight: 38,
  border: '1px solid rgba(32, 35, 31, 0.14)',
  borderRadius: 8,
  padding: '8px 12px',
  color: '#20231f',
  background: '#fbfaf6',
  fontSize: '0.82rem',
  fontWeight: 850,
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
});

export const statusText = style({
  minHeight: 20,
  color: '#6f766a',
  fontSize: '0.8rem',
  fontWeight: 750,
  lineHeight: 1.45,
});

export const errorText = style([
  statusText,
  {
    color: '#9d3429',
  },
]);
