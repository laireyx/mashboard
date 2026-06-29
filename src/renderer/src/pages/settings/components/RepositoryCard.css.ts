import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

export const body = style({
  display: 'grid',
  gap: 12,
  alignItems: 'start',
  minWidth: 0,
});

export const link = style({
  display: 'inline-grid',
  minHeight: 38,
  placeItems: 'center',
  border: 0,
  borderRadius: 8,
  cursor: 'pointer',
  padding: '8px 14px',
  fontSize: '0.82rem',
  fontWeight: 850,
  fontFamily: 'inherit',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  selectors: {
    '&:focus-visible': {
      outline: '2px solid rgba(47, 118, 93, 0.28)',
      outlineOffset: 2,
    },
    '&:disabled': {
      cursor: 'wait',
      opacity: 0.72,
    },
  },
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
});

export const statusTone = styleVariants({
  neutral: {
    color: '#697064',
    background: 'rgba(105, 112, 100, 0.12)',
  },
  update: {
    color: '#2f6e99',
    background: 'rgba(47, 110, 153, 0.12)',
  },
});

export const linkTone = styleVariants({
  primary: {
    color: '#ffffff',
    background: '#20231f',
  },
});

globalStyle(`${body} p`, {
  margin: 0,
  maxWidth: 620,
  color: '#697064',
  fontSize: '0.84rem',
  lineHeight: 1.55,
});
