import { globalStyle, style } from '@vanilla-extract/css';
import { cardSurface } from '../../common.css';

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(12px, 1.4vw, 18px)',
  minHeight: 0,
  overflow: 'hidden',
  borderRight: '1px solid rgba(32, 35, 31, 0.1)',
  padding: 'clamp(18px, 2vw, 24px) clamp(14px, 1.5vw, 18px)',
  background: 'rgba(255, 255, 255, 0.62)',
  '@media': {
    '(max-width: 920px)': {
      position: 'sticky',
      top: 0,
      zIndex: 5,
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr) auto',
      alignItems: 'center',
      borderRight: 0,
      borderBottom: '1px solid rgba(32, 35, 31, 0.1)',
      padding: '12px 16px',
    },
    '(max-width: 760px)': {
      gridTemplateColumns: '1fr auto',
    },
  },
});

export const brandBlock = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  gap: 12,
  minWidth: 0,
  background: 'none',
  border: 'none',

  '@media': {
    '(max-width: 920px)': {
      minWidth: 0,
    },
  },
});

export const brandLogo = style({
  width: 42,
  height: 42,
  flex: '0 0 42px',
  objectFit: 'contain',
});

export const launchButton = style({
  minWidth: 0,
  height: 36,
  border: '1px solid rgba(190, 68, 53, 0.24)',
  borderRadius: 7,
  padding: '0 12px',
  overflow: 'hidden',
  color: '#9d3429',
  background: 'rgba(190, 68, 53, 0.1)',
  fontSize: '0.84rem',
  fontWeight: 850,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media': {
    '(max-width: 920px)': {
      height: 34,
      padding: '0 10px',
      fontSize: '0.8rem',
    },
  },
});

export const eyebrow = style({
  color: '#767a71',
  fontSize: '0.72rem',
  fontWeight: 850,
  letterSpacing: 0,
  textTransform: 'uppercase',
});

export const navList = style({
  display: 'grid',
  gap: 6,
  marginTop: 6,
  '@media': {
    '(max-width: 920px)': {
      display: 'flex',
      gap: 4,
      justifyContent: 'center',
      marginTop: 0,
    },
    '(max-width: 760px)': {
      display: 'none',
    },
  },
});

export const navItem = style({
  border: 0,
  borderRadius: 7,
  padding: '10px 12px',
  color: '#565c51',
  background: 'transparent',
  textAlign: 'left',
  fontWeight: 750,
  '@media': {
    '(max-width: 920px)': {
      padding: '8px 10px',
      fontSize: '0.82rem',
    },
  },
});

export const active = style({
  color: '#9d3429',
  background: 'rgba(190, 68, 53, 0.1)',
});

export const characterCard = style([
  cardSurface,
  {
    display: 'grid',
    gap: 7,
    marginTop: 'auto',
    padding: 'clamp(12px, 1.3vw, 16px)',
    '@media': {
      '(max-width: 920px)': {
        display: 'none',
      },
    },
  },
]);

export const syncCard = style([
  cardSurface,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: 14,
    '@media': {
      '(max-width: 920px)': {
        boxShadow: 'none',
        padding: 8,
      },
    },
  },
]);

export const syncCopy = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export const iconBadge = style({
  display: 'grid',
  width: 36,
  height: 36,
  placeItems: 'center',
  border: 'none',
  borderRadius: 8,
  color: '#ffffff',
  background: '#2f765d',
  fontSize: '1rem',
  fontWeight: 900,
});

export const syncEyebrow = style({
  '@media': {
    '(max-width: 920px)': {
      display: 'none',
    },
  },
});

export const syncTime = style({
  '@media': {
    '(max-width: 920px)': {
      display: 'none',
    },
  },
});

globalStyle(`${characterCard} strong`, {
  fontSize: '1rem',
});

globalStyle(`${characterCard} span`, {
  color: '#697064',
  fontSize: '0.82rem',
});

globalStyle(`${syncCard} strong`, {
  fontSize: '1rem',
});

globalStyle(`${syncCard} span`, {
  color: '#697064',
  fontSize: '0.82rem',
});
