import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useState, type SubmitEvent } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { useMapleStorySchedulerQuery } from '../../hooks/schedulerQueries';
import { useOpenApiSettingsStore } from '../../stores/openApiSettingsStore';
import { RepositoryCard } from './components/RepositoryCard';
import { SchedulerApiControls } from './components/SchedulerApiControls';
import { SettingsCard } from './components/SettingsCard';
import * as styles from './SettingsPage.css';

interface SchedulerApiControlsBoundaryProps {
  characterName: string;
  draftCharacterName: string;
  isConfigured: boolean;
  settingsVersion: number;
  onCharacterNameChange: (value: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

type ConnectedSchedulerApiControlsProps = Omit<
  SchedulerApiControlsBoundaryProps,
  'isConfigured'
>;

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Nexon OpenAPI 연동을 확인하지 못했습니다.';
}

function formatLastFetchedAt(dataUpdatedAt: number) {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dataUpdatedAt));
}

function ConnectedSchedulerApiControls({
  characterName,
  draftCharacterName,
  settingsVersion,
  onCharacterNameChange,
  onSubmit,
}: ConnectedSchedulerApiControlsProps) {
  const schedulerQuery = useMapleStorySchedulerQuery({
    characterName,
    settingsVersion,
  });
  const status = schedulerQuery.isFetching ? 'loading' : 'success';

  return (
    <SettingsCard status={status}>
      <SchedulerApiControls
        characterName={draftCharacterName}
        errorMessage=""
        lastFetchedAt={formatLastFetchedAt(schedulerQuery.dataUpdatedAt)}
        status={status}
        onCharacterNameChange={onCharacterNameChange}
        onSubmit={onSubmit}
      />
    </SettingsCard>
  );
}

function SchedulerApiControlsBoundary({
  characterName,
  draftCharacterName,
  isConfigured,
  settingsVersion,
  onCharacterNameChange,
  onSubmit,
}: SchedulerApiControlsBoundaryProps) {
  if (!isConfigured) {
    return (
      <SettingsCard status="idle">
        <SchedulerApiControls
          characterName={draftCharacterName}
          errorMessage=""
          lastFetchedAt=""
          status="idle"
          onCharacterNameChange={onCharacterNameChange}
          onSubmit={onSubmit}
        />
      </SettingsCard>
    );
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          resetKeys={[characterName, settingsVersion]}
          fallback={({ error, resetErrorBoundary }) => (
            <SettingsCard status="error">
              <SchedulerApiControls
                characterName={draftCharacterName}
                errorMessage={getErrorMessage(error)}
                lastFetchedAt=""
                status="error"
                onCharacterNameChange={onCharacterNameChange}
                onSubmit={(event) => {
                  resetErrorBoundary();
                  onSubmit(event);
                }}
              />
            </SettingsCard>
          )}
          onReset={reset}
        >
          <Suspense
            fallback={
              <SettingsCard status="loading">
                <SchedulerApiControls
                  characterName={draftCharacterName}
                  errorMessage=""
                  lastFetchedAt=""
                  status="loading"
                  onCharacterNameChange={onCharacterNameChange}
                  onSubmit={onSubmit}
                />
              </SettingsCard>
            }
          >
            <ConnectedSchedulerApiControls
              characterName={characterName}
              draftCharacterName={draftCharacterName}
              settingsVersion={settingsVersion}
              onCharacterNameChange={onCharacterNameChange}
              onSubmit={onSubmit}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export function SettingsPage() {
  const { characterName, settingsVersion, setCharacterName } =
    useOpenApiSettingsStore(
      useShallow((state) => ({
        characterName: state.characterName,
        settingsVersion: state.settingsVersion,
        setCharacterName: state.setCharacterName,
      })),
    );
  const [draftCharacterName, setDraftCharacterName] = useState(characterName);

  function saveOpenApiSettings(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setCharacterName(draftCharacterName);
  }

  return (
    <section className={styles.settingsShell} aria-labelledby="settings-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Settings</p>
        <h1 id="settings-title">설정</h1>
      </header>

      <div className={styles.content}>
        <SchedulerApiControlsBoundary
          characterName={characterName}
          draftCharacterName={draftCharacterName}
          isConfigured={!!characterName}
          settingsVersion={settingsVersion}
          onCharacterNameChange={setDraftCharacterName}
          onSubmit={saveOpenApiSettings}
        />
        <RepositoryCard />
      </div>
    </section>
  );
}
