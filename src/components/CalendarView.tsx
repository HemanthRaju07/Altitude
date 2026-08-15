import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter, 
  MapPin, 
  Clock 
} from 'lucide-react';
import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onAddEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Event Form
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2024-10-24');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [category, setCategory] = useState<'Meeting' | 'Work' | 'Personal' | 'Health' | 'Holiday'>('Meeting');
  const [location, setLocation] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddEvent({
      title,
      date,
      startTime,
      endTime,
      category,
      location,
      color: category === 'Meeting' ? '#2170e4' : category === 'Health' ? '#10b981' : '#8b5cf6'
    });

    setTitle('');
    setIsModalOpen(false);
  };

  // Calendar Days representation for October 2024
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const filteredEvents = events.filter(e => {
    if (selectedCategory === 'All') return true;
    return e.category === selectedCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">October 2024</h2>
            <p className="text-xs text-slate-500 font-medium">31 Days • 12 Events Scheduled</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-100 border border-slate-200 text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <option value="All">All Categories</option>
            <option value="Meeting">Meetings</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Health">Health</option>
            <option value="Holiday">Holidays</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Month Days Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        {/* Day Name Columns */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Box */}
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map(dayNum => {
            const dateStr = `2024-10-${dayNum < 10 ? '0' + dayNum : dayNum}`;
            const dayEvents = filteredEvents.filter(e => e.date === dateStr);
            const isToday = dayNum === 24;

            return (
              <div
                key={dayNum}
                onClick={() => {
                  setDate(dateStr);
                  setIsModalOpen(true);
                }}
                className={`min-h-[100px] p-2 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer group hover:shadow-sm ${
                  isToday 
                    ? 'bg-blue-50/60 border-blue-400/80 ring-2 ring-blue-500/20' 
                    : 'bg-slate-50/50 border-slate-200/60 hover:bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isToday ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 group-hover:text-blue-600'
                  }`}>
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 rounded-full">
                      {dayEvents.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-[60px]">
                  {dayEvents.map(evt => (
                    <div 
                      key={evt.id}
                      className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-white truncate shadow-2xs"
                      style={{ backgroundColor: evt.color || '#2170e4' }}
                      title={`${evt.title} (${evt.startTime})`}
                    >
                      {evt.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                Schedule New Event
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q4 Strategy Sync with Sarah"
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-2.5 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl"
                  >
                    <option value="Meeting">Meeting</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Health">Health</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Location / Video Link
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Conference Room B or Google Meet"
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-2.5 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
