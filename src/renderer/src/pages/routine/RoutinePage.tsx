import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { useMapleStorySchedulerQuery } from '../../hooks/schedulerQueries';
import { useOpenApiSettingsStore } from '../../stores/openApiSettingsStore';
import { RoutinePageFrame } from './components/RoutinePageFrame';
import {
  RoutineErrorOverlay,
  RoutineLoadingOverlay,
  RoutineLockOverlay,
} from './components/RoutineStatusOverlay';

interface RoutinePageProps {
  onOpenSettings: () => void;
}

interface RoutinePageContentProps {
  characterName: string;
  settingsVersion: number;
}

function getSchedulerErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return '일정 정보를 불러오지 못했습니다.';
}

function RoutinePageContent({
  characterName,
  settingsVersion,
}: RoutinePageContentProps) {
  const schedulerQuery = useMapleStorySchedulerQuery({
    characterName,
    settingsVersion,
  });
  const schedulerState = schedulerQuery.data.schedulerState;

  return (
    <RoutinePageFrame
      characterImageUrl={schedulerQuery.data.characterBasic.character_image}
      fallbackCharacterName={characterName}
      schedulerState={schedulerState}
    />
  );
}

export function RoutinePage({ onOpenSettings }: RoutinePageProps) {
  const { characterName, settingsVersion } = useOpenApiSettingsStore(
    useShallow((state) => ({
      characterName: state.characterName,
      settingsVersion: state.settingsVersion,
    })),
  );

  if (!characterName) {
    return (
      <RoutinePageFrame
        characterMeta="캐릭터 연동 필요"
        fallbackCharacterName="미연동"
        isContentBlurred
        overlay={<RoutineLockOverlay onOpenSettings={onOpenSettings} />}
      />
    );
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          resetKeys={[characterName, settingsVersion]}
          fallback={({ error, resetErrorBoundary }) => (
            <RoutinePageFrame
              characterMeta="캐릭터 정보 로딩 실패"
              fallbackCharacterName={characterName}
              isContentBlurred
              overlay={
                <RoutineErrorOverlay
                  errorMessage={getSchedulerErrorMessage(error)}
                  onRetry={resetErrorBoundary}
                />
              }
            />
          )}
          onReset={reset}
        >
          <Suspense
            fallback={
              <RoutinePageFrame
                characterMeta="캐릭터 정보 로딩 중"
                fallbackCharacterName={characterName}
                isContentBlurred
                overlay={<RoutineLoadingOverlay />}
              />
            }
          >
            <RoutinePageContent
              characterName={characterName}
              settingsVersion={settingsVersion}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
