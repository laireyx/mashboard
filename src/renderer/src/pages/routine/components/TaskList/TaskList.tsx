import type { ReactNode } from 'react';
import { Chip, type ChipTone } from '../../../../components/common/Chip';
import * as styles from './TaskList.css';

interface TaskListProps {
  children: ReactNode;
  isEmpty: boolean;
}

interface TaskListItemViewProps {
  isComplete: boolean;
  kindLabel: string;
  kindTone: ChipTone;
  progressLabel: string;
  progressTone: ChipTone;
  title: string;
}

export function TaskListItemView({
  isComplete,
  kindLabel,
  kindTone,
  progressLabel,
  progressTone,
  title,
}: TaskListItemViewProps) {
  return (
    <li title={title}>
      <div
        className={
          isComplete
            ? `${styles.taskRow} ${styles.completedTaskRow}`
            : styles.taskRow
        }
      >
        <Chip tone={kindTone}>{kindLabel}</Chip>
        <span className={styles.taskCopy}>
          <strong>{title}</strong>
        </span>
        <Chip tone={progressTone}>{progressLabel}</Chip>
      </div>
    </li>
  );
}

export function TaskList({ children, isEmpty }: TaskListProps) {
  if (isEmpty) {
    return <p className={styles.emptyState}>표시할 일정이 없습니다.</p>;
  }

  return <ul className={styles.taskList}>{children}</ul>;
}
