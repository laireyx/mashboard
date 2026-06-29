import { style } from '@vanilla-extract/css';

export const field = style({
  display: 'grid',
  gap: 7,
  minWidth: 0,
});

export const label = style({
  color: '#555d52',
  fontSize: '0.78rem',
  fontWeight: 850,
  letterSpacing: 0,
});

export const input = style({
  width: '100%',
  minHeight: 38,
  border: '1px solid rgba(32, 35, 31, 0.14)',
  borderRadius: 8,
  padding: '8px 10px',
  color: '#20231f',
  background: '#fbfaf6',
  fontSize: '0.9rem',
  fontWeight: 750,
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: 'rgba(47, 118, 93, 0.55)',
      boxShadow: '0 0 0 3px rgba(47, 118, 93, 0.12)',
    },
  },
});
