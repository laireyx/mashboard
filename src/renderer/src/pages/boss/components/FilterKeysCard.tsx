import { useEffect, useState, type ChangeEvent } from 'react';
import { errorText, mutedText, statusText } from '../../../common.css';
import { Card, CardFooter, CardHeader } from '../../../components/common/Card';
import { NumberField } from '../../../components/common/NumberField';
import {
  SegmentedRadioGroup,
  SegmentedRadioOption,
} from '../../../components/common/SegmentedRadioGroup';
import { useFilterKeysSettingsStore } from '../../../stores/filterKeysSettingsStore';
import * as styles from '../BossPage.css';
import {
  useFilterKeysSettings,
  type FilterKeyStatus,
} from '../hooks/useFilterKeysSettings';
import { useMapleStoryCaptureMonitor } from '../hooks/useMapleStoryCaptureMonitor';

const MIN_DELAY_MS = 0;
const MAX_DELAY_MS = 1000;

type DelayFieldName = 'acceptDelayMs' | 'repeatDelayMs' | 'repeatRateMs';
type DisplayStatus = FilterKeyStatus | { type: 'invalid'; reason: string };

const delayFields: Array<{
  label: string;
  name: DelayFieldName;
}> = [
  { label: 'Accept delay', name: 'acceptDelayMs' },
  { label: 'Repeat delay', name: 'repeatDelayMs' },
  { label: 'Repeat rate', name: 'repeatRateMs' },
];

function clampDelay(value: number) {
  return Math.min(MAX_DELAY_MS, Math.max(MIN_DELAY_MS, value));
}

function normalizeDelayInput(value: string) {
  const digitsOnly = value.replace(/\D/g, '');

  if (!digitsOnly) {
    return MIN_DELAY_MS;
  }

  return clampDelay(Number(digitsOnly));
}

function hasValidDelaySettings(...values: number[]) {
  return values.every(
    (value) =>
      Number.isInteger(value) && value >= MIN_DELAY_MS && value <= MAX_DELAY_MS,
  );
}

function filterKeysStatus(status: DisplayStatus) {
  switch (status.type) {
    case 'applying':
      return 'Applying changes...';
    case 'applied':
      return 'Applied FilterKeys settings.';
    case 'error':
    case 'invalid':
    case 'unavailable':
      return status.reason;
    case 'idle':
      return 'Changes apply automatically.';
  }
}

export function FilterKeysCard() {
  const {
    acceptDelayMs,
    repeatDelayMs,
    repeatRateMs,
    setDelaySettings,
    setEnabled,
  } = useFilterKeysSettingsStore();

  const { applyFilterKeys, status } = useFilterKeysSettings();
  const captureMonitor = useMapleStoryCaptureMonitor({
    onConditionChange: setEnabled,
  });

  const [applyMode, setApplyMode] = useState<
    'on' | 'off' | 'boss-only' | (string & {})
  >('off');

  const statusError = captureMonitor.enabled && captureMonitor.error;
  const hasValidNumbers = hasValidDelaySettings(
    acceptDelayMs,
    repeatDelayMs,
    repeatRateMs,
  );

  useEffect(() => {
    if (applyMode === 'off' || !hasValidNumbers) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      void applyFilterKeys({
        enabled:
          applyMode === 'on' ||
          (applyMode === 'boss-only' && captureMonitor.enabled),
        acceptDelayMs,
        repeatDelayMs,
        repeatRateMs,
      }).then((appliedSettings) => {
        if (!appliedSettings) return;

        const { acceptDelayMs, repeatDelayMs, repeatRateMs } = appliedSettings;
        setDelaySettings({
          acceptDelayMs,
          repeatDelayMs,
          repeatRateMs,
        });
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [
    applyFilterKeys,
    acceptDelayMs,
    hasValidNumbers,
    repeatDelayMs,
    repeatRateMs,
    setDelaySettings,
    setEnabled,
    applyMode,
    captureMonitor.enabled,
  ]);

  function handleDelayChange(fieldName: DelayFieldName) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setDelaySettings({
        acceptDelayMs,
        repeatDelayMs,
        repeatRateMs,
        [fieldName]: normalizeDelayInput(event.currentTarget.value),
      });
    };
  }

  return (
    <Card className={styles.filterCard} aria-labelledby="filter-key-title">
      <CardHeader
        eyebrow="Windows input"
        title="FilterKeys"
        titleId="filter-key-title"
        actions={
          <SegmentedRadioGroup
            columns={3}
            label="Power"
            name="filter-key-power"
            value={applyMode}
            onValueChange={setApplyMode}
          >
            <SegmentedRadioOption value="on">On</SegmentedRadioOption>
            <SegmentedRadioOption value="off">Off</SegmentedRadioOption>
            <SegmentedRadioOption value="boss-only">
              Boss Only
            </SegmentedRadioOption>
          </SegmentedRadioGroup>
        }
      />

      <div className={styles.controls}>
        <p className={mutedText}>
          Accept delay, repeat delay, and repeat rate values must be integers,
          from 0 to 1000 ms.
        </p>

        <div className={styles.delayGrid}>
          {delayFields.map((delayField) => (
            <NumberField
              inputMode="numeric"
              key={delayField.name}
              label={delayField.label}
              max={MAX_DELAY_MS}
              min={MIN_DELAY_MS}
              step={1}
              value={String(
                delayField.name === 'acceptDelayMs'
                  ? acceptDelayMs
                  : delayField.name === 'repeatDelayMs'
                    ? repeatDelayMs
                    : repeatRateMs,
              )}
              onChange={handleDelayChange(delayField.name)}
            />
          ))}
        </div>
      </div>

      <CardFooter>
        <p
          className={
            status.type === 'error' || statusError ? errorText : statusText
          }
        >
          {statusError && statusError}
          {!statusError &&
            filterKeysStatus(
              captureMonitor.enabled && captureMonitor.isStarting
                ? { type: 'applying' }
                : status.type === 'error' || status.type === 'unavailable'
                  ? status
                  : hasValidNumbers
                    ? status
                    : {
                        type: 'invalid',
                        reason: 'Enter integer values from 0 to 1000 ms.',
                      },
            )}
        </p>
      </CardFooter>
    </Card>
  );
}
