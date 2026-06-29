import type { ChipTone } from '../../../../components/common/Chip';
import type {
  RegisteredProgressContent,
  SchedulerProgressContentKind,
} from '../../../../modules/openapi/schedulerDashboard';
import { TaskListItemView } from './TaskList';

interface RoutineTaskListItemProps {
  routineContent: RegisteredProgressContent;
}

interface RoutineProgressView {
  isComplete: boolean;
  label: string;
  tone: ChipTone;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const routineKindTone = {
  daily: 'danger',
  weekly: 'warning',
} satisfies Record<SchedulerProgressContentKind, ChipTone>;

export function RoutineTaskListItem({
  routineContent,
}: RoutineTaskListItemProps) {
  const title = routineContent.content.content_name ?? 'Untitled routine';

  const { max_count = 1, now_count = 0 } = routineContent.content;
  const isComplete = max_count > 0 ? now_count >= max_count : now_count !== 0;

  return (
    <TaskListItemView
      isComplete={isComplete}
      kindLabel={capitalize(routineContent.kind)}
      kindTone={routineKindTone[routineContent.kind]}
      progressLabel={
        max_count > 0 ? `${now_count} / ${max_count}` : `${now_count || '-'}`
      }
      progressTone={isComplete ? 'success' : 'neutral'}
      title={title}
    />
  );
}
