import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import * as styles from './App.css';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Sidebar, type AppPage } from './components/layout/Sidebar';
import { useMapleStorySchedulerQuery } from './hooks/schedulerQueries';
import { BossPage } from './pages/boss/BossPage';
import { HuntingPage } from './pages/hunting/HuntingPage';
import { RoutinePage } from './pages/routine/RoutinePage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { useOpenApiSettingsStore } from './stores/openApiSettingsStore';
import './styles.css';

interface AppSidebarProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

interface ConfiguredAppSidebarProps extends AppSidebarProps {
  characterName: string;
  settingsVersion: number;
}

function formatLastSyncedAt(dataUpdatedAt: number) {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dataUpdatedAt));
}

function AppSidebar({ activePage, onNavigate }: AppSidebarProps) {
  const { characterName, settingsVersion } = useOpenApiSettingsStore(
    useShallow((state) => ({
      characterName: state.characterName,
      settingsVersion: state.settingsVersion,
    })),
  );

  if (!characterName) {
    return (
      <Sidebar
        activePage={activePage}
        characterMeta="캐릭터 연동 필요"
        characterName={characterName || '미연동'}
        lastSyncedAt="-"
        schedulerStatus="미연동"
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          resetKeys={[characterName, settingsVersion]}
          fallback={({ resetErrorBoundary }) => (
            <Sidebar
              activePage={activePage}
              characterMeta="캐릭터 정보 로딩 실패"
              characterName={characterName}
              lastSyncedAt="-"
              schedulerStatus="오류"
              onNavigate={onNavigate}
              onRefreshScheduler={resetErrorBoundary}
            />
          )}
          onReset={reset}
        >
          <Suspense
            fallback={
              <Sidebar
                activePage={activePage}
                characterMeta="캐릭터 정보 로딩 중"
                characterName={characterName}
                lastSyncedAt="-"
                schedulerStatus="동기화 중"
                onNavigate={onNavigate}
              />
            }
          >
            <ConfiguredAppSidebar
              activePage={activePage}
              characterName={characterName}
              settingsVersion={settingsVersion}
              onNavigate={onNavigate}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function ConfiguredAppSidebar({
  activePage,
  characterName,
  settingsVersion,
  onNavigate,
}: ConfiguredAppSidebarProps) {
  const schedulerQuery = useMapleStorySchedulerQuery({
    characterName,
    settingsVersion,
  });
  const schedulerState = schedulerQuery.data.schedulerState;

  return (
    <Sidebar
      activePage={activePage}
      characterImageUrl={schedulerQuery.data.characterBasic.character_image}
      characterName={schedulerState.character_name ?? characterName}
      lastSyncedAt={formatLastSyncedAt(schedulerQuery.dataUpdatedAt)}
      schedulerStatus={schedulerQuery.isFetching ? '동기화 중' : '연결됨'}
      onNavigate={onNavigate}
    />
  );
}

function App() {
  const [activePage, setActivePage] = useState<AppPage>('routine');

  return (
    <main className={styles.appShell}>
      <AppSidebar activePage={activePage} onNavigate={setActivePage} />
      {activePage === 'routine' && (
        <RoutinePage onOpenSettings={() => setActivePage('settings')} />
      )}
      {activePage === 'hunting' && <HuntingPage />}
      {activePage === 'boss' && <BossPage />}
      {activePage === 'settings' && <SettingsPage />}
    </main>
  );
}

export default App;
