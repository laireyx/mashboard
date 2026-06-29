import { globalStyle, style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  display: 'grid',
  placeItems: 'center',
  padding: 18,
  background: 'rgba(245, 243, 238, 0.34)',
});

export const modal = style({
  display: 'grid',
  gap: 12,
  width: 'min(100%, 390px)',
  border: '1px solid rgba(32, 35, 31, 0.12)',
  borderRadius: 8,
  padding: 22,
  background: 'rgba(255, 255, 255, 0.96)',
  boxShadow: '0 18px 56px rgba(32, 35, 31, 0.16)',
});

export const eyebrow = style({
  color: '#767a71',
  fontSize: '0.72rem',
  fontWeight: 850,
  letterSpacing: 0,
  textTransform: 'uppercase',
});

globalStyle(`${modal} h2, ${modal} p`, {
  margin: 0,
});

globalStyle(`${modal} h2`, {
  fontSize: '1.25rem',
  lineHeight: 1.2,
});

globalStyle(`${modal} p`, {
  color: '#697064',
  fontSize: '0.92rem',
  lineHeight: 1.55,
});

globalStyle(`${modal} button`, {
  justifySelf: 'start',
  minHeight: 38,
  border: 0,
  borderRadius: 8,
  padding: '0 14px',
  color: '#ffffff',
  background: '#2f765d',
  fontWeight: 850,
});
