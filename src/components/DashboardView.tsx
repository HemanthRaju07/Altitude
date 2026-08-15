import React from 'react';
import { 
  Sparkles, 
  Mic, 
  Calendar, 
  CheckSquare, 
  HeartPulse, 
  CloudSun, 
  PartyPopper, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Flame, 
  Award 
} from 'lucide-react';
import { TabType, CalendarEvent, TaskItem, FestivalItem, HealthData, WeatherData, UserProfile } from '../types';

interface DashboardViewProps {
  setActiveTab: (tab: TabType) => void;
  events: CalendarEvent[];
  tasks: TaskItem[];
  festivals: FestivalItem[];
  health: HealthData;
  weather: WeatherData;
  profile: UserProfile;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  events,
  tasks,
  festivals,
  health,
  weather,
  profile
}) => {
  const featuredFestival = festivals.find(f => f.isFeatured) || festivals[0];
  const pendingTasks = tasks.filter(t => !t.completed);
  const nextEvent = events[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white p-8 lg:p-10 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-100 border border-white/20 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              <span>SmartCal AI Partner</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Good Morning, {profile.name}! 👋
            </h2>
            <p className="text-blue-100 text-sm max-w-xl">
              You have <span className="font-bold text-white">{events.length} events</span> scheduled today and <span className="font-bold text-white">{pendingTasks.length} pending tasks</span>.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('voice')}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-blue-700 font-bold text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Mic className="w-5 h-5 text-blue-600 animate-pulse" />
            <span>Launch Voice Assistant</span>
          </button>
        </div>
      </div>

      {/* Bento Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Next Meeting Card */}
        {nextEvent && (
          <div 
            onClick={() => setActiveTab('agenda')}
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                Upcoming Next
              </span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                {nextEvent.startTime}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                {nextEvent.title}
              </h3>
              <p className="text-xs text-slate-500">{nextEvent.location || 'Google Meet'}</p>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-blue-600 pt-2 border-t border-slate-100">
              <span>View Agenda</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

        {/* Featured Festival Banner Widget */}
        {featuredFestival && (
          <div 
            onClick={() => setActiveTab('festivals')}
            className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-slate-950 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between text-slate-950 font-bold text-xs uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <PartyPopper className="w-4 h-4" />
                Festival Countdown
              </span>
              <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full text-[10px]">
                In {featuredFestival.daysRemaining} days
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-950 text-xl group-hover:translate-x-1 transition-transform">
                {featuredFestival.title}
              </h3>
              <p className="text-xs font-semibold text-slate-900">{featuredFestival.date}</p>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-950 pt-2 border-t border-slate-900/20">
              <span>Explore Cultural Calendar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

        {/* Health Activity Snapshot */}
        <div 
          onClick={() => setActiveTab('health')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              Health & Steps
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {Math.round((health.stepsCount / health.stepsGoal) * 100)}% Goal
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900">{health.stepsCount.toLocaleString()} <span className="text-sm font-normal text-slate-500">steps</span></p>
            <p className="text-xs text-slate-500">1,500 steps remaining today</p>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
            <span>View Biometrics</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Tasks Summary Widget */}
        <div 
          onClick={() => setActiveTab('tasks')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-purple-600" />
              To-Do List
            </span>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              {pendingTasks.length} Pending
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm group-hover:text-purple-600">
              {pendingTasks[0]?.title || 'No pending tasks'}
            </h4>
            <p className="text-xs text-slate-500">High priority tasks due today</p>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-purple-700 pt-2 border-t border-slate-100">
            <span>Manage Tasks</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Weather Snapshot */}
        <div 
          onClick={() => setActiveTab('weather')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-amber-500" />
              Weather Insight
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              {weather.temperature}°F
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-base">{weather.condition}</h4>
            <p className="text-xs text-slate-500">{weather.location}</p>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-amber-700 pt-2 border-t border-slate-100">
            <span>Check Rain Warning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Productivity Score Badge */}
        <div 
          onClick={() => setActiveTab('analytics')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              Productivity Score
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Top 5%
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900">{profile.productivityScore}/100</p>
            <p className="text-xs text-slate-500">{profile.currentStreak} day streak active</p>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-indigo-700 pt-2 border-t border-slate-100">
            <span>View Analytics</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
