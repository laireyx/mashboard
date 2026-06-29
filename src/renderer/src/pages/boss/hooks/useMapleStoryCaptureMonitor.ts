import { useCallback, useEffect, useRef, useState } from 'react';
import {
  startMapleStoryWindowCapture,
  stopMapleStoryWindowCapture,
} from '../../../modules/capture';
import { isFilterKeyCaptureConditionMet } from '../modules/filterKeyCaptureCondition';
import { mapleStoryCaptureMonitorController } from '../modules/mapleStoryCaptureMonitorController';

const MONITOR_INTERVAL_MS = 2000;

export interface MapleStoryCaptureMonitorState {
  conditionMatched: boolean | undefined;
  enabled: boolean;
  error: string;
  isMonitoring: boolean;
  isStarting: boolean;
  setEnabled: (enabled: boolean) => void;
  sourceName: string;
}

interface UseMapleStoryCaptureMonitorOptions {
  onConditionChange: (isMatched: boolean) => void;
}

export function useMapleStoryCaptureMonitor({
  onConditionChange,
}: UseMapleStoryCaptureMonitorOptions) {
  const [monitorEnabled, setMonitorEnabled] = useState(false);
  const [monitorStream, setMonitorStream] = useState<MediaStream | undefined>(
    undefined,
  );
  const [sourceName, setSourceName] = useState('');
  const [error, setError] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const lastConditionRef = useRef<boolean | undefined>(undefined);
  const [conditionMatched, setConditionMatched] = useState<boolean | undefined>(
    undefined,
  );

  const isMonitoring = Boolean(monitorStream);

  useEffect(() => {
    mapleStoryCaptureMonitorController.setOnConditionChange(onConditionChange);
  }, [onConditionChange]);

  const updateMonitorStream = useCallback((stream: MediaStream | undefined) => {
    if (!stream) {
      mapleStoryCaptureMonitorController.clearStream();
    }

    setMonitorStream(stream);
  }, []);

  const stopActiveCapture = useCallback(() => {
    const stream = mapleStoryCaptureMonitorController.currentStream;

    if (stream) {
      stopMapleStoryWindowCapture(stream);
    }

    lastConditionRef.current = undefined;
    setConditionMatched(undefined);
    updateMonitorStream(undefined);
    setSourceName('');
  }, [updateMonitorStream]);

  const setEnabled = useCallback(
    (nextEnabled: boolean) => {
      setMonitorEnabled(nextEnabled);

      if (!nextEnabled) {
        stopActiveCapture();
      }
    },
    [stopActiveCapture],
  );

  useEffect(() => {
    if (!monitorEnabled) {
      return undefined;
    }

    let isActive = true;

    async function startMonitoring() {
      setIsStarting(true);
      setError('');
      setConditionMatched(undefined);

      try {
        const session = await startMapleStoryWindowCapture();

        if (!isActive) {
          stopMapleStoryWindowCapture(session.stream);
          return;
        }

        await mapleStoryCaptureMonitorController.startStream(session.stream);

        if (!isActive) {
          stopMapleStoryWindowCapture(session.stream);
          mapleStoryCaptureMonitorController.clearStream();
          return;
        }

        updateMonitorStream(session.stream);
        setSourceName(session.sourceName);
      } catch (nextError: unknown) {
        if (!isActive) {
          return;
        }

        updateMonitorStream(undefined);
        setSourceName('');
        setConditionMatched(undefined);
        setError(
          nextError instanceof Error
            ? nextError.message
            : 'Failed to start MapleStory capture.',
        );
      } finally {
        if (isActive) {
          setIsStarting(false);
        }
      }
    }

    void startMonitoring();

    return () => {
      isActive = false;
    };
  }, [monitorEnabled, updateMonitorStream]);

  useEffect(
    () => () => {
      const stream = mapleStoryCaptureMonitorController.currentStream;

      if (stream) {
        stopMapleStoryWindowCapture(stream);
      }

      mapleStoryCaptureMonitorController.clearStream();
    },
    [],
  );

  useEffect(() => {
    if (!monitorStream) {
      return undefined;
    }

    const videoTrack = monitorStream.getVideoTracks()[0];

    if (!videoTrack) {
      return undefined;
    }

    function handleEnded() {
      lastConditionRef.current = undefined;
      setConditionMatched(undefined);
      updateMonitorStream(undefined);
      setSourceName('');
    }

    videoTrack.addEventListener('ended', handleEnded);

    return () => {
      videoTrack.removeEventListener('ended', handleEnded);
    };
  }, [monitorStream, updateMonitorStream]);

  useEffect(() => {
    if (!monitorEnabled || !monitorStream) {
      return undefined;
    }

    function evaluateCondition() {
      const isMatched = isFilterKeyCaptureConditionMet({
        sourceName,
        video: mapleStoryCaptureMonitorController.currentVideo,
      });

      if (isMatched === lastConditionRef.current) {
        return;
      }

      lastConditionRef.current = isMatched;
      setConditionMatched(isMatched);
      mapleStoryCaptureMonitorController.notifyConditionChange(isMatched);
    }

    const timer = window.setInterval(evaluateCondition, MONITOR_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [monitorEnabled, monitorStream, sourceName]);

  return {
    conditionMatched,
    enabled: monitorEnabled,
    error,
    isMonitoring,
    isStarting,
    setEnabled,
    sourceName,
  };
}
