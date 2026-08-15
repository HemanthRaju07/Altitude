import React, { useState } from 'react';
import { 
  PartyPopper, 
  Calendar, 
  Sparkles, 
  Plus, 
  Check, 
  MapPin, 
  Share2, 
  Clock, 
  Info,
  Filter
} from 'lucide-react';
import { FestivalItem, CalendarEvent } from '../types';

interface FestivalsViewProps {
  festivals: FestivalItem[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export const FestivalsView: React.FC<FestivalsViewProps> = ({
  festivals,
  onAddEvent
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'National' | 'Religious'>('All');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const featuredFestival = festivals.find(f => f.isFeatured) || festivals[0];

  const filteredFestivals = festivals.filter(f => {
    if (f.isFeatured) return false; // Show in featured section separately
    if (selectedCategory === 'All') return true;
    return f.category === selectedCategory;
  });

  const handleAddFestivalToCalendar = (festival: FestivalItem) => {
    onAddEvent({
      title: festival.title,
      date: festival.date.includes('2024') ? '2024-11-01' : '2024-12-25',
      startTime: '00:00',
      endTime: '23:59',
      location: festival.location || 'Worldwide',
      category: 'Holiday',
      color: '#f59e0b',
      description: festival.description
    });

    setAddedIds(prev => ({ ...prev, [festival.id]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Featured Banner Section - Diwali */}
      {featuredFestival && (
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl group border border-slate-800">
          <div className="absolute inset-0">
            <img 
              src={featuredFestival.imageUrl} 
              alt={featuredFestival.title}
              className="w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 lg:p-12 space-y-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Featured Cultural Highlight
              </span>
              {featuredFestival.daysRemaining !== undefined && (
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  STARTS IN {featuredFestival.daysRemaining} DAYS
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {featuredFestival.title}
              </h2>
              <p className="text-amber-200 font-semibold text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                {featuredFestival.date} • {featuredFestival.location}
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {featuredFestival.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleAddFestivalToCalendar(featuredFestival)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 ${
                  addedIds[featuredFestival.id]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                }`}
              >
                {addedIds[featuredFestival.id] ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Calendar</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Calendar</span>
                  </>
                )}
              </button>

              <button className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition-colors flex items-center gap-2 cursor-pointer">
                <Share2 className="w-4 h-4" />
                <span>Share Holiday</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Calendar 2024 Header & Filter Chips */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <PartyPopper className="w-6 h-6 text-purple-600" />
              Cultural Calendar 2024 - 2025
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Never miss major international, regional, and national holiday celebrations.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            {(['All', 'National', 'Religious'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFestivals.map((fest) => {
            const isAdded = addedIds[fest.id];
            return (
              <div 
                key={fest.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col group"
              >
                {/* Image Header */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={fest.imageUrl} 
                    alt={fest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {fest.category}
                  </span>
                  {fest.daysRemaining !== undefined && (
                    <span className="absolute bottom-3 right-3 text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-md backdrop-blur-md">
                      In {fest.daysRemaining} days
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">
                      {fest.title}
                    </h4>
                    <p className="text-xs font-semibold text-purple-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {fest.date}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {fest.description}
                    </p>
                  </div>

                  {/* Add to Calendar Button */}
                  <button
                    onClick={() => handleAddFestivalToCalendar(fest)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Added to Calendar</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Calendar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
