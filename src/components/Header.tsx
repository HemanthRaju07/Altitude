import React from 'react';
import { Search, Bell, Sparkles, Mic, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadCount: number;
  onOpenQuickAdd: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  unreadCount,
  onOpenQuickAdd
}) => {
  const getTabTitle = (tab: TabType): string => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'calendar': return 'Interactive Calendar';
      case 'voice': return 'AI Voice Assistant Hub';
      case 'festivals': return 'Cultural & Regional Festivals';
      case 'tasks': return 'Tasks & To-Dos';
      case 'health': return 'Health & Activity Tracking';
      case 'agenda': return 'Today & Tomorrow Agenda';
      case 'profile': return 'User Profile & Preferences';
      case 'analytics': return 'Productivity Analytics';
      case 'notifications': return 'Smart Notifications';
      case 'settings': return 'System Settings';
      case 'weather': return 'Weather & Impact Insights';
      case 'search': return 'Global Search';
      default: return 'SmartCal AI';
    }
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Title & Date */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {getTabTitle(activeTab)}
          </h1>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
            {currentDateFormatted}
          </p>
        </div>
      </div>

      {/* Center Quick Search Trigger */}
      <div className="hidden lg:flex items-center">
        <button
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-3 bg-slate-100/80 hover:bg-slate-200/60 border border-slate-200 text-slate-500 text-xs px-4 py-2 rounded-full w-80 transition-colors cursor-pointer group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          <span className="flex-1 text-left">Search events, tasks, festivals...</span>
          <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] text-slate-400 font-mono shadow-xs border border-slate-200">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Voice AI Launcher Button */}
        <button
          onClick={() => setActiveTab('voice')}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-semibold text-xs transition-all cursor-pointer shadow-xs"
        >
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          <Mic className="w-3.5 h-3.5" />
          <span>Speak</span>
        </button>

        {/* Quick Add Event / Task */}
        <button
          onClick={onOpenQuickAdd}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={() => setActiveTab('notifications')}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 relative transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {/* Weather Quick Widget */}
        <button
          onClick={() => setActiveTab('weather')}
          className="hidden md:flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-full text-xs text-slate-700 font-medium transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-amber-500 text-lg">partly_cloudy_day</span>
          <span>72°F</span>
          <span className="text-slate-400 text-[11px]">SF</span>
        </button>
      </div>
    </header>
  );
};
