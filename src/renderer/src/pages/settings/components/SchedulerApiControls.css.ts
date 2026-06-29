import { globalStyle, style } from '@vanilla-extract/css';

export const apiControls = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(210px, 1.2fr) minmax(190px, 1fr) auto',
  gap: 12,
  alignItems: 'end',
  minWidth: 0,
  '@media': {
    '(max-width: 1180px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const statusBlock = style({
  display: 'grid',
  gap: 5,
  minWidth: 0,
  '@media': {
    '(max-width: 1180px)': {
      gridColumn: '1 / -1',
    },
  },
});

export const field = style({
  display: 'grid',
  gap: 5,
  minWidth: 0,
});

export const errorText = style({
  color: '#a33a2f',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const fetchButton = style({
  height: 38,
  minWidth: 92,
  border: 0,
  borderRadius: 8,
  padding: '0 14px',
  color: '#ffffff',
  background: '#2f765d',
  fontWeight: 850,
  selectors: {
    '&:disabled': {
      background: '#84928b',
    },
  },
});

globalStyle(`${statusBlock} strong`, {
  fontSize: '1rem',
});

globalStyle(`${statusBlock} span:last-child`, {
  color: '#697064',
  fontSize: '0.78rem',
});

globalStyle(`${statusBlock} ${errorText}`, {
  color: '#a33a2f',
});

globalStyle(`${field} span`, {
  color: '#697064',
  fontSize: '0.78rem',
});

globalStyle(`${field} input`, {
  width: '100%',
  minWidth: 0,
  height: 38,
  border: '1px solid rgba(32, 35, 31, 0.14)',
  borderRadius: 7,
  padding: '0 10px',
  color: '#20231f',
  background: 'rgba(255, 255, 255, 0.86)',
  font: 'inherit',
});

globalStyle(`${field} input:focus`, {
  borderColor: '#2f765d',
  outline: '2px solid rgba(47, 118, 93, 0.16)',
});

globalStyle(`${field} input:disabled`, {
  color: '#8c9187',
});
