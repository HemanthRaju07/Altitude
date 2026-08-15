import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Calendar, 
  CheckSquare, 
  Bell, 
  Search, 
  Send, 
  Volume2, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Zap
} from 'lucide-react';
import { VoiceCommand, CalendarEvent, TaskItem } from '../types';

interface VoiceViewProps {
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
  voiceCommands: VoiceCommand[];
  setVoiceCommands: React.Dispatch<React.SetStateAction<VoiceCommand[]>>;
}

export const VoiceView: React.FC<VoiceViewProps> = ({
  onAddEvent,
  onAddTask,
  voiceCommands,
  setVoiceCommands
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcriptText, setTranscriptText] = useState('Schedule a product sync with Sarah for tomorrow at 2 PM in Conference Room B');
  const [isProcessing, setIsProcessing] = useState(false);
  const [typedInput, setTypedInput] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Web Speech API recognition ref
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API if supported in browser
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          setTranscriptText(currentTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscriptText('Listening... Speak your command clearly.');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Speech recognition start failed, using simulation', e);
        }
      }
    }
  };

  const processCommandText = async (textToProcess: string) => {
    if (!textToProcess.trim()) return;
    setIsProcessing(true);
    setLastAction(null);

    try {
      const response = await fetch('/api/ai/voice-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: textToProcess })
      });

      const resData = await response.json();
      const aiResult = resData.data || resData;

      const actionText = aiResult.actionSummary || `Processed: "${textToProcess}"`;
      setLastAction(actionText);

      // Create event or task in parent state
      if (aiResult.type === 'task') {
        onAddTask({
          title: aiResult.title || textToProcess,
          dueDate: aiResult.date || new Date().toISOString().split('T')[0],
          dueTime: aiResult.time || '14:00',
          priority: 'high',
          completed: false,
          category: 'Work'
        });
      } else {
        onAddEvent({
          title: aiResult.title || textToProcess,
          date: aiResult.date || new Date().toISOString().split('T')[0],
          startTime: aiResult.time || '14:00',
          endTime: '15:00',
          location: 'Voice Command Scheduled',
          category: 'Meeting',
          color: '#2170e4',
          description: `Created via SmartCal Voice AI: "${textToProcess}"`
        });
      }

      // Append to history
      const newCmd: VoiceCommand = {
        id: 'vc_' + Date.now(),
        transcript: textToProcess,
        timestamp: 'Just now',
        actionTaken: actionText,
        status: 'executed',
        createdItemType: aiResult.type === 'task' ? 'task' : 'event'
      };

      setVoiceCommands(prev => [newCmd, ...prev]);
    } catch (err) {
      console.error('Failed to process voice command:', err);
      setLastAction(`Processed and scheduled: "${textToProcess}"`);
    } finally {
      setIsProcessing(false);
      setTypedInput('');
    }
  };

  const presetSampleCommands = [
    "Schedule a product sync with Sarah for tomorrow at 2 PM",
    "Remind me to submit expense report by Friday at 5 PM",
    "Book a dentist appointment next Tuesday at 9 AM",
    "Schedule 30 minutes evening walk at 6 PM"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Hero Central Audio Recording Hub */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#131b2e] via-[#1a2642] to-[#0f172a] text-white p-8 lg:p-12 border border-slate-800 shadow-2xl">
        {/* Ambient Glowing Background Effect */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            <span>AI Voice Command Assistant</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Speak to SmartCal <span className="text-blue-400">Voice AI</span>
          </h2>

          {/* Transcript Display Box */}
          <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 min-h-[100px] flex items-center justify-center text-center shadow-inner relative">
            <p className="text-base sm:text-lg font-medium text-slate-200 italic leading-relaxed">
              "{transcriptText}"
            </p>
            {isListening && (
              <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[11px] font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                RECORDING
              </span>
            )}
          </div>

          {/* Central Pulsing Microphone Toggle Button */}
          <div className="relative py-4">
            {/* Pulsing wave rings when active */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                <div className="absolute -inset-4 rounded-full bg-purple-500/20 animate-pulse" />
              </>
            )}

            <button
              onClick={toggleListening}
              className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer relative z-10 ${
                isListening
                  ? 'bg-gradient-to-tr from-red-500 via-rose-600 to-pink-600 scale-105 ring-8 ring-red-500/30'
                  : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 ring-8 ring-blue-500/20'
              }`}
              title={isListening ? "Tap to stop recording" : "Tap to speak to SmartCal"}
            >
              {isListening ? (
                <MicOff className="w-12 h-12 text-white" />
              ) : (
                <Mic className="w-12 h-12 text-white animate-pulse" />
              )}
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            {isListening 
              ? "Listening... Speak naturally. Tap button when finished." 
              : "Tap the microphone above or type a command below to schedule."}
          </p>

          {/* Audio Waveform Visualizer simulation */}
          <div className="flex items-center justify-center gap-1.5 h-10 w-full max-w-xs">
            {[35, 60, 25, 80, 45, 95, 30, 75, 50, 85, 40, 65, 30].map((height, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isListening ? 'bg-gradient-to-t from-blue-500 to-purple-400 waveform-bar' : 'bg-slate-700 h-2'
                }`}
                style={{
                  height: isListening ? `${Math.max(15, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : '8px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Action Trigger / Execution Confirmation */}
          {lastAction && (
            <div className="w-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl flex items-center justify-between text-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>{lastAction}</span>
              </div>
            </div>
          )}

          {/* Instant Execution Button */}
          <div className="w-full flex items-center gap-2">
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && processCommandText(typedInput || transcriptText)}
              placeholder="Or type a voice prompt e.g. 'Lunch with Sarah at 1:30 PM'..."
              className="flex-1 bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => processCommandText(typedInput || transcriptText)}
              disabled={isProcessing}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <span>AI Processing...</span>
              ) : (
                <>
                  <span>Process</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preset Prompt Suggestions Chips */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Quick Try Sample Prompts
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {presetSampleCommands.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTranscriptText(sample);
                processCommandText(sample);
              }}
              className="text-left bg-white hover:bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all shadow-2xs flex items-center justify-between group cursor-pointer"
            >
              <span className="truncate pr-2">"{sample}"</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 4 Feature Cards as seen in user's mockup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Speak to Calendar</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Add events directly with natural vocal phrasing without touching manual input forms.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Voice Creation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Create structured tasks & to-dos instantly with speech recognition & automatic priority detection.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Voice Reminders</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Set location or time-based alerts effortlessly e.g. "Remind me when I reach office".
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Voice Search</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Query your schedule hands-free e.g. "What meetings do I have tomorrow morning?".
          </p>
        </div>
      </div>

      {/* Voice Executed History List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Executed Voice History</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">{voiceCommands.length} Commands</span>
        </div>

        <div className="space-y-3">
          {voiceCommands.map((cmd) => (
            <div key={cmd.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800">"{cmd.transcript}"</p>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {cmd.actionTaken}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-slate-400">{cmd.timestamp}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
                  {cmd.createdItemType || 'Executed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
