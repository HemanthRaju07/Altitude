import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Google GenAI Client helper
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ 
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'SmartCal AI Server' });
});

// AI Voice Processing Endpoint
app.post('/api/ai/voice-process', async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript || typeof transcript !== 'string') {
      return res.status(400).json({ error: 'Transcript string required' });
    }

    const ai = getGenAIClient();
    if (!ai) {
      // Fallback rule-based parse if GEMINI_API_KEY is not configured
      const isTask = transcript.toLowerCase().includes('remind') || transcript.toLowerCase().includes('task');
      return res.json({
        success: true,
        type: isTask ? 'task' : 'event',
        parsedTitle: transcript,
        actionTaken: isTask 
          ? `Created Task from voice: "${transcript}"`
          : `Scheduled Event from voice: "${transcript}"`,
        date: new Date().toISOString().split('T')[0],
        time: '14:00'
      });
    }

    const prompt = `You are SmartCal AI assistant. Analyze the user's voice command: "${transcript}".
Extract:
1. Type: "event" or "task"
2. Clean Title
3. Extracted Date (YYYY-MM-DD or relative like "tomorrow")
4. Extracted Time (HH:MM or default "14:00")
5. Action summary statement (e.g. "Scheduled Product Sync with Sarah for tomorrow at 2 PM")

Return ONLY JSON:
{
  "type": "event" | "task",
  "title": "...",
  "date": "...",
  "time": "...",
  "actionSummary": "..."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const resultText = response.text || '{}';
    let parsedJson = {};
    try {
      parsedJson = JSON.parse(resultText);
    } catch {
      parsedJson = {
        type: 'event',
        title: transcript,
        actionSummary: `Created event for "${transcript}"`
      };
    }

    res.json({
      success: true,
      data: parsedJson
    });
  } catch (err: any) {
    console.error('Voice AI Error:', err);
    res.status(500).json({ error: 'Failed to process AI voice command' });
  }
});

// AI Productivity Report Generator
app.post('/api/ai/generate-report', async (req, res) => {
  try {
    const { totalEvents, tasksDone, productivityScore, currentStreak } = req.body;
    const ai = getGenAIClient();

    if (!ai) {
      return res.json({
        report: `### Weekly AI Productivity Summary 🚀
- **Performance Rating**: Excellent (${productivityScore}/100)
- **Streak**: ${currentStreak} Consecutive Days active
- **Completed Tasks**: ${tasksDone} tasks finalized with zero overdue critical items.
- **Key Recommendation**: You have optimal focus blocks in the early afternoon. Consider reserving 10:00 AM - 12:00 PM for deep work without calendar interruptions.`
      });
    }

    const prompt = `Generate a concise, encouraging 3-bullet executive AI productivity report for SmartCal AI based on these stats:
- Productivity Score: ${productivityScore}/100
- Active Streak: ${currentStreak} days
- Events Attended: ${totalEvents}
- Tasks Completed: ${tasksDone}

Format with markdown bold headings and actionable advice.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt
    });

    res.json({
      report: response.text || 'Productivity report generated successfully.'
    });
  } catch (err: any) {
    console.error('AI Report Error:', err);
    res.status(500).json({ error: 'Failed to generate productivity report' });
  }
});

async function startServer() {
  // Development setup with Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SmartCal AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
