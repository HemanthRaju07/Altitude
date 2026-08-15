import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  CloudSun, 
  Calendar, 
  PartyPopper, 
  CheckSquare, 
  Check, 
  Trash2, 
  Filter
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  setNotifications
}) => {
  const [filterType, setFilterType] = useState<string>('All');

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markSingleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filtered = notifications.filter(n => {
    if (filterType === 'All') return true;
    return n.type === filterType.toLowerCase();
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'ai': return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'weather': return <CloudSun className="w-4 h-4 text-amber-500" />;
      case 'calendar': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'festival': return <PartyPopper className="w-4 h-4 text-pink-600" />;
      default: return <CheckSquare className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            Smart Notifications
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            You have <span className="font-bold text-blue-600">{unreadCount} unread alerts</span>.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto bg-slate-100 p-1.5 rounded-xl border border-slate-200">
        {['All', 'AI', 'Weather', 'Calendar', 'Festival'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === t
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
              !item.read
                ? 'bg-blue-50/60 border-blue-200 shadow-2xs'
                : 'bg-white border-slate-200/80 opacity-80'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                !item.read ? 'bg-white shadow-xs' : 'bg-slate-100'
              }`}>
                {getNotificationIcon(item.type)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                <span className="text-[10px] text-slate-400 font-medium block pt-1">{item.timestamp}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {!item.read && (
                <button
                  onClick={() => markSingleRead(item.id)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => deleteNotification(item.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Delete notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
            <p className="font-bold text-slate-800">No notifications found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
