export const MASHBOARD_OPEN_API_BASE_URL =
  'https://mashboard.laireyx.workers.dev';

export const MAPLESTORY_SCHEDULER_PATH = '/v1/maplestory/scheduler';

export type MapleStorySchedulerContentType =
  | 'contents'
  | 'quest'
  | (string & {});
export type MapleStorySchedulerBooleanString = 'true' | 'false' | (string & {});
export type MapleStorySchedulerQuestState = '0' | '1' | '2' | (string & {});

export interface MapleStorySchedulerProgressContent {
  content_name?: string;
  type?: MapleStorySchedulerContentType;
  registration_flag?: MapleStorySchedulerBooleanString;
  now_count?: number;
  max_count?: number;
  quest_state?: MapleStorySchedulerQuestState;
}

export interface MapleStorySchedulerBossContent {
  content_name?: string;
  difficulty?: string;
  cycle?: string;
  list_order_no?: number;
  registration_flag?: MapleStorySchedulerBooleanString;
  complete_flag?: MapleStorySchedulerBooleanString;
}

export interface MapleStorySchedulerCharacterStateResponse {
  date?: string;
  character_name?: string;
  world_name?: string;
  character_level?: number;
  character_class?: string;
  daily_contents?: MapleStorySchedulerProgressContent[];
  weekly_contents?: MapleStorySchedulerProgressContent[];
  boss_contents?: MapleStorySchedulerBossContent[];
  weekly_boss_clear_count?: number;
  weekly_boss_clear_limit_count?: number;
}

export interface MapleStoryCharacterBasicResponse {
  character_image?: string;
}

export interface MapleStorySchedulerResponse {
  characterBasic: MapleStoryCharacterBasicResponse;
  ocid: string;
  schedulerState: MapleStorySchedulerCharacterStateResponse;
}

export interface FetchMapleStorySchedulerParams {
  characterName: string;
  signal?: AbortSignal;
  baseUrl?: string;
  fetcher?: typeof fetch;
}

export class MashboardOpenApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    super(`Mashboard API request failed with status ${status}`);
    this.name = 'MashboardOpenApiError';
    this.status = status;
    this.body = body;
  }
}

export async function fetchMapleStoryScheduler({
  characterName,
  signal,
  baseUrl = MASHBOARD_OPEN_API_BASE_URL,
  fetcher = fetch,
}: FetchMapleStorySchedulerParams) {
  const url = new URL(MAPLESTORY_SCHEDULER_PATH, baseUrl);
  url.searchParams.set('characterName', characterName);

  const response = await fetcher(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  });
  const body = await response.json();

  if (!response.ok) {
    throw new MashboardOpenApiError(response.status, body);
  }

  return body as MapleStorySchedulerResponse;
}
