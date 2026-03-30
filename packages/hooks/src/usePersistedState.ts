import { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'yyc3_';

/**
 * Phase 8A: Custom hook for localStorage-persisted state.
 * Reads initial value from localStorage, falls back to defaultValue.
 * Writes to localStorage on every state change.
 */
export function usePersistedState<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const storageKey = STORAGE_PREFIX + key;

  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        return JSON.parse(stored) as T;
      }
    } catch {
      // Corrupted or missing — use default
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Storage full or unavailable — silent fail (offline-first)
    }
  }, [storageKey, state]);

  return [state, setState];
}

/**
 * Phase 8A: Recent views tracker.
 * Maintains a list of last N unique visited module keys.
 */
const MAX_RECENT = 8;

export function useRecentViews(): [string[], (view: string) => void] {
  const [recent, setRecent] = usePersistedState<string[]>('recent_views', []);

  const addRecent = useCallback((view: string) => {
    if (view === 'dashboard') return; // Don't track dashboard
    setRecent(prev => {
      const filtered = prev.filter(v => v !== view);
      return [view, ...filtered].slice(0, MAX_RECENT);
    });
  }, [setRecent]);

  return [recent, addRecent];
}
