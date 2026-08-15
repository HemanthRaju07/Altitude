import React from 'react';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  Sun, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  MapPin,
  Clock
} from 'lucide-react';
import { WeatherData, CalendarEvent } from '../types';

interface WeatherViewProps {
  weather: WeatherData;
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ weather, onAddEvent }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Location Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white p-8 lg:p-10 shadow-xl border border-blue-500/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-100 text-xs font-semibold backdrop-blur-md border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{weather.location}</span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-6xl sm:text-7xl font-black tracking-tight">{weather.temperature}°</span>
              <div>
                <p className="text-xl font-bold text-blue-100">{weather.condition}</p>
                <p className="text-xs text-blue-200">High: {weather.highTemp}° • Low: {weather.lowTemp}°</p>
              </div>
            </div>
          </div>

          {/* Weather Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs">
            <div className="space-y-1">
              <span className="text-blue-200 font-medium">Feels Like</span>
              <p className="text-lg font-bold text-white">{weather.feelsLike}°F</p>
            </div>
            <div className="space-y-1">
              <span className="text-blue-200 font-medium flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5" /> Humidity
              </span>
              <p className="text-lg font-bold text-white">{weather.humidity}%</p>
            </div>
            <div className="space-y-1">
              <span className="text-blue-200 font-medium flex items-center gap-1">
                <Wind className="w-3.5 h-3.5" /> Wind
              </span>
              <p className="text-lg font-bold text-white">{weather.windSpeed} mph</p>
            </div>
            <div className="space-y-1">
              <span className="text-blue-200 font-medium flex items-center gap-1">
                <Sun className="w-3.5 h-3.5" /> UV Index
              </span>
              <p className="text-lg font-bold text-white">{weather.uvIndex} (Moderate)</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Smart Schedule Weather Alerts */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          AI Smart Scheduling Weather Impacts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weather.aiAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-6 rounded-2xl border transition-all ${
                alert.type === 'warning'
                  ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl flex-shrink-0 ${
                  alert.type === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>

                <div className="space-y-2 flex-1">
                  <h4 className="font-bold text-base">{alert.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{alert.impact}</p>
                  <p className="text-xs font-semibold text-slate-900 bg-white/80 p-2.5 rounded-xl border border-slate-200/60">
                    💡 SmartCal Recommendation: {alert.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast Strip */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Today's Hourly Weather Forecast
        </h3>

        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {weather.hourlyForecast.map((h, i) => (
            <div key={i} className="flex-shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-center min-w-[90px] space-y-1">
              <span className="text-xs font-semibold text-slate-500">{h.time}</span>
              <span className="material-symbols-outlined text-amber-500 text-2xl block my-1">{h.icon}</span>
              <span className="text-base font-extrabold text-slate-900">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-600" />
          7-Day Weather Outlook
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.weeklyForecast.map((day, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-center space-y-2">
              <span className="text-xs font-bold text-slate-700">{day.day}</span>
              <span className="material-symbols-outlined text-amber-500 text-2xl block">{day.icon}</span>
              <p className="text-xs text-slate-500 line-clamp-1">{day.condition}</p>
              <p className="text-xs font-bold text-slate-900">{day.high}° / <span className="text-slate-400 font-normal">{day.low}°</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
