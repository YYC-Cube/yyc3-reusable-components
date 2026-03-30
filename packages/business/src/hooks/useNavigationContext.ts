/**
 * @file useNavigationContext.ts
 * @description 导航上下文 Hook 存根
 */

import { useContext, createContext } from 'react';

interface NavigationContextValue {
  currentView: string;
  setCurrentView: (view: string) => void;
  recommendations: any[];
  shouldHighlight: boolean;
  contextData?: any;
  context?: any;
  getFilterCriteria?: () => any;
  hasContext?: boolean;
}

const NavigationContext = createContext<NavigationContextValue>({
  currentView: 'dashboard',
  setCurrentView: () => {},
  recommendations: [],
  shouldHighlight: false,
  contextData: {},
  context: {},
  getFilterCriteria: () => ({}),
  hasContext: false,
});

export function useNavigationContext() {
  return useContext(NavigationContext);
}

export function generateRecommendations(
  _source?: string,
  _view?: string,
  _contextData?: any
): any[] {
  return [];
}

export function setHighlight(_value: boolean): void {}
