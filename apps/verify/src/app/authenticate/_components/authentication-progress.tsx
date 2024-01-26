'use client';

import * as React from 'react';

import { Progress } from '@/components/ui/progress';
import { useEffect } from 'react';

type IntervalCallbackType = (...args: any[]) => void;

const useInterval = (callback: IntervalCallbackType, delay: number | null) => {
  const savedCallbackRef = React.useRef<IntervalCallbackType>();

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any[]) => savedCallbackRef.current!(...args);

    if (delay !== null) {
      const intervalId = setInterval(handler, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

export function AuthenticationProgress({ isLoaded }: { isLoaded?: boolean }) {
  const [progress, setProgress] = React.useState(13);
  useEffect(() => {
    if (isLoaded) {
      setProgress(100);
    }
  }, [isLoaded]);

  useInterval(() => {
    if (progress >= 100) {
      return;
    }
    setProgress((prevProgress) => {
      return Math.min(100, prevProgress + 1);
    });
  }, 100);

  return <Progress color="primary" value={progress} className="w-full accent-blue-700 bg-sky-50" />;
}
