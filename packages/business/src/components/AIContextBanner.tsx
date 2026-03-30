/**
 * @file AIContextBanner.tsx
 * @description AI 上下文横幅组件存根
 */

import React from 'react';

export function AIContextBanner({
  context,
  onClose,
  onAcceptRecommendation,
  currentLanguage,
}: {
  context?: string;
  onClose?: () => void;
  onAcceptRecommendation?: (recommendation: any) => void;
  currentLanguage?: string;
}) {
  return (
    <div className="ai-context-banner bg-blue-500/10 p-2 rounded text-xs text-blue-400">
      {context || 'AI Context'}
      {onClose && (
        <button onClick={onClose} className="ml-2 text-xs">
          ×
        </button>
      )}
    </div>
  );
}
