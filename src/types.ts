export type TabType = 
  | 'dashboard'
  | 'calendar'
  | 'voice'
  | 'festivals'
  | 'tasks'
  | 'health'
  | 'agenda'
  | 'profile'
  | 'analytics'
  | 'notifications'
  | 'settings'
  | 'weather'
  | 'search';

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  dueTime?: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  category: 'Work' | 'Personal' | 'College' | 'Health' | 'Finance';
  progress?: number; // 0 - 100
  subtasksCount?: { completed: number; total: number };
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;
  location?: string;
  attendees?: string[];
  category: 'Meeting' | 'Work' | 'Personal' | 'Health' | 'Holiday';
  color?: string;
  description?: string;
}

export interface FestivalItem {
  id: string;
  title: string;
  date: string;
  category: 'National' | 'Religious' | 'Cultural';
  imageUrl: string;
  description: string;
  daysRemaining?: number;
  location?: string;
  isFeatured?: boolean;
}

export interface HealthData {
  stepsCount: number;
  stepsGoal: number;
  heartRate: number; // BPM
  caloriesBurned: number;
  sleepHours: number;
  sleepMinutes: number;
  sleepQualityScore: number;
  weeklySteps: { day: string; steps: number }[];
}

export interface WeatherData {
  location: string;
  temperature: number; // Fahrenheit or C
  condition: string;
  highTemp: number;
  lowTemp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  hourlyForecast: { time: string; temp: number; icon: string }[];
  weeklyForecast: { day: string; condition: string; high: number; low: number; icon: string }[];
  aiAlerts: { id: string; title: string; impact: string; recommendation: string; type: 'warning' | 'info' }[];
}

export interface VoiceCommand {
  id: string;
  transcript: string;
  timestamp: string;
  actionTaken: string;
  status: 'executed' | 'pending' | 'processing';
  createdItemType?: 'event' | 'task' | 'reminder';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'ai' | 'weather' | 'calendar' | 'task' | 'festival';
  read: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  productivityScore: number;
  currentStreak: number;
  totalEvents: number;
  tasksDone: number;
  workHours: { start: string; end: string };
  sleepSchedule: { start: string; end: string };
  connectedServices: {
    googleCalendar: boolean;
    weatherService: boolean;
    appleHealth: boolean;
  };
}
