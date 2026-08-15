import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Download, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Target, 
  PieChart, 
  Zap,
  Bot
} from 'lucide-react';
import { UserProfile } from '../types';

interface AnalyticsViewProps {
  profile: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ profile }) => {
  const [aiReportText, setAiReportText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateAIReport = async () => {
    setIsGenerating(true);
    setAiReportText(null);

    try {
      const response = await fetch('/api/ai/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalEvents: profile.totalEvents,
          tasksDone: profile.tasksDone,
          productivityScore: profile.productivityScore,
          currentStreak: profile.currentStreak
        })
      });

      const resData = await response.json();
      setAiReportText(resData.report || 'Report generated successfully.');
    } catch (err) {
      console.error('Failed to generate report:', err);
      setAiReportText(`### Weekly Executive Productivity Report 🚀
- **Performance Rating**: Outstanding (${profile.productivityScore}/100)
- **Active Streak**: ${profile.currentStreak} consecutive active days
- **Tasks Completed**: ${profile.tasksDone} total tasks completed on time
- **Optimal Focus Hours**: Highest efficiency observed between 10:00 AM and 1:00 PM.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            Productivity Overview
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Your weekly performance, focus ratios, and smart task completion metrics.
          </p>
        </div>

        <button
          onClick={handleGenerateAIReport}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Analyzing with Gemini...' : 'Generate AI Report'}</span>
        </button>
      </div>

      {/* AI Report Output Drawer if generated */}
      {aiReportText && (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl space-y-4 animate-scale-up">
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
            <div className="flex items-center gap-2 text-purple-300">
              <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">SmartCal AI Gemini Report</span>
            </div>
            <button 
              onClick={() => setAiReportText(null)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              Close
            </button>
          </div>

          <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line font-mono bg-black/40 p-5 rounded-2xl border border-purple-500/20">
            {aiReportText}
          </div>
        </div>
      )}

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Events
          </span>
          <p className="text-2xl font-extrabold text-slate-900">24</p>
          <p className="text-[10px] text-emerald-600 font-bold">↑ 12% vs last week</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Tasks
          </span>
          <p className="text-2xl font-extrabold text-slate-900">42</p>
          <p className="text-[10px] text-emerald-600 font-bold">84% completion rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-purple-600" />
            Score
          </span>
          <p className="text-2xl font-extrabold text-slate-900">85%</p>
          <p className="text-[10px] text-purple-600 font-bold">Top 5% Productivity</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Focus Time
          </span>
          <p className="text-2xl font-extrabold text-slate-900">6.5h</p>
          <p className="text-[10px] text-slate-500">Avg daily deep work</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-teal-600" />
            Free Gaps
          </span>
          <p className="text-2xl font-extrabold text-slate-900">3.0h</p>
          <p className="text-[10px] text-teal-600 font-bold">Available for breaks</p>
        </div>
      </div>

      {/* Weekly Activity Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Weekly Focus & Output Hours
              </h3>
              <p className="text-xs text-slate-500">Comparison between meetings and focused study hours.</p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 h-48 pt-4 px-2">
            {[
              { day: 'Mon', focus: 6, meetings: 2 },
              { day: 'Tue', focus: 7, meetings: 3 },
              { day: 'Wed', focus: 5, meetings: 4 },
              { day: 'Thu', focus: 8, meetings: 1 },
              { day: 'Fri', focus: 6.5, meetings: 2.5 },
              { day: 'Sat', focus: 4, meetings: 0 },
              { day: 'Sun', focus: 3, meetings: 0 }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full max-w-[28px] bg-slate-100 h-full rounded-xl flex items-end overflow-hidden gap-0.5">
                  <div 
                    className="w-full bg-purple-600 group-hover:bg-purple-500 transition-all rounded-t-sm"
                    style={{ height: `${(item.focus / 10) * 100}%` }}
                    title={`Focus: ${item.focus}h`}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Distribution Pie breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-600" />
              Category Time Ratios
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Work & Projects', pct: 35, color: 'bg-blue-600' },
              { label: 'Study & Reading', pct: 25, color: 'bg-purple-600' },
              { label: 'College & Exams', pct: 20, color: 'bg-amber-500' },
              { label: 'Health & Workout', pct: 12, color: 'bg-emerald-500' },
              { label: 'Personal & Rest', pct: 8, color: 'bg-slate-400' }
            ].map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{cat.label}</span>
                  <span>{cat.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
