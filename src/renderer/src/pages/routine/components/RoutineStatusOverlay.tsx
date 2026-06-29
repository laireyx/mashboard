import type { ReactNode } from 'react';
import * as styles from './RoutineStatusOverlay.css';

interface RoutineStatusOverlayProps {
  action?: ReactNode;
  description: ReactNode;
  eyebrow: string;
  role?: 'alert' | 'status';
  title: string;
  titleId: string;
}

interface RoutineLockOverlayProps {
  onOpenSettings: () => void;
}

interface RoutineErrorOverlayProps {
  errorMessage: string;
  onRetry: () => void;
}

function RoutineStatusOverlay({
  action,
  description,
  eyebrow,
  role,
  title,
  titleId,
}: RoutineStatusOverlayProps) {
  return (
    <div className={styles.overlay} role="presentation">
      <section
        className={styles.modal}
        aria-labelledby={titleId}
        aria-live={role === 'status' ? 'polite' : undefined}
        role={role}
      >
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>
        {action}
      </section>
    </div>
  );
}

export function RoutineLoadingOverlay() {
  return (
    <RoutineStatusOverlay
      description="Nexon OpenAPI에서 최신 루틴 상태를 확인하고 있습니다."
      eyebrow="Scheduler"
      role="status"
      title="일정을 불러오는 중입니다"
      titleId="routine-loading-title"
    />
  );
}

export function RoutineLockOverlay({
  onOpenSettings,
}: RoutineLockOverlayProps) {
  return (
    <RoutineStatusOverlay
      action={
        <button type="button" onClick={onOpenSettings}>
          설정으로 이동
        </button>
      }
      description="설정에서 캐릭터명을 등록하면 최신 일정 상태를 불러옵니다."
      eyebrow="Nexon OpenAPI"
      title="캐릭터 연동이 필요합니다"
      titleId="routine-lock-title"
    />
  );
}

export function RoutineErrorOverlay({
  errorMessage,
  onRetry,
}: RoutineErrorOverlayProps) {
  return (
    <RoutineStatusOverlay
      action={
        <button type="button" onClick={onRetry}>
          다시 시도
        </button>
      }
      description={errorMessage}
      eyebrow="Scheduler"
      role="alert"
      title="일정 로딩에 실패했습니다"
      titleId="routine-error-title"
    />
  );
}
