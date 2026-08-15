import React from 'react';
import { 
  Calendar, 
  Mic, 
  Sparkles, 
  CheckSquare, 
  HeartPulse, 
  Clock, 
  User, 
  BarChart3, 
  Bell, 
  Settings, 
  CloudSun, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  PartyPopper,
  LayoutDashboard
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  unreadCount: number;
  userName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  unreadCount,
  userName
}) => {
  const primaryNavItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar' as TabType, label: 'Calendar', icon: Calendar },
    { id: 'voice' as TabType, label: 'AI Voice', icon: Mic, badge: 'AI' },
    { id: 'festivals' as TabType, label: 'Festivals', icon: PartyPopper, highlight: true },
    { id: 'tasks' as TabType, label: 'Tasks', icon: CheckSquare },
    { id: 'health' as TabType, label: 'Health & Activity', icon: HeartPulse },
    { id: 'agenda' as TabType, label: 'Agenda', icon: Clock },
  ];

  const secondaryNavItems = [
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'weather' as TabType, label: 'Weather', icon: CloudSun },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell, count: unreadCount },
    { id: 'search' as TabType, label: 'Search', icon: Search },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`bg-[#131b2e] text-slate-300 flex flex-col justify-between border-r border-slate-800/80 transition-all duration-300 z-30 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Top Header / Logo */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/60">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 overflow-hidden text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                  SmartCal <span className="text-blue-400">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">
                  Productivity
                </span>
              </div>
            )}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hidden md:flex"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Voice Launcher Widget */}
        {!collapsed && (
          <div className="p-3 my-3 mx-3 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-blue-200">Voice AI Active</span>
              </div>
              <button 
                onClick={() => setActiveTab('voice')}
                className="text-[10px] bg-blue-500 hover:bg-blue-600 text-white font-medium px-2 py-1 rounded-md transition-colors"
              >
                Speak
              </button>
            </div>
          </div>
        )}

        {/* Primary Navigation */}
        <div className="px-3 py-2 space-y-1">
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Core Hub
            </p>
          )}

          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}

                {item.badge && !collapsed && (
                  <span className="ml-auto text-[10px] font-bold bg-purple-500/30 text-purple-300 border border-purple-500/40 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}

                {item.highlight && !collapsed && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="px-3 py-2 space-y-1 mt-4 border-t border-slate-800/60">
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider my-2">
              Insights & Tools
            </p>
          )}

          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}

                {item.count !== undefined && item.count > 0 && (
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                    collapsed 
                      ? 'absolute top-1 right-1 w-2 h-2 p-0 bg-red-500' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {!collapsed && item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Identity Footer */}
      <div className="p-3 border-t border-slate-800/60">
        <button 
          onClick={() => setActiveTab('profile')}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer text-left group"
        >
          <div className="relative flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
              alt={userName}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/40 group-hover:ring-blue-400"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate group-hover:text-blue-300">
                {userName}
              </span>
              <span className="text-xs text-slate-400 truncate">
                Pro Member
              </span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
