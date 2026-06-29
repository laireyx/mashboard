import { useMemo } from 'react';
import type { MapleStorySchedulerCharacterStateResponse } from '../../../modules/openapi/scheduler';
import {
  getBossContentStatus,
  getProgressContentStatus,
  getRegisteredBossContents,
  getRegisteredProgressContents,
  type AggregatedBossContent,
  type RegisteredProgressContent,
} from '../../../modules/openapi/schedulerDashboard';
import * as styles from './RoutineTaskBoard.css';
import { ScheduleListCard } from './ScheduleListCard';
import { BossTaskListItem } from './TaskList/Boss';
import { RoutineTaskListItem } from './TaskList/Routine';

interface RoutineTaskBoardProps {
  schedulerState?: MapleStorySchedulerCharacterStateResponse;
}

function routineRank(routineContent: RegisteredProgressContent) {
  const completionOffset =
    getProgressContentStatus(routineContent.content) === 'complete' ? 2 : 0;

  if (routineContent.kind === 'weekly') {
    return 1 + completionOffset;
  }

  return completionOffset;
}

function sortRoutineContents(contents: RegisteredProgressContent[]) {
  return [...contents].sort((first, second) => {
    const rankDifference = routineRank(first) - routineRank(second);

    if (rankDifference !== 0) {
      return rankDifference;
    }

    return first.order - second.order;
  });
}

function sortBossContents(contents: AggregatedBossContent[]) {
  return [...contents].sort((first, second) => {
    const firstStatus = getBossContentStatus(first);
    const secondStatus = getBossContentStatus(second);

    if (firstStatus !== secondStatus) {
      return firstStatus === 'complete' ? 1 : -1;
    }

    return first.order - second.order;
  });
}

export function RoutineTaskBoard({ schedulerState }: RoutineTaskBoardProps) {
  const routineContents = useMemo(
    () => sortRoutineContents(getRegisteredProgressContents(schedulerState)),
    [schedulerState],
  );
  const bossContents = useMemo(
    () => sortBossContents(getRegisteredBossContents(schedulerState)),
    [schedulerState],
  );

  return (
    <section className={styles.boardLayout}>
      <ScheduleListCard
        ariaLabel="Registered daily and weekly schedule"
        eyebrow="Daily / Weekly"
        isEmpty={routineContents.length === 0}
        title="일반 일정"
      >
        {routineContents.map((routineContent) => (
          <RoutineTaskListItem
            key={`${routineContent.content.content_name ?? 'untitled'}`}
            routineContent={routineContent}
          />
        ))}
      </ScheduleListCard>
      <ScheduleListCard
        ariaLabel="Registered boss schedule"
        eyebrow="Boss"
        isEmpty={bossContents.length === 0}
        title="보스 일정"
      >
        {bossContents.map((bossContent) => (
          <BossTaskListItem
            key={`boss-${bossContent.contents[0].content_name ?? bossContent.order}`}
            bossContent={bossContent}
          />
        ))}
      </ScheduleListCard>
    </section>
  );
}
