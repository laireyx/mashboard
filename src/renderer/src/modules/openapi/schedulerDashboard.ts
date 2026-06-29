import type {
  MapleStorySchedulerBossContent,
  MapleStorySchedulerCharacterStateResponse,
  MapleStorySchedulerProgressContent,
} from './scheduler';

export type SchedulerProgressContentKind = 'daily' | 'weekly';
export type SchedulerTaskStatus = 'complete' | 'in-progress';

export interface RegisteredProgressContent {
  content: MapleStorySchedulerProgressContent;
  kind: SchedulerProgressContentKind;
  order: number;
}

export interface AggregatedBossContent {
  contents: MapleStorySchedulerBossContent[];
  order: number;
}

export function formatCharacterMeta(
  schedulerState: MapleStorySchedulerCharacterStateResponse | undefined,
) {
  if (!schedulerState) {
    return '';
  }

  return [
    schedulerState.world_name,
    schedulerState.character_level !== undefined
      ? `Lv.${schedulerState.character_level}`
      : undefined,
    schedulerState.character_class,
  ]
    .filter(Boolean)
    .join(' · ');
}

export function getRegisteredProgressContents(
  schedulerState: MapleStorySchedulerCharacterStateResponse | undefined,
) {
  return [
    ...getRegisteredContentsByKind('daily', schedulerState?.daily_contents),
    ...getRegisteredContentsByKind('weekly', schedulerState?.weekly_contents),
  ];
}

function getRegisteredContentsByKind(
  kind: SchedulerProgressContentKind,
  contents: MapleStorySchedulerProgressContent[] = [],
): RegisteredProgressContent[] {
  return contents
    .map((content, index) => ({ content, kind, order: index }))
    .filter(({ content }) => content.registration_flag === 'true');
}

export function getRegisteredBossContents(
  schedulerState: MapleStorySchedulerCharacterStateResponse | undefined,
) {
  const aggregatedContents = new Map<string, AggregatedBossContent>();

  schedulerState?.boss_contents?.forEach((content, index) => {
    const key = content.content_name ?? `unknown-boss-${index}`;
    const currentContent = aggregatedContents.get(key);

    if (!currentContent) {
      aggregatedContents.set(key, {
        contents: [content],
        order: content.list_order_no ?? index,
      });
      return;
    }

    currentContent.contents.push(content);

    if (
      currentContent.contents[0].registration_flag !== 'true' &&
      content.registration_flag === 'true'
    ) {
      currentContent.contents[0] = content;
      currentContent.order = content.list_order_no ?? index;
    }
  });

  return [...aggregatedContents.values()]
    .filter((bossContent) =>
      bossContent.contents.some(
        (content) => content.registration_flag === 'true',
      ),
    )
    .sort((first, second) => first.order - second.order);
}

export function getProgressContentStatus(
  content: MapleStorySchedulerProgressContent,
): SchedulerTaskStatus {
  const nowCount = content.now_count ?? 0;
  const maxCount = content.max_count ?? 0;
  const isQuestComplete = content.quest_state === '2';
  const isCountComplete = maxCount > 0 ? nowCount >= maxCount : nowCount !== 0;

  return isQuestComplete || isCountComplete ? 'complete' : 'in-progress';
}

export function getBossContentStatus(
  bossContent: AggregatedBossContent,
): SchedulerTaskStatus {
  return bossContent.contents.some(
    (content) => content.complete_flag === 'true',
  )
    ? 'complete'
    : 'in-progress';
}
