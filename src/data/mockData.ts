import { 
  TaskItem, 
  CalendarEvent, 
  FestivalItem, 
  HealthData, 
  WeatherData, 
  VoiceCommand, 
  NotificationItem, 
  UserProfile 
} from '../types';

export const initialFestivals: FestivalItem[] = [
  {
    id: 'f1',
    title: 'Happy Diwali!',
    date: 'November 1, 2024',
    category: 'Religious',
    imageUrl: 'https://images.unsplash.com/photo-1605280263929-1c42c62ef169?auto=format&fit=crop&q=80&w=1000',
    description: 'The Festival of Lights celebrating the triumph of light over darkness, good over evil, and knowledge over ignorance.',
    daysRemaining: 12,
    location: 'India & Worldwide',
    isFeatured: true
  },
  {
    id: 'f2',
    title: 'Christmas Day',
    date: 'December 25, 2024',
    category: 'Religious',
    imageUrl: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=600',
    description: 'Annual holiday commemorating the birth of Jesus Christ, celebrated by billions of people around the world.',
    daysRemaining: 66,
    location: 'Global'
  },
  {
    id: 'f3',
    title: 'Holi - Festival of Colors',
    date: 'March 25, 2025',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&q=80&w=600',
    description: 'Vibrant spring festival celebrating love, color, and the arrival of spring with playful color throwing.',
    daysRemaining: 156,
    location: 'India & Global'
  },
  {
    id: 'f4',
    title: 'Thanksgiving Day',
    date: 'November 28, 2024',
    category: 'National',
    imageUrl: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&q=80&w=600',
    description: 'National holiday in the United States celebrating harvest blessings and expressions of gratitude.',
    daysRemaining: 39,
    location: 'United States'
  },
  {
    id: 'f5',
    title: 'Eid al-Fitr',
    date: 'April 10, 2025',
    category: 'Religious',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600',
    description: 'Religious holiday celebrated by Muslims worldwide that marks the end of the month-long dawn-to-sunset fasting of Ramadan.',
    daysRemaining: 172,
    location: 'Worldwide'
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 't1',
    title: 'Finalize Q4 Product Roadmap Deck',
    description: 'Review slide metrics with Sarah and update key deliverables.',
    dueDate: '2024-10-24',
    dueTime: '14:00',
    priority: 'high',
    completed: false,
    category: 'Work',
    progress: 75,
    subtasksCount: { completed: 3, total: 4 }
  },
  {
    id: 't2',
    title: 'Sync with Design Team on SmartCal UI',
    description: 'Confirm voice visualizer component design & high-contrast theme.',
    dueDate: '2024-10-24',
    dueTime: '15:30',
    priority: 'high',
    completed: false,
    category: 'Work',
    progress: 50,
    subtasksCount: { completed: 1, total: 2 }
  },
  {
    id: 't3',
    title: 'Review Marketing Expense Report',
    description: 'Cross check receipts against budget allocations.',
    dueDate: '2024-10-24',
    dueTime: '17:00',
    priority: 'medium',
    completed: false,
    category: 'Finance',
    progress: 20,
    subtasksCount: { completed: 0, total: 3 }
  },
  {
    id: 't4',
    title: '30 Mins Evening Cardio & Walk',
    description: 'Reach daily 8,000 step milestone.',
    dueDate: '2024-10-24',
    dueTime: '18:30',
    priority: 'medium',
    completed: false,
    category: 'Health',
    progress: 0
  },
  {
    id: 't5',
    title: 'Prepare Final Exam Study Notes',
    description: 'Summarize Chapters 4 to 8 for upcoming tests.',
    dueDate: '2024-10-26',
    dueTime: '10:00',
    priority: 'high',
    completed: false,
    category: 'College',
    progress: 30
  },
  {
    id: 't6',
    title: 'Dentist Appointment Prep & Paperwork',
    description: 'Fill health history form online before appointment.',
    dueDate: '2024-10-25',
    dueTime: '08:30',
    priority: 'medium',
    completed: false,
    category: 'Health',
    progress: 0
  },
  {
    id: 't7',
    title: 'Daily Engineering Standup Notes',
    description: 'Summarize sprint tickets completed yesterday.',
    dueDate: '2024-10-24',
    dueTime: '09:30',
    priority: 'low',
    completed: true,
    category: 'Work',
    progress: 100
  },
  {
    id: 't8',
    title: 'Book Diwali Travel Tickets',
    description: 'Confirm flight bookings for holiday trip.',
    dueDate: '2024-10-23',
    dueTime: '12:00',
    priority: 'high',
    completed: true,
    category: 'Personal',
    progress: 100
  }
];

