import {
  createContext,
  use,
  type CSSProperties,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from 'react';
import * as styles from './index.css';

interface SegmentedRadioGroupContextValue {
  name: string;
  onValueChange: (value: string) => void;
  value: string;
}

const SegmentedRadioGroupContext =
  createContext<SegmentedRadioGroupContextValue | null>(null);

interface SegmentedRadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  children: ReactNode;
  columns?: number;
  label: ReactNode;
  name: string;
  onValueChange: (value: string) => void;
  value: string;
}

interface SegmentedRadioOptionProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  value: string;
}

function classNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(' ');
}

export function SegmentedRadioGroup({
  children,
  className,
  columns,
  label,
  name,
  onValueChange,
  style,
  value,
  ...props
}: SegmentedRadioGroupProps) {
  const columnStyle =
    columns === undefined
      ? style
      : ({
          ...style,
          '--segmented-radio-columns': columns,
        } as CSSProperties);

  return (
    <div className={classNames(styles.block, className)} {...props}>
      <span className={styles.label}>{label}</span>
      <SegmentedRadioGroupContext value={{ name, onValueChange, value }}>
        <div
          aria-label={typeof label === 'string' ? label : undefined}
          className={styles.group}
          role="radiogroup"
          style={columnStyle}
        >
          {children}
        </div>
      </SegmentedRadioGroupContext>
    </div>
  );
}

export function SegmentedRadioOption({
  children,
  className,
  value,
  ...props
}: SegmentedRadioOptionProps) {
  const context = use(SegmentedRadioGroupContext);

  if (!context) {
    throw new Error(
      'SegmentedRadioOption must be rendered inside SegmentedRadioGroup.',
    );
  }

  return (
    <label className={classNames(styles.option, className)} {...props}>
      <input
        checked={value === context.value}
        className={styles.input}
        name={context.name}
        type="radio"
        onChange={() => context.onValueChange(value)}
      />
      {children}
    </label>
  );
}
