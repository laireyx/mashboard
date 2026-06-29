import type { HTMLAttributes, ReactNode } from 'react';
import * as styles from './index.css';

export type ChipTone = keyof typeof styles.tone;

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: ChipTone;
}

function classNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(' ');
}

export function Chip({
  children,
  className,
  tone = 'neutral',
  ...props
}: ChipProps) {
  return (
    <span
      className={classNames(styles.chip, styles.tone[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
}
