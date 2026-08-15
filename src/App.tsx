import React, { useState } from 'react';
import { TabType, CalendarEvent, TaskItem, FestivalItem, VoiceCommand, NotificationItem } from './types';
import { 
  initialFestivals, 
  initialTasks, 
  initialEvents, 
  initialHealthData, 
  initialWeatherData, 
  initialVoiceCommands, 
  initialNotifications, 
  initialProfile 
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CalendarView } from './components/CalendarView';
import { VoiceView } from './components/VoiceView';
import { FestivalsView } from './components/FestivalsView';
import { TasksView } from './components/TasksView';
import { HealthView } from './components/HealthView';
import { AgendaView } from './components/AgendaView';
import { ProfileView } from './components/ProfileView';
import { AnalyticsView } from './components/AnalyticsView';
import { NotificationsView } from './components/NotificationsView';
import { SettingsView } from './components/SettingsView';
import { WeatherView } from './components/WeatherView';
import { GlobalSearchView } from './components/GlobalSearchView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('voice'); // Default to AI Voice as central feature
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // App State Collections
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [festivals, setFestivals] = useState<FestivalItem[]>(initialFestivals);
  const [healthData, setHealthData] = useState(initialHealthData);
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [voiceCommands, setVoiceCommands] = useState<VoiceCommand[]>(initialVoiceCommands);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [profile, setProfile] = useState(initialProfile);

  // Global Handlers
  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const eventWithId: CalendarEvent = {
      ...newEvent,
      id: 'e_' + Date.now()
    };
    setEvents(prev => [eventWithId, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: 'n_' + Date.now(),
      title: 'New Event Scheduled',
      message: `"${newEvent.title}" scheduled for ${newEvent.date} at ${newEvent.startTime}.`,
      timestamp: 'Just now',
      type: 'calendar',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleAddTask = (newTask: Omit<TaskItem, 'id'>) => {
    const taskWithId: TaskItem = {
      ...newTask,
      id: 't_' + Date.now()
    };
    setTasks(prev => [taskWithId, ...prev]);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#faf8ff] font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        unreadCount={unreadNotificationsCount}
        userName={profile.name}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Sticky Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadCount={unreadNotificationsCount}
          onOpenQuickAdd={() => setActiveTab('calendar')}
        />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <DashboardView
              setActiveTab={setActiveTab}
              events={events}
              tasks={tasks}
              festivals={festivals}
              health={healthData}
              weather={weatherData}
              profile={profile}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              events={events}
              onAddEvent={handleAddEvent}
            />
          )}

          {activeTab === 'voice' && (
            <VoiceView
              onAddEvent={handleAddEvent}
              onAddTask={handleAddTask}
              voiceCommands={voiceCommands}
              setVoiceCommands={setVoiceCommands}
            />
          )}

          {activeTab === 'festivals' && (
            <FestivalsView
              festivals={festivals}
              onAddEvent={handleAddEvent}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={tasks}
              setTasks={setTasks}
              onAddTask={handleAddTask}
            />
          )}

          {activeTab === 'health' && (
            <HealthView
              healthData={healthData}
              setHealthData={setHealthData}
              onAddEvent={handleAddEvent}
            />
          )}

          {activeTab === 'agenda' && (
            <AgendaView
              events={events}
              onAddEvent={handleAddEvent}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              profile={profile}
              setProfile={setProfile}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              profile={profile}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}

          {activeTab === 'weather' && (
            <WeatherView
              weather={weatherData}
              onAddEvent={handleAddEvent}
            />
          )}

          {activeTab === 'search' && (
            <GlobalSearchView
              events={events}
              tasks={tasks}
              festivals={festivals}
              setActiveTab={setActiveTab}
            />
          )}
        </main>
      </div>
    </div>
  );
}
