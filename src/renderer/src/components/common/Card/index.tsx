import type { HTMLAttributes, ReactNode } from 'react';
import * as styles from './index.css';

type CardElement = 'article' | 'aside' | 'div' | 'section';
type CardPadding = keyof typeof styles.padding;

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: CardElement;
  children: ReactNode;
  padding?: CardPadding;
}

interface CardHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  actions?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  titleId?: string;
}

interface CardTextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function classNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(' ');
}

export function CardEyebrow({ children, className, ...props }: CardTextProps) {
  return (
    <p className={classNames(styles.eyebrow, className)} {...props}>
      {children}
    </p>
  );
}

export function CardTitle({ children, className, ...props }: CardTextProps) {
  return (
    <h2 className={classNames(styles.title, className)} {...props}>
      {children}
    </h2>
  );
}

export function CardHeader({
  actions,
  className,
  eyebrow,
  title,
  titleId,
  ...props
}: CardHeaderProps) {
  return (
    <div className={classNames(styles.header, className)} {...props}>
      <div>
        {eyebrow ? <CardEyebrow>{eyebrow}</CardEyebrow> : null}
        <CardTitle id={titleId}>{title}</CardTitle>
      </div>

      {actions}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div className={classNames(styles.footer, className)} {...props}>
      {children}
    </div>
  );
}

export function Card({
  as: Element = 'section',
  children,
  className,
  padding = 'normal',
  ...props
}: CardProps) {
  return (
    <Element
      className={classNames(styles.card, styles.padding[padding], className)}
      {...props}
    >
      {children}
    </Element>
  );
}
