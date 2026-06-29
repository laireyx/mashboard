import { style } from '@vanilla-extract/css';
import { pageStack } from '../../common.css';

export const content = style([
  pageStack,
  {
    height: '100%',
    maxWidth: 760,
    overflowY: 'auto',
    paddingRight: 4,
  },
]);

export const filterCard = style({
  flexShrink: 0,
  gap: 20,
});

export const controls = style({
  display: 'grid',
  gap: 18,
});

export const delayGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 12,
  '@media': {
    '(max-width: 760px)': {
      gridTemplateColumns: '1fr',
    },
  },
});
