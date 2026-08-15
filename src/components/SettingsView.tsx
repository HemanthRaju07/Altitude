import React, { useState } from 'react';
import { 
  Sliders, 
  Palette, 
  Calendar, 
  Bell, 
  Sparkles, 
  Radio, 
  Mic, 
  Mic2, 
  Crown, 
  Check, 
  Plus, 
  ChevronDown, 
  CheckCircle2, 
  Zap, 
  HardDrive 
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  // Navigation tab state inside Settings
  const [activeTab, setActiveTab] = useState<'appearance' | 'general' | 'calendar' | 'notifications' | 'ai' | 'voice' | 'myvoice'>('appearance');

  // Customization state
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [accentColor, setAccentColor] = useState<string>('blue');
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Voice & Audio state
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [persona, setPersona] = useState('Nova (Professional)');
  const [speakingRate, setSpeakingRate] = useState(50); // 0 to 100

  // Notification Toast state
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const accentColorMap: Record<string, { bg: string; border: string; text: string; hex: string }> = {
    blue: { bg: 'bg-blue-600', border: 'border-blue-600', text: 'text-blue-600', hex: '#2563eb' },
    purple: { bg: 'bg-purple-600', border: 'border-purple-600', text: 'text-purple-600', hex: '#9333ea' },
    emerald: { bg: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-emerald-600', hex: '#10b981' },
    rose: { bg: 'bg-rose-500', border: 'border-rose-500', text: 'text-rose-600', hex: '#f43f5e' },
    amber: { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-600', hex: '#f59e0b' },
    slate: { bg: 'bg-slate-600', border: 'border-slate-600', text: 'text-slate-600', hex: '#475569' },
  };

  const activeColorObj = accentColorMap[accentColor] || accentColorMap.blue;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 animate-fade-in relative">
      {/* Toast Banner */}
      {savedToast && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">Preferences successfully saved!</span>
        </div>
      )}

      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
      </div>

      {/* Main 3-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sub-Sidebar / Categories Navigation (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <nav className="space-y-1">
            {[
              { id: 'general', label: 'General', icon: Sliders },
              { id: 'appearance', label: 'Appearance', icon: Palette },
              { id: 'calendar', label: 'Calendar & Events', icon: Calendar },
              { id: 'notifications', label: 'Notifications', icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-extrabold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-2">
              Premium Features
            </span>
            <nav className="space-y-1">
              {[
                { id: 'ai', label: 'AI & Automation', icon: Sparkles },
                { id: 'voice', label: 'Voice & Audio', icon: Radio },
                { id: 'myvoice', label: 'My AI Voice', icon: Mic2 },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-extrabold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Middle Main Content Column (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Appearance</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Customize how SmartCal looks on your device.
            </p>
          </div>

          {/* Card 1: Theme & Accent Color */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            {/* Theme Preference */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800 tracking-tight">Theme Preference</h3>
              
              <div className="grid grid-cols-3 gap-3">
                {/* Light Option */}
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2.5 rounded-2xl border-2 transition-all text-center space-y-2 cursor-pointer ${
                    theme === 'light'
                      ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative h-20 bg-slate-50 rounded-xl border border-slate-200 p-2 overflow-hidden flex flex-col justify-between">
                    {/* Header bar mock */}
                    <div className="h-2 bg-white rounded border border-slate-200 flex items-center px-1 justify-between">
                      <div className="w-2 h-1 bg-blue-600 rounded-full" />
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    </div>
                    {/* Body mock */}
                    <div className="space-y-1">
                      <div className="w-3/4 h-2 bg-slate-200 rounded" />
                      <div className="w-1/2 h-2 bg-blue-100 rounded" />
                    </div>

                    {theme === 'light' && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-bold block ${theme === 'light' ? 'text-blue-600' : 'text-slate-700'}`}>
                    Light
                  </span>
                </button>

                {/* Dark Option */}
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2.5 rounded-2xl border-2 transition-all text-center space-y-2 cursor-pointer ${
                    theme === 'dark'
                      ? 'border-blue-600 bg-slate-900/5 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative h-20 bg-slate-900 rounded-xl border border-slate-800 p-2 overflow-hidden flex flex-col justify-between">
                    <div className="h-2 bg-slate-800 rounded border border-slate-700 flex items-center px-1 justify-between">
                      <div className="w-2 h-1 bg-blue-500 rounded-full" />
                      <div className="w-1 h-1 bg-slate-600 rounded-full" />
                    </div>
                    <div className="space-y-1">
                      <div className="w-3/4 h-2 bg-slate-800 rounded" />
                      <div className="w-1/2 h-2 bg-blue-900/60 rounded" />
                    </div>

                    {theme === 'dark' && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-bold block ${theme === 'dark' ? 'text-blue-600' : 'text-slate-700'}`}>
                    Dark
                  </span>
                </button>

                {/* System Option */}
                <button
                  onClick={() => setTheme('system')}
                  className={`p-2.5 rounded-2xl border-2 transition-all text-center space-y-2 cursor-pointer ${
                    theme === 'system'
                      ? 'border-blue-600 bg-slate-100 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative h-20 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-xl border border-slate-300 p-2 overflow-hidden flex items-center justify-center">
                    <div className="w-10 h-8 bg-slate-100 rounded-md shadow-xs border border-slate-300 flex items-center justify-center">
                      <div className="w-4 h-3 bg-slate-300 rounded-xs" />
                    </div>

                    {theme === 'system' && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-bold block ${theme === 'system' ? 'text-blue-600' : 'text-slate-700'}`}>
                    System
                  </span>
                </button>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Accent Color */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800 tracking-tight">Accent Color</h3>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { id: 'blue', bg: 'bg-blue-600' },
                  { id: 'purple', bg: 'bg-purple-600' },
                  { id: 'emerald', bg: 'bg-emerald-500' },
                  { id: 'rose', bg: 'bg-rose-500' },
                  { id: 'amber', bg: 'bg-amber-500' },
                  { id: 'slate', bg: 'bg-slate-600' },
                ].map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setAccentColor(color.id)}
                    className={`w-9 h-9 rounded-full ${color.bg} transition-all cursor-pointer flex items-center justify-center text-white ${
                      accentColor === color.id ? 'ring-2 ring-offset-2 ring-blue-600 scale-110' : 'hover:scale-105 opacity-90 hover:opacity-100'
                    }`}
                  >
                    {accentColor === color.id && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>
                ))}

                <button
                  onClick={() => setAccentColor('blue')}
                  className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all cursor-pointer flex items-center justify-center text-slate-500"
                  title="Add custom color"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Section Header: Voice & Audio */}
          <div className="flex items-center gap-2 pt-2">
            <h2 className="text-xl font-bold text-slate-900">Voice & Audio</h2>
            <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              BETA
            </span>
          </div>

          {/* Card 2: Voice & Audio Settings */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            {/* Enable Voice Commands Row */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Enable Voice Commands</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Allow SmartCal to listen for "Hey SmartCal" when app is open.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
                  voiceEnabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span className={`w-5 h-5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${
                  voiceEnabled ? 'right-0.5' : 'left-0.5'
                }`} />
              </button>
            </div>

            {/* Persona & Speaking Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  AI Voice Persona
                </label>
                <div className="relative">
                  <select
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold px-3.5 py-2.5 rounded-xl appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Nova (Professional)</option>
                    <option>Echo (Conversational)</option>
                    <option>Onyx (Authoritative)</option>
                    <option>Shimmer (Warm)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Speaking Rate
                </label>
                <div className="space-y-1.5 pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={speakingRate}
                    onChange={(e) => setSpeakingRate(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: My AI Voice */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Mic2 className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">My AI Voice</h3>
                  <span className="p-0.5 rounded bg-purple-600 text-white">
                    <Crown className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Train SmartCal to speak with your own voice or custom voice clone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* User Profile & Quotas Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                alt="Hemanth Avatar"
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-2xs"
              />
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Hemanth</h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600">
                  <Crown className="w-3 h-3 text-blue-600" />
                  Pro Member
                </span>
              </div>
            </div>

            {/* Storage Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500">Storage</span>
                <span className="text-slate-800">7.3 / 10 GB</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '73%' }} />
              </div>
            </div>

            {/* AI Requests Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500">AI Requests</span>
                <span className="text-slate-800">420 / 1000</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            {/* Manage Subscription Button */}
            <button className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors cursor-pointer">
              Manage Subscription
            </button>
          </div>

          {/* Live Preview Card */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block px-1">
              Live Preview
            </span>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Oct 24, 2023</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>

              {/* Days Row */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-700">
                <span className="text-slate-400 font-normal">22</span>
                <span className="text-slate-400 font-normal">23</span>
                <span className="flex items-center justify-center">
                  <span className={`w-6 h-6 rounded-full text-white ${activeColorObj.bg} flex items-center justify-center text-xs font-extrabold shadow-2xs`}>
                    24
                  </span>
                </span>
                <span>25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
              </div>

              {/* Event snippet card */}
              <div className="p-3 rounded-xl bg-blue-50/70 border-l-4 border-blue-600 space-y-0.5">
                <h4 className="font-bold text-slate-900 text-xs">Design Review</h4>
                <p className="text-[11px] text-slate-500 font-medium">2:00 PM - 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200/80 px-6 py-3.5 flex items-center justify-between shadow-lg">
        <div className="text-xs text-slate-400 font-medium hidden sm:block">
          Unsaved changes will be discarded on navigation.
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="button"
            className={`px-6 py-2.5 rounded-xl ${activeColorObj.bg} hover:opacity-95 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95`}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
