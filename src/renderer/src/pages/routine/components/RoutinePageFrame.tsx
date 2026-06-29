import type { ReactNode } from 'react';
import type { MapleStorySchedulerCharacterStateResponse } from '../../../modules/openapi/scheduler';
import { DashboardHeader } from './DashboardHeader';
import { RoutineTaskBoard } from './RoutineTaskBoard';
import * as styles from './RoutinePageFrame.css';

interface RoutinePageFrameProps {
  characterImageUrl?: string;
  characterMeta?: ReactNode;
  fallbackCharacterName?: string;
  isContentBlurred?: boolean;
  overlay?: ReactNode;
  schedulerState?: MapleStorySchedulerCharacterStateResponse;
}

export function RoutinePageFrame({
  characterImageUrl,
  characterMeta,
  fallbackCharacterName,
  isContentBlurred = false,
  overlay,
  schedulerState,
}: RoutinePageFrameProps) {
  return (
    <section className={styles.dashboardShell}>
      <div
        className={
          isContentBlurred
            ? `${styles.dashboardContent} ${styles.lockedContent}`
            : styles.dashboardContent
        }
      >
        <DashboardHeader
          characterImageUrl={characterImageUrl}
          characterMeta={characterMeta}
          fallbackCharacterName={fallbackCharacterName}
          schedulerState={schedulerState}
        />
        <RoutineTaskBoard schedulerState={schedulerState} />
      </div>

      {overlay}
    </section>
  );
}
