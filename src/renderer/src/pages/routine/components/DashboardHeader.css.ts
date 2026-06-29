import { style } from '@vanilla-extract/css';

export const dashboardHeader = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  minWidth: 0,
  '@media': {
    '(max-width: 760px)': {
      alignItems: 'flex-start',
    },
  },
});

export const characterIdentity = style({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  minWidth: 0,
  flexGrow: 1,
});

export const headerTitle = style({
  display: 'grid',
  gap: 4,
  minWidth: 0,
});

export const eyebrow = style({
  color: '#767a71',
  fontSize: '0.72rem',
  fontWeight: 850,
  letterSpacing: 0,
  textTransform: 'uppercase',
});

export const titleRow = style({
  display: 'flex',
  alignItems: 'stretch',
  gap: 16,
  minWidth: 0,
  '@media': {
    '(max-width: 560px)': {
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
});

export const title = style({
  flex: 1,
  marginTop: 6,
  fontSize: 'clamp(1.65rem, 2.4vw, 2.1rem)',
  lineHeight: 1,
});

export const meta = style({
  color: '#697064',
  fontSize: '0.82rem',
});
