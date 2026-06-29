import { useQueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { CharacterMeta } from '../common/Character/Meta';
import { CharacterPortrait } from '../common/Character/Portrait';
import mapleLogoUrl from './assets/maple-logo.png';
import * as styles from './Sidebar.css';

export type AppPage = 'routine' | 'hunting' | 'boss' | 'settings';

const navigationItems: Array<{ id: AppPage; label: string }> = [
  { id: 'routine', label: '루틴' },
  { id: 'hunting', label: '사냥' },
  { id: 'boss', label: '보스' },
  { id: 'settings', label: '설정' },
];

interface SidebarProps {
  characterName: string;
  characterImageUrl?: string;
  characterMeta?: ReactNode;
  lastSyncedAt: string;
  onRefreshScheduler?: () => void;
  schedulerStatus: string;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function Sidebar({
  characterName,
  characterImageUrl,
  characterMeta,
  lastSyncedAt,
  onRefreshScheduler,
  schedulerStatus,
  activePage,
  onNavigate,
}: SidebarProps) {
  const queryClient = useQueryClient();

  const handleLaunchMapleStory = () => {
    window.location.href =
      'ngm://launch/-mode:pluglaunch -game:589825 -locale:KR';
  };

  const handleInvalidateSchedulerQueries = () => {
    if (onRefreshScheduler) {
      onRefreshScheduler();
      return;
    }

    void queryClient.invalidateQueries({ queryKey: ['maplestory'] });
  };

  return (
    <aside className={styles.sidebar} aria-label="Navigation">
      <button className={styles.brandBlock}>
        <img className={styles.brandLogo} src={mapleLogoUrl} alt="" />
        <button
          className={styles.launchButton}
          type="button"
          onClick={handleLaunchMapleStory}
        >
          Launch
        </button>
      </button>

      <nav className={styles.navList} aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            className={
              item.id === activePage
                ? `${styles.navItem} ${styles.active}`
                : styles.navItem
            }
            type="button"
            key={item.id}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className={styles.characterCard} aria-label="Selected character">
        <p className={styles.eyebrow}>Character</p>
        <CharacterPortrait src={characterImageUrl} />
        <strong>{characterName}</strong>
        {characterMeta ?? <CharacterMeta />}
      </section>

      <section className={styles.syncCard} aria-label="Sync status">
        <div className={styles.syncCopy}>
          <p className={`${styles.eyebrow} ${styles.syncEyebrow}`}>API</p>
          <strong>{schedulerStatus}</strong>
          <span className={styles.syncTime}>동기화 {lastSyncedAt}</span>
        </div>
        <button
          aria-label="NEXON OpenAPI 데이터를 새로고침"
          className={styles.iconBadge}
          type="button"
          onClick={handleInvalidateSchedulerQueries}
        >
          ↻
        </button>
      </section>
    </aside>
  );
}