export const initialEvents: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Product Sync: Q4 Roadmap',
    date: '2024-10-24',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Conference Room B / Google Meet',
    attendees: ['Sarah Jenkins', 'Hemanth', 'Alex Rivera'],
    category: 'Meeting',
    color: '#2170e4',
    description: 'Review upcoming features, engineering milestones, and AI voice assistant rollout.'
  },
  {
    id: 'e2',
    title: 'Lunch with Sarah',
    date: '2024-10-24',
    startTime: '13:30',
    endTime: '14:30',
    location: 'Artisan Cafe, 3rd St',
    attendees: ['Sarah Jenkins', 'Hemanth'],
    category: 'Personal',
    color: '#10b981',
    description: 'Casual catchup regarding project feedback and team sync.'
  },
  {
    id: 'e3',
    title: 'Team Retrospective',
    date: '2024-10-24',
    startTime: '16:00',
    endTime: '17:00',
    location: 'Virtual Studio',
    attendees: ['Entire Engineering Team'],
    category: 'Work',
    color: '#8b5cf6',
    description: 'Sprint retro to review wins, blockers, and improvements.'
  },
  {
    id: 'e4',
    title: 'Dentist Appointment',
    date: '2024-10-25',
    startTime: '09:00',
    endTime: '10:00',
    location: 'Dental Care Center, Suite 400',
    category: 'Health',
    color: '#ec4899',
    description: 'Routine checkup and cleaning.'
  },
  {
    id: 'e5',
    title: 'Design System Review',
    date: '2024-10-25',
    startTime: '14:00',
    endTime: '15:30',
    location: 'Design Lab',
    attendees: ['UI/UX Guild'],
    category: 'Work',
    color: '#f59e0b',
    description: 'Evaluate glassmorphic cards, typography scale, and dark mode contrast.'
  }
];

export const initialHealthData: HealthData = {
  stepsCount: 6842,
  stepsGoal: 8000,
  heartRate: 78,
  caloriesBurned: 420,
  sleepHours: 7,
  sleepMinutes: 30,
  sleepQualityScore: 88,
  weeklySteps: [
    { day: 'Mon', steps: 7200 },
    { day: 'Tue', steps: 8400 },
    { day: 'Wed', steps: 6842 },
    { day: 'Thu', steps: 9100 },
    { day: 'Fri', steps: 7900 },
    { day: 'Sat', steps: 10200 },
    { day: 'Sun', steps: 6100 }
  ]
};

