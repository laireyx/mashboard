import type { AggregatedBossContent } from '../../../../modules/openapi/schedulerDashboard';
import { TaskListItemView } from './TaskList';

interface BossTaskListItemProps {
  bossContent: AggregatedBossContent;
}

export function BossTaskListItem({ bossContent }: BossTaskListItemProps) {
  const isComplete = bossContent.contents.some(
    (content) => content.complete_flag === 'true',
  );
  const title = bossContent.contents[0]?.content_name ?? 'Untitled boss';

  return (
    <TaskListItemView
      isComplete={isComplete}
      kindLabel="Boss"
      kindTone="info"
      progressLabel={isComplete ? '완료' : '미완료'}
      progressTone={isComplete ? 'success' : 'neutral'}
      title={title}
    />
  );
}
