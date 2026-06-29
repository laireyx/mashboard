import type { SubmitEvent } from 'react';
import * as styles from './SchedulerApiControls.css';

export type SchedulerApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface SchedulerApiControlsProps {
  characterName: string;
  errorMessage: string;
  lastFetchedAt: string;
  status: SchedulerApiStatus;
  submitLabel?: string;
  onCharacterNameChange: (value: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

function statusLabel(status: SchedulerApiStatus, lastFetchedAt: string) {
  if (status === 'loading') {
    return '요청 중';
  }

  if (status === 'success') {
    return `동기화 ${lastFetchedAt}`;
  }

  if (status === 'error') {
    return '동기화 실패';
  }

  return '연동 대기';
}

export function SchedulerApiControls({
  characterName,
  errorMessage,
  lastFetchedAt,
  status,
  submitLabel = '저장 및 확인',
  onCharacterNameChange,
  onSubmit,
}: SchedulerApiControlsProps) {
  const isLoading = status === 'loading';

  return (
    <form className={styles.apiControls} onSubmit={onSubmit}>
      <div className={styles.statusBlock}>
        <strong>{statusLabel(status, lastFetchedAt)}</strong>
        {errorMessage ? (
          <span className={styles.errorText}>{errorMessage}</span>
        ) : (
          <span>캐릭터명을 기준으로 최신 스케줄러 상태를 가져옵니다.</span>
        )}
      </div>

      <label className={styles.field}>
        <span>Character</span>
        <input
          autoComplete="off"
          disabled={isLoading}
          onChange={(event) => onCharacterNameChange(event.target.value)}
          placeholder="캐릭터명"
          required
          type="text"
          value={characterName}
        />
      </label>

      <button className={styles.fetchButton} disabled={isLoading} type="submit">
        {isLoading ? '확인 중' : submitLabel}
      </button>
    </form>
  );
}
