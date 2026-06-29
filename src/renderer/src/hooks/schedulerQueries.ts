import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchMapleStoryScheduler } from '../modules/openapi/scheduler';

interface UseMapleStorySchedulerQueryParams {
  characterName: string;
  settingsVersion: number;
}

export function mapleStorySchedulerQueryOptions({
  characterName,
  settingsVersion,
}: UseMapleStorySchedulerQueryParams) {
  return queryOptions({
    queryKey: ['maplestory', 'scheduler', characterName, settingsVersion],
    staleTime: 1000 * 60 * 5,
    queryFn: ({ signal }) =>
      fetchMapleStoryScheduler({
        characterName,
        signal,
      }),
  });
}

export function useMapleStorySchedulerQuery(
  params: UseMapleStorySchedulerQueryParams,
) {
  return useSuspenseQuery(mapleStorySchedulerQueryOptions(params));
}
