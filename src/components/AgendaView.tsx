import React, { useState } from 'react';
import { 
  Clock, 
  Video, 
  MapPin, 
  User, 
  Plus, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  MoreVertical
} from 'lucide-react';
import { CalendarEvent } from '../types';

interface AgendaViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  events,
  onAddEvent
}) => {
  const [scheduledGap, setScheduledGap] = useState(false);

  const todayDateStr = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.date === todayDateStr || e.date === '2024-10-24');
  const upcomingEvents = events.filter(e => e.date !== todayDateStr && e.date !== '2024-10-24');

  const handleScheduleFocusGap = () => {
    onAddEvent({
      title: 'Deep Focus Work Block',
      date: new Date().toISOString().split('T')[0],
      startTime: '11:30',
      endTime: '13:30',
      category: 'Work',
      color: '#8b5cf6',
      description: 'Scheduled into afternoon free window via SmartCal AI suggestion.'
    });
    setScheduledGap(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Agenda Timeline
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Chronological view of today's scheduled meetings, reminders, and focus blocks.
          </p>
        </div>

        <button
          onClick={() => {
            onAddEvent({
              title: 'Quick Agenda Event',
              date: todayDateStr,
              startTime: '15:00',
              endTime: '16:00',
              category: 'Meeting',
              color: '#2170e4',
              description: 'Created from Agenda view'
            });
          }}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Agenda Item</span>
        </button>
      </div>

      {/* AI Gap Detection Widget */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl border border-purple-700/50 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse text-purple-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              Free Time Optimization
            </span>
            <h3 className="font-bold text-base text-white mt-1">
              You have a 2-hour gap today between 11:30 AM and 1:30 PM.
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Would you like SmartCal AI to schedule a uninterrupted Focus Work block?
            </p>
          </div>
        </div>

        <button
          onClick={handleScheduleFocusGap}
          disabled={scheduledGap}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer flex-shrink-0 shadow-lg ${
            scheduledGap
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'bg-purple-400 hover:bg-purple-300 text-slate-950 shadow-purple-400/20'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{scheduledGap ? 'Focus Block Scheduled' : 'Schedule Focus Block'}</span>
        </button>
      </div>

      {/* Today Timeline Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            Today - Oct 24, 2023
          </h3>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {todayEvents.length} Events Scheduled
          </span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {todayEvents.map((evt, idx) => {
            const isFirst = idx === 0;
            return (
              <div key={evt.id} className="relative group">
                {/* Bullet node on timeline line */}
                <div className={`absolute -left-[23px] top-4 w-4 h-4 rounded-full border-2 border-white transition-transform group-hover:scale-125 ${
                  isFirst ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-400'
                }`} />

                {/* Event Card */}
                <div className={`p-6 rounded-2xl border transition-all ${
                  isFirst
                    ? 'bg-gradient-to-r from-blue-50 via-white to-white border-blue-200 shadow-sm'
                    : 'bg-white border-slate-200/80 shadow-2xs hover:border-slate-300'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-md">
                          {evt.startTime} - {evt.endTime}
                        </span>
                        {isFirst && (
                          <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                            Upcoming Next
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-500 border-l border-slate-200 pl-2">
                          {evt.category}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                        {evt.title}
                      </h4>

                      {evt.description && (
                        <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>
                      )}

                      {/* Location & Attendees */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        {evt.location && (
                          <span className="flex items-center gap-1 text-slate-600 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {evt.location}
                          </span>
                        )}

                        {evt.attendees && evt.attendees.length > 0 && (
                          <span className="flex items-center gap-1 text-slate-600 font-medium">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            {evt.attendees.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Join / Action button */}
                    {evt.location?.toLowerCase().includes('meet') || isFirst ? (
                      <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer self-start sm:self-auto">
                        <Video className="w-4 h-4" />
                        <span>Join Meeting</span>
                      </button>
                    ) : (
                      <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer self-start sm:self-auto">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tomorrow Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          Tomorrow - Oct 25, 2023
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.map((evt) => (
            <div key={evt.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                  {evt.startTime} - {evt.endTime}
                </span>
                <span className="text-xs font-semibold text-slate-400">{evt.category}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">{evt.title}</h4>
              {evt.location && (
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {evt.location}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
