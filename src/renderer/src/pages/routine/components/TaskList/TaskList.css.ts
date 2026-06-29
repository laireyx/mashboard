import { globalStyle, style } from '@vanilla-extract/css';

export const taskList = style({
  display: 'grid',
  minHeight: 0,
  overflowY: 'auto',
  gap: 'clamp(7px, 0.8vw, 9px)',
  margin: '16px 0 0',
  padding: 0,
  listStyle: 'none',
});

export const taskRow = style({
  display: 'grid',
  gridTemplateColumns:
    'clamp(58px, 7%, 72px) minmax(0, 1fr) clamp(72px, 9%, 92px)',
  gap: 'clamp(7px, 1vw, 10px)',
  alignItems: 'center',
  width: '100%',
  minHeight: 54,
  border: '1px solid rgba(32, 35, 31, 0.08)',
  borderRadius: 8,
  padding: '9px 10px',
  color: 'inherit',
  background: 'rgba(250, 249, 245, 0.72)',
  textAlign: 'left',
  '@media': {
    '(max-width: 1080px)': {
      gridTemplateColumns: '64px minmax(0, 1fr) 78px',
    },
    '(max-width: 920px)': {
      gridTemplateColumns: '60px minmax(0, 1fr) 76px',
    },
    '(max-width: 760px)': {
      gridTemplateColumns: '56px minmax(0, 1fr) 70px',
    },
    '(max-width: 560px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
    },
  },
});

export const completedTaskRow = style({
  borderColor: 'rgba(32, 35, 31, 0.12)',
  background: 'rgba(232, 230, 222, 0.86)',
});

export const taskCopy = style({
  display: 'grid',
  gap: 3,
  minWidth: 0,
});

export const emptyState = style({
  marginTop: 16,
  border: '1px dashed rgba(32, 35, 31, 0.18)',
  borderRadius: 8,
  padding: 24,
  color: '#697064',
  background: 'rgba(250, 249, 245, 0.68)',
  textAlign: 'center',
  fontWeight: 750,
});

globalStyle(`${taskRow} > :first-child`, {
  '@media': {
    '(max-width: 560px)': {
      display: 'none',
    },
  },
});

globalStyle(`${taskCopy} strong, ${taskCopy} small`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle(`${taskCopy} small`, {
  color: '#697064',
  fontSize: '0.82rem',
});
