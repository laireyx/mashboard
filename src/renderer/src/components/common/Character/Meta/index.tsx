import { useShallow } from 'zustand/react/shallow';
import { useMapleStorySchedulerQuery } from '../../../../hooks/schedulerQueries';
import { formatCharacterMeta } from '../../../../modules/openapi/schedulerDashboard';
import { useOpenApiSettingsStore } from '../../../../stores/openApiSettingsStore';

import * as styles from './index.css';

interface ConfiguredCharacterMetaProps {
  characterName: string;
  settingsVersion: number;
}

function ConfiguredCharacterMeta({
  characterName,
  settingsVersion,
}: ConfiguredCharacterMetaProps) {
  const schedulerQuery = useMapleStorySchedulerQuery({
    characterName,
    settingsVersion,
  });
  const formattedMeta = formatCharacterMeta(schedulerQuery.data.schedulerState);

  return (
    <span className={styles.meta}>{formattedMeta || '캐릭터 정보 없음'}</span>
  );
}

export function CharacterMeta() {
  const { characterName, settingsVersion } = useOpenApiSettingsStore(
    useShallow((state) => ({
      characterName: state.characterName,
      settingsVersion: state.settingsVersion,
    })),
  );

  if (!characterName) {
    return <span className={styles.meta}>캐릭터 연동 필요</span>;
  }

  return (
    <ConfiguredCharacterMeta
      characterName={characterName}
      settingsVersion={settingsVersion}
    />
  );
}