export const initialWeatherData: WeatherData = {
  location: 'San Francisco, CA',
  temperature: 72,
  condition: 'Partly Cloudy',
  highTemp: 76,
  lowTemp: 58,
  feelsLike: 74,
  humidity: 45,
  windSpeed: 12,
  uvIndex: 6,
  hourlyForecast: [
    { time: '12 PM', temp: 70, icon: 'partly_cloudy_day' },
    { time: '1 PM', temp: 72, icon: 'sunny' },
    { time: '2 PM', temp: 74, icon: 'sunny' },
    { time: '3 PM', temp: 75, icon: 'sunny' },
    { time: '4 PM', temp: 71, icon: 'rainy' },
    { time: '5 PM', temp: 68, icon: 'rainy' },
    { time: '6 PM', temp: 65, icon: 'partly_cloudy_day' }
  ],
  weeklyForecast: [
    { day: 'Today', condition: 'Partly Cloudy', high: 76, low: 58, icon: 'partly_cloudy_day' },
    { day: 'Thu', condition: 'Sunny & Clear', high: 78, low: 59, icon: 'sunny' },
    { day: 'Fri', condition: 'Scattered Rain', high: 66, low: 52, icon: 'rainy' },
    { day: 'Sat', condition: 'Windy', high: 68, low: 54, icon: 'air' },
    { day: 'Sun', condition: 'Sunny', high: 74, low: 57, icon: 'sunny' },
    { day: 'Mon', condition: 'Partly Cloudy', high: 72, low: 56, icon: 'partly_cloudy_day' },
    { day: 'Tue', condition: 'Clear', high: 75, low: 58, icon: 'sunny' }
  ],
  aiAlerts: [
    {
      id: 'wa1',
      title: 'Cricket Match & Outdoor Workout Alert',
      impact: '80% rain probability predicted between 4:00 PM and 5:30 PM.',
      recommendation: 'SmartCal recommends shifting outdoor practice or evening run to 2:00 PM.',
      type: 'warning'
    },
    {
      id: 'wa2',
      title: 'Optimal Outdoor Lunch Time',
      impact: 'Clear skies and comfortable 74° weather at 1:30 PM.',
      recommendation: 'Your scheduled lunch with Sarah at Artisan Cafe has ideal weather conditions.',
      type: 'info'
    }
  ]
};

export const initialVoiceCommands: VoiceCommand[] = [
  {
    id: 'vc1',
    transcript: 'Schedule a product sync with Sarah for tomorrow at 2 PM in Conference Room B',
    timestamp: '10:15 AM today',
    actionTaken: 'Created Event "Product Sync with Sarah" for Oct 25, 2024 at 2:00 PM',
    status: 'executed',
    createdItemType: 'event'
  },
  {
    id: 'vc2',
    transcript: 'Remind me to submit expense report by Friday 5 PM',
    timestamp: 'Yesterday',
    actionTaken: 'Added Task "Submit Expense Report" due Oct 25, 2024',
    status: 'executed',
    createdItemType: 'task'
  },
  {
    id: 'vc3',
    transcript: 'Schedule an evening walk at 6 PM after team retro',
    timestamp: 'Oct 22',
    actionTaken: 'Created Task "Evening Walk" for 6:00 PM',
    status: 'executed',
    createdItemType: 'task'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Free Time Detected',
    message: 'You have a 3-hour gap tomorrow afternoon (11:30 AM - 2:30 PM). Would you like to schedule Focus Study?',
    timestamp: '10 mins ago',
    type: 'ai',
    read: false
  },
  {
    id: 'n2',
    title: 'Weather Warning for Evening Run',
    message: 'Heavy rain expected around 4:00 PM today. Consider moving outdoor workout earlier.',
    timestamp: '1 hour ago',
    type: 'weather',
    read: false
  },
  {
    id: 'n3',
    title: 'Upcoming Festival: Happy Diwali!',
    message: 'Diwali starts in 12 days. SmartCal added regional holiday calendar suggestions.',
    timestamp: '3 hours ago',
    type: 'festival',
    read: false
  },
  {
    id: 'n4',
    title: 'Q4 Product Sync Starting Soon',
    message: 'Meeting with Sarah Jenkins in 30 minutes in Conference Room B.',
    timestamp: 'Yesterday',
    type: 'calendar',
    read: true
  }
];

export const initialProfile: UserProfile = {
  name: 'Hemanth',
  email: 'hemanth.user@smartcal.ai',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  productivityScore: 94,
  currentStreak: 14,
  totalEvents: 342,
  tasksDone: 894,
  workHours: { start: '09:00', end: '18:00' },
  sleepSchedule: { start: '22:30', end: '06:30' },
  connectedServices: {
    googleCalendar: true,
    weatherService: true,
    appleHealth: true
  }
};
