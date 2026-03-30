import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface Tab {
  id: string;
  label: { en: string; zh: string };
  icon?: React.ReactNode;
  closable?: boolean;
  pinned?: boolean;
  badge?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  maxVisibleTabs?: number;
  currentLanguage: string;
}

export function TabNavigation({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  maxVisibleTabs = 8,
  currentLanguage
}: TabNavigationProps) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const isZh = currentLanguage === 'zh';

  const visibleTabs = tabs.slice(scrollOffset, scrollOffset + maxVisibleTabs);
  const hasMore = tabs.length > maxVisibleTabs;
  const canScrollLeft = scrollOffset > 0;
  const canScrollRight = scrollOffset + maxVisibleTabs < tabs.length;

  const scrollLeft = () => {
    setScrollOffset(Math.max(0, scrollOffset - 1));
  };

  const scrollRight = () => {
    setScrollOffset(Math.min(tabs.length - maxVisibleTabs, scrollOffset + 1));
  };

  return (
    <div className="flex items-center h-12 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-xl border-b border-white/10">
      {/* Scroll Left Button */}
      {hasMore && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="flex-shrink-0 w-10 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Tabs Container */}
      <div className="flex-1 flex items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visibleTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            
            return (
              <motion.div
                key={tab.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`
                  group relative flex items-center gap-2 px-4 h-full cursor-pointer
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/10 border-b-2 border-blue-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
                onClick={() => onTabChange(tab.id)}
              >
                {/* Icon */}
                {tab.icon && (
                  <span className="flex-shrink-0 w-4 h-4">
                    {tab.icon}
                  </span>
                )}

                {/* Label */}
                <span className="text-sm font-medium whitespace-nowrap">
                  {tab.label[isZh ? 'zh' : 'en']}
                </span>

                {/* Badge */}
                {tab.badge && tab.badge > 0 && (
                  <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}

                {/* Close Button */}
                {tab.closable && !tab.pinned && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabClose?.(tab.id);
                    }}
                    className="flex-shrink-0 w-4 h-4 rounded opacity-0 group-hover:opacity-100 hover:bg-white/10 flex items-center justify-center transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}

                {/* Active indicator glow */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 pointer-events-none"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Scroll Right Button */}
      {hasMore && canScrollRight && (
        <button
          onClick={scrollRight}
          className="flex-shrink-0 w-10 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* More Menu */}
      {hasMore && (
        <button className="flex-shrink-0 w-10 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

interface SubTabNavigationProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  currentLanguage: string;
  vertical?: boolean;
}

export function SubTabNavigation({
  tabs,
  activeTabId,
  onTabChange,
  currentLanguage,
  vertical = false
}: SubTabNavigationProps) {
  const isZh = currentLanguage === 'zh';

  if (vertical) {
    return (
      <div className="flex flex-col gap-1 p-2 bg-slate-900/30 backdrop-blur-lg rounded-xl border border-white/5">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center gap-3 px-4 py-2.5 rounded-lg
                text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/10 text-white border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              <span className="flex-1 text-left">{tab.label[isZh ? 'zh' : 'en']}</span>
              {tab.badge && tab.badge > 0 && (
                <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {tab.badge}
                </span>
              )}

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="verticalActiveTab"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/5 pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-slate-900/30 backdrop-blur-lg rounded-xl border border-white/5">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium transition-all duration-200
              ${isActive
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/10 text-white border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            <span>{tab.label[isZh ? 'zh' : 'en']}</span>
            {tab.badge && tab.badge > 0 && (
              <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {tab.badge}
              </span>
            )}

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="horizontalActiveTab"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/5 pointer-events-none"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
