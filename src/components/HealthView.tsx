import React, { useState } from 'react';
import { 
  HeartPulse, 
  Flame, 
  Moon, 
  Footprints, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  Plus, 
  Calendar, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { HealthData, CalendarEvent } from '../types';

interface HealthViewProps {
  healthData: HealthData;
  setHealthData: React.Dispatch<React.SetStateAction<HealthData>>;
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export const HealthView: React.FC<HealthViewProps> = ({
  healthData,
  setHealthData,
  onAddEvent
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [walkScheduled, setWalkScheduled] = useState(false);

  const stepsPercentage = Math.min(100, Math.round((healthData.stepsCount / healthData.stepsGoal) * 100));

  const handleSyncAppleHealth = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setHealthData(prev => ({
        ...prev,
        stepsCount: Math.min(prev.stepsGoal, prev.stepsCount + 500)
      }));
      setIsSyncing(false);
    }, 1200);
  };

  const scheduleEveningWalk = () => {
    onAddEvent({
      title: '30 Mins Evening Health Walk',
      date: new Date().toISOString().split('T')[0],
      startTime: '18:00',
      endTime: '18:30',
      location: 'Local Park / Outdoor Trail',
      category: 'Health',
      color: '#10b981',
      description: 'Scheduled via SmartCal AI Health assistant to reach daily 8,000 steps milestone.'
    });
    setWalkScheduled(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <HeartPulse className="w-6 h-6 text-rose-600 animate-pulse" />
              Health & Activity Tracking
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              End-to-End Encrypted
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time biometric sync with Apple Health, Google Fit, and wearable metrics.
          </p>
        </div>

        <button
          onClick={handleSyncAppleHealth}
          disabled={isSyncing}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Biometrics...' : 'Sync Apple Health'}</span>
        </button>
      </div>

      {/* AI Insight Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl border border-emerald-700/50 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse text-emerald-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              AI Health Intelligence
            </span>
            <h3 className="font-bold text-base text-white mt-1">
              You are {healthData.stepsGoal - healthData.stepsCount} steps away from your daily goal.
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              SmartCal AI found a 30-minute free window at 6:00 PM today.
            </p>
          </div>
        </div>

        <button
          onClick={scheduleEveningWalk}
          disabled={walkScheduled}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer flex-shrink-0 shadow-lg ${
            walkScheduled
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-400/20'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{walkScheduled ? 'Walk Scheduled at 6:00 PM' : 'Schedule Walk at 6:00 PM'}</span>
        </button>
      </div>

      {/* Bento Biometric Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Steps Today Radial/Bar Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-blue-600" />
              Steps Today
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {stepsPercentage}% Goal
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {healthData.stepsCount.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">
              Target: {healthData.stepsGoal.toLocaleString()} steps
            </p>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-700" 
              style={{ width: `${stepsPercentage}%` }} 
            />
          </div>
        </div>

        {/* Heart Rate Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              Heart Rate
            </span>
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              Resting
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1">
              {healthData.heartRate} <span className="text-sm font-normal text-slate-500">BPM</span>
            </p>
            <p className="text-xs text-slate-500">Optimal resting range (60-80 BPM)</p>
          </div>

          {/* Sparkline simulation */}
          <div className="flex items-end gap-1 h-8">
            {[65, 70, 68, 78, 72, 85, 78, 75, 80, 78].map((val, i) => (
              <div 
                key={i} 
                className="flex-1 bg-rose-200 hover:bg-rose-500 rounded-xs transition-colors"
                style={{ height: `${(val / 100) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Calories Burned Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Active Calories
            </span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Cardio
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1">
              {healthData.caloriesBurned} <span className="text-sm font-normal text-slate-500">kcal</span>
            </p>
            <p className="text-xs text-slate-500">Active movement + cardio burn</p>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-700" 
              style={{ width: '70%' }} 
            />
          </div>
        </div>

        {/* Sleep Breakdown Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-600" />
              Sleep Quality
            </span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Score {healthData.sleepQualityScore}/100
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {healthData.sleepHours}h {healthData.sleepMinutes}m
            </p>
            <p className="text-xs text-slate-500">Deep Sleep: 2h 15m • REM: 1h 45m</p>
          </div>

          <div className="flex gap-1.5">
            <div className="flex-1 bg-indigo-600 h-2 rounded-full" title="Deep Sleep" />
            <div className="flex-1 bg-purple-500 h-2 rounded-full" title="REM Sleep" />
            <div className="flex-1 bg-slate-200 h-2 rounded-full" title="Light Sleep" />
          </div>
        </div>
      </div>

      {/* Weekly Activity Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Weekly Step Progress
            </h3>
            <p className="text-xs text-slate-500">Daily breakdown against 8,000 steps baseline goal.</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Avg: 7,820 steps/day
          </span>
        </div>

        <div className="flex items-end justify-between gap-2 sm:gap-6 h-48 pt-4 px-2">
          {healthData.weeklySteps.map((item, idx) => {
            const barHeight = Math.min(100, Math.round((item.steps / 10000) * 100));
            const isGoalMet = item.steps >= healthData.stepsGoal;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                  {(item.steps / 1000).toFixed(1)}k
                </span>
                <div className="w-full max-w-[36px] bg-slate-100 h-full rounded-xl flex items-end overflow-hidden">
                  <div 
                    className={`w-full rounded-xl transition-all duration-500 ${
                      isGoalMet ? 'bg-emerald-500 group-hover:bg-emerald-400' : 'bg-blue-500 group-hover:bg-blue-400'
                    }`}
                    style={{ height: `${barHeight}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
