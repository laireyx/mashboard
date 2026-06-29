import type { ReactNode } from 'react';
import { Card, CardHeader } from '../../../components/common/Card';
import * as styles from './ScheduleListCard.css';
import { TaskList } from './TaskList/TaskList';

interface ScheduleListCardProps {
  ariaLabel: string;
  children: ReactNode;
  eyebrow: string;
  isEmpty: boolean;
  title: string;
}

export function ScheduleListCard({
  ariaLabel,
  children,
  eyebrow,
  isEmpty,
  title,
}: ScheduleListCardProps) {
  return (
    <Card className={styles.scheduleListCard} aria-label={ariaLabel}>
      <CardHeader eyebrow={eyebrow} title={title} />
      <TaskList isEmpty={isEmpty}>{children}</TaskList>
    </Card>
  );
}
