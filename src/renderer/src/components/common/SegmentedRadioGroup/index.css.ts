import { style } from '@vanilla-extract/css';

export const block = style({
  display: 'grid',
  gap: 7,
  justifyItems: 'start',
});

export const label = style({
  color: '#555d52',
  fontSize: '0.78rem',
  fontWeight: 850,
  letterSpacing: 0,
});

export const group = style({
  display: 'inline-grid',
  gridTemplateColumns:
    'repeat(var(--segmented-radio-columns, 2), minmax(76px, 1fr))',
  gap: 4,
  border: '1px solid rgba(32, 35, 31, 0.12)',
  borderRadius: 8,
  padding: 3,
  background: '#f0eee7',
});

export const option = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 32,
  borderRadius: 6,
  padding: '6px 10px',
  color: '#5e655b',
  fontSize: '0.78rem',
  fontWeight: 850,
  selectors: {
    '&:has(input:checked)': {
      color: '#ffffff',
      background: '#20231f',
    },
    '&:focus-within': {
      boxShadow: '0 0 0 3px rgba(47, 118, 93, 0.14)',
    },
  },
});

export const input = style({
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
});
