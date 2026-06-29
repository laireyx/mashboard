import type { ReactNode } from 'react';
import { CharacterMeta } from '../../../components/common/Character/Meta';
import { CharacterPortrait } from '../../../components/common/Character/Portrait';
import type { MapleStorySchedulerCharacterStateResponse } from '../../../modules/openapi/scheduler';
import * as styles from './DashboardHeader.css';

interface DashboardHeaderProps {
  characterMeta?: ReactNode;
  characterImageUrl?: string;
  fallbackCharacterName?: string;
  schedulerState?: MapleStorySchedulerCharacterStateResponse;
}

export function DashboardHeader({
  characterMeta,
  characterImageUrl,
  fallbackCharacterName = '',
  schedulerState,
}: DashboardHeaderProps) {
  return (
    <header className={styles.dashboardHeader}>
      <div className={styles.characterIdentity}>
        <CharacterPortrait src={characterImageUrl} />
        <div className={styles.headerTitle}>
          <p className={styles.eyebrow}>루틴 대시보드</p>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {schedulerState?.character_name ?? fallbackCharacterName}
            </h1>
          </div>
          {characterMeta === undefined ? (
            <CharacterMeta />
          ) : (
            <span className={styles.meta}>{characterMeta}</span>
          )}
        </div>
      </div>
    </header>
  );
}
