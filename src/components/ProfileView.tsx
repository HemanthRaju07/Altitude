import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Award, 
  Flame, 
  Calendar, 
  CheckSquare, 
  Clock, 
  Moon, 
  Check, 
  Key, 
  Laptop, 
  Smartphone,
  Edit2
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  setProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({ ...prev, name, email }));
    setIsEditing(false);
  };

  const toggleService = (key: keyof UserProfile['connectedServices']) => {
    setProfile(prev => ({
      ...prev,
      connectedServices: {
        ...prev.connectedServices,
        [key]: !prev.connectedServices[key]
      }
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Identity Hero Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative">
            <img 
              src={profile.avatarUrl} 
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500/30 shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900">{profile.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                PRO Member
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {profile.email}
            </p>
            <p className="text-xs text-slate-400">
              Member since Oct 2023 • SmartCal AI Early Access
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Edit2 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Edit Form if open */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Update Account Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 text-sm px-4 py-2 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 text-sm px-4 py-2 rounded-xl"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Events</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{profile.totalEvents}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Tasks Done</span>
            <CheckSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{profile.tasksDone}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Productivity</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{profile.productivityScore}/100</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Streak</span>
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{profile.currentStreak} Days</p>
        </div>
      </div>

      {/* Personal Work/Sleep Preferences */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Personal Smart Schedules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              Standard Work Hours
            </span>
            <p className="text-base font-extrabold text-slate-900">
              {profile.workHours.start} - {profile.workHours.end}
            </p>
            <p className="text-xs text-slate-400">Used by AI to schedule meetings within work windows.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-600" />
              Sleep Schedule
            </span>
            <p className="text-base font-extrabold text-slate-900">
              {profile.sleepSchedule.start} - {profile.sleepSchedule.end}
            </p>
            <p className="text-xs text-slate-400">Notifications muted automatically during sleep hours.</p>
          </div>
        </div>
      </div>

      {/* Connected Services */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Connected Services & Sync
        </h3>

        <div className="space-y-3">
          {[
            { key: 'googleCalendar' as const, name: 'Google Calendar Sync', desc: 'Real-time bidirectional calendar event synchronization' },
            { key: 'weatherService' as const, name: 'Weather Forecast AI Service', desc: 'Predictive weather warnings for outdoor scheduling' },
            { key: 'appleHealth' as const, name: 'Apple Health / Google Fit', desc: 'Step goal tracking and active biometric sync' }
          ].map((srv) => {
            const isConn = profile.connectedServices[srv.key];
            return (
              <div key={srv.key} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                  <p className="text-xs text-slate-500">{srv.desc}</p>
                </div>

                <button
                  onClick={() => toggleService(srv.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isConn
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {isConn ? 'Connected' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
