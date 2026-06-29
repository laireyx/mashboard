import { style, styleVariants } from '@vanilla-extract/css';

export const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 26,
  borderRadius: 999,
  padding: '4px 8px',
  fontSize: '0.72rem',
  fontWeight: 850,
  whiteSpace: 'nowrap',
});

export const tone = styleVariants({
  neutral: {
    color: '#464c43',
    background: '#ece9df',
  },
  info: {
    color: '#285f88',
    background: 'rgba(54, 122, 169, 0.13)',
  },
  success: {
    color: '#2f765d',
    background: 'rgba(47, 118, 93, 0.12)',
  },
  danger: {
    color: '#9d3429',
    background: 'rgba(190, 68, 53, 0.12)',
  },
  warning: {
    color: '#6d6350',
    background: 'rgba(206, 154, 48, 0.16)',
  },
});
