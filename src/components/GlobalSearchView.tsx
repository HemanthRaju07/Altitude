import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  CheckSquare, 
  PartyPopper, 
  HeartPulse, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { CalendarEvent, TaskItem, FestivalItem, TabType } from '../types';

interface GlobalSearchViewProps {
  events: CalendarEvent[];
  tasks: TaskItem[];
  festivals: FestivalItem[];
  setActiveTab: (tab: TabType) => void;
}

export const GlobalSearchView: React.FC<GlobalSearchViewProps> = ({
  events,
  tasks,
  festivals,
  setActiveTab
}) => {
  const [query, setQuery] = useState('Product');
  const [filterType, setFilterType] = useState<'All' | 'Events' | 'Tasks' | 'Festivals'>('All');

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(query.toLowerCase()) || 
    (e.location && e.location.toLowerCase().includes(query.toLowerCase())) ||
    (e.description && e.description.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    (t.description && t.description.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredFestivals = festivals.filter(f => 
    f.title.toLowerCase().includes(query.toLowerCase()) || 
    f.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Search Bar Input */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search meetings, tasks, festivals, or health goals..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['All', 'Events', 'Tasks', 'Festivals'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Events Results */}
        {(filterType === 'All' || filterType === 'Events') && filteredEvents.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              Calendar Events ({filteredEvents.length})
            </h3>
            <div className="space-y-2">
              {filteredEvents.map(evt => (
                <div 
                  key={evt.id} 
                  onClick={() => setActiveTab('agenda')}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/60 hover:border-blue-200 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600">{evt.title}</h4>
                    <p className="text-xs text-slate-500">{evt.date} • {evt.startTime} - {evt.endTime}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tasks Results */}
        {(filterType === 'All' || filterType === 'Tasks') && filteredTasks.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              Tasks ({filteredTasks.length})
            </h3>
            <div className="space-y-2">
              {filteredTasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => setActiveTab('tasks')}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/60 hover:border-emerald-200 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700">{task.title}</h4>
                    <p className="text-xs text-slate-500">Due: {task.dueDate} • {task.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Festivals Results */}
        {(filterType === 'All' || filterType === 'Festivals') && filteredFestivals.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <PartyPopper className="w-4 h-4 text-purple-600" />
              Festivals & Cultural Events ({filteredFestivals.length})
            </h3>
            <div className="space-y-2">
              {filteredFestivals.map(fest => (
                <div 
                  key={fest.id} 
                  onClick={() => setActiveTab('festivals')}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200/60 hover:border-purple-200 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-purple-700">{fest.title}</h4>
                    <p className="text-xs text-slate-500">{fest.date} • {fest.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
