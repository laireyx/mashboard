import { style, styleVariants } from '@vanilla-extract/css';

export const statusPill = style({
  display: 'inline-grid',
  minWidth: 76,
  minHeight: 30,
  placeItems: 'center',
  borderRadius: 7,
  padding: '0 10px',
  fontSize: '0.78rem',
  fontWeight: 850,
});

export const statusTone = styleVariants({
  idle: {
    color: '#697064',
    background: 'rgba(105, 112, 100, 0.12)',
  },
  loading: {
    color: '#2f6e99',
    background: 'rgba(47, 110, 153, 0.12)',
  },
  success: {
    color: '#2f765d',
    background: 'rgba(47, 118, 93, 0.12)',
  },
  error: {
    color: '#a33a2f',
    background: 'rgba(163, 58, 47, 0.12)',
  },
});
