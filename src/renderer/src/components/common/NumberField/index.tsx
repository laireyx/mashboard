import type { InputHTMLAttributes, ReactNode } from 'react';
import * as styles from './index.css';

interface NumberFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  inputClassName?: string;
  label: ReactNode;
}

function classNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(' ');
}

export function NumberField({
  className,
  inputClassName,
  label,
  ...props
}: NumberFieldProps) {
  return (
    <label className={classNames(styles.field, className)}>
      <span className={styles.label}>{label}</span>
      <input
        className={classNames(styles.input, inputClassName)}
        type="number"
        {...props}
      />
    </label>
  );
}
