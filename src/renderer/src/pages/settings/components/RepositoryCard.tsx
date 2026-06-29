import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader } from '../../../components/common/Card';
import * as styles from './RepositoryCard.css';

const REPOSITORY_URL = 'https://github.com/laireyx/mashboard';
const RELEASES_URL = `${REPOSITORY_URL}/releases`;
const LATEST_RELEASE_API_URL =
  'https://api.github.com/repos/laireyx/mashboard/releases/latest';
const VERSION_CHECK_STALE_TIME_MS = 1000 * 60 * 60 * 6;
const APP_VERSION_QUERY_KEY = ['app', 'version'] as const;
const LATEST_RELEASE_QUERY_KEY = [
  'github',
  'latest-release',
  'laireyx',
  'mashboard',
] as const;

interface GitHubReleaseResponse {
  tag_name?: unknown;
}

interface LatestRelease {
  version: string;
}

function normalizeVersion(version: string) {
  return version.trim().replace(/^v/i, '').split(/[+-]/)[0];
}

function parseVersion(version: string) {
  const normalizedVersion = normalizeVersion(version);
  const parts = normalizedVersion.split('.');

  if (parts.length < 2 || parts.length > 3) {
    return null;
  }

  const parsedParts = parts.map((part) => {
    if (!/^\d+$/.test(part)) {
      return Number.NaN;
    }

    return Number(part);
  });

  if (parsedParts.some(Number.isNaN)) {
    return null;
  }

  return [parsedParts[0], parsedParts[1], parsedParts[2] ?? 0];
}

function hasNewerVersion(currentVersion: string, latestVersion: string) {
  const currentParts = parseVersion(currentVersion);
  const latestParts = parseVersion(latestVersion);

  if (!currentParts || !latestParts) {
    return false;
  }

  for (let index = 0; index < currentParts.length; index += 1) {
    if (latestParts[index] > currentParts[index]) {
      return true;
    }

    if (latestParts[index] < currentParts[index]) {
      return false;
    }
  }

  return false;
}

async function getCurrentAppVersion() {
  const bridge = window.mashboard;

  if (!bridge) {
    throw new Error('Mashboard bridge is unavailable.');
  }

  return bridge.getAppVersion();
}

function openExternalUrl(url: string) {
  void window.mashboard?.openExternalUrl(url);
}

async function getLatestRelease(): Promise<LatestRelease | null> {
  const response = await fetch(LATEST_RELEASE_API_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch the latest GitHub release.');
  }

  const release = (await response.json()) as GitHubReleaseResponse;

  if (typeof release.tag_name !== 'string') {
    throw new Error('Latest GitHub release is missing a tag.');
  }

  return {
    version: normalizeVersion(release.tag_name),
  };
}

export function RepositoryCard() {
  const queryClient = useQueryClient();
  const currentVersionQuery = useQuery({
    queryKey: APP_VERSION_QUERY_KEY,
    queryFn: getCurrentAppVersion,
    staleTime: Number.POSITIVE_INFINITY,
  });
  const latestReleaseQuery = useQuery({
    queryKey: LATEST_RELEASE_QUERY_KEY,
    queryFn: getLatestRelease,
    staleTime: VERSION_CHECK_STALE_TIME_MS,
    retry: false,
  });

  const latestRelease = latestReleaseQuery.data;
  const hasUpdate = hasNewerVersion(
    currentVersionQuery.data ?? '',
    latestRelease?.version ?? '',
  );

  function handleVersionAction() {
    if (hasUpdate) {
      openExternalUrl(RELEASES_URL);
      return;
    }

    void queryClient.invalidateQueries({ queryKey: LATEST_RELEASE_QUERY_KEY });
  }

  return (
    <Card as="article">
      <CardHeader eyebrow="Repository" title="Mashboard GitHub" />

      <div className={styles.body}>
        <p>
          Mashboard의 소스 코드와 변경 이력은 GitHub 레포지토리에서 확인할 수
          있습니다.
        </p>

        <div className={styles.actions}>
          <button
            className={`${styles.link} ${
              hasUpdate ? styles.statusTone.update : styles.statusTone.neutral
            }`}
            disabled={!hasUpdate && latestReleaseQuery.isFetching}
            onClick={handleVersionAction}
            type="button"
          >
            {hasUpdate
              ? '최신 버전 있음'
              : latestReleaseQuery.isFetching
                ? '업데이트 확인 중'
                : '업데이트 확인'}
          </button>

          <button
            className={`${styles.link} ${styles.linkTone.primary}`}
            onClick={() => openExternalUrl(REPOSITORY_URL)}
            type="button"
          >
            레포지토리 열기
          </button>
        </div>
      </div>
    </Card>
  );
}
