import { style, styleVariants } from '@vanilla-extract/css';
import { cardSurface } from '../../../common.css';

export const card = style([
  cardSurface,
  {
    display: 'flex',
    minWidth: 0,
    minHeight: 0,
    flexDirection: 'column',
    gap: 18,
  },
]);

export const padding = styleVariants({
  normal: {
    padding: 'clamp(14px, 1.5vw, 18px)',
  },
  compact: {
    padding: 14,
  },
  none: {
    padding: 0,
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  minWidth: 0,
  '@media': {
    '(max-width: 760px)': {
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
});

export const eyebrow = style({
  margin: 0,
  color: '#767a71',
  fontSize: '0.72rem',
  fontWeight: 850,
  letterSpacing: 0,
  textTransform: 'uppercase',
});

export const title = style({
  margin: '8px 0 0',
  color: '#20231f',
  fontSize: '1.18rem',
  lineHeight: 1.2,
  letterSpacing: 0,
});

export const footer = style({
  display: 'grid',
  gap: 10,
});
