import type { ReactNode } from 'react';
import { Card, CardHeader } from '../../../components/common/Card';
import type { SchedulerApiStatus } from './SchedulerApiControls';
import * as styles from './SettingsCard.css';

interface SettingsCardProps {
  children: ReactNode;
  status: SchedulerApiStatus;
}

function queryStatusLabel(status: SchedulerApiStatus) {
  if (status === 'success') {
    return '연동 완료';
  }

  if (status === 'error') {
    return '연동 실패';
  }

  if (status === 'loading') {
    return '확인 중';
  }

  return '미연동';
}

export function SettingsCard({ children, status }: SettingsCardProps) {
  return (
    <Card>
      <CardHeader
        eyebrow="Nexon OpenAPI"
        title="캐릭터 연동"
        actions={
          <span className={`${styles.statusPill} ${styles.statusTone[status]}`}>
            {queryStatusLabel(status)}
          </span>
        }
      />
      {children}
    </Card>
  );
}
