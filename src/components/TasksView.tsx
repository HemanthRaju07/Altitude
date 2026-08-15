import React, { useState } from 'react';
import { 
  CheckSquare, 
  Sparkles, 
  Plus, 
  Check, 
  Clock, 
  AlertCircle, 
  Filter, 
  Trash2, 
  Tag, 
  ChevronDown, 
  ChevronUp,
  Zap,
  BookOpen
} from 'lucide-react';
import { TaskItem } from '../types';

interface TasksViewProps {
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  setTasks,
  onAddTask
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newCategory, setNewCategory] = useState<'Work' | 'Personal' | 'College' | 'Health' | 'Finance'>('Work');
  const [newDueDate, setNewDueDate] = useState(new Date().toISOString().split('T')[0]);

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed, progress: !t.completed ? 100 : 0 };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle,
      description: newDesc,
      priority: newPriority,
      category: newCategory,
      dueDate: newDueDate,
      completed: false,
      progress: 0
    });

    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  const autoScheduleExamTasks = () => {
    const examTask: Omit<TaskItem, 'id'> = {
      title: 'Final Exam Study Session: Chapter 4 to 8',
      description: 'Auto-generated focus task from upcoming exam detection on Calendar.',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '16:00',
      priority: 'high',
      completed: false,
      category: 'College',
      progress: 25
    };
    onAddTask(examTask);
  };

  const todayTasks = tasks.filter(t => !t.completed && (filterPriority === 'All' || t.priority === filterPriority));
  const completedTasks = tasks.filter(t => t.completed);

  const activeCount = todayTasks.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            Task Management
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            You have <span className="font-bold text-blue-600">{activeCount} pending tasks</span> to complete today.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Task</span>
        </button>
      </div>

      {/* AI Suggestion Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 rounded-2xl border border-indigo-700/50 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse text-purple-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              AI Smart Suggestion
            </span>
            <h3 className="font-bold text-base text-white mt-1">
              Create tasks from my calendar: Upcoming 'Final Exams' detected.
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              SmartCal AI detected calendar exam events. Automatically schedule 2-hour daily study sessions?
            </p>
          </div>
        </div>

        <button
          onClick={autoScheduleExamTasks}
          className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer flex-shrink-0 shadow-lg shadow-purple-500/20"
        >
          <BookOpen className="w-4 h-4" />
          <span>Auto-Schedule Study Tasks</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 p-2 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-xs font-semibold text-slate-500 px-3 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Priority:
          </span>
          {['All', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterPriority === p
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Pending Tasks List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Today's Active Tasks ({todayTasks.length})
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {todayTasks.map((task) => (
            <div 
              key={task.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                {/* Completion Checkbox */}
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="w-6 h-6 rounded-lg border-2 border-slate-300 group-hover:border-blue-500 flex items-center justify-center text-white transition-colors cursor-pointer mt-0.5"
                >
                  {task.completed && <Check className="w-4 h-4 text-blue-600" />}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </h4>

                    {/* Priority Badge */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : task.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {task.priority} Priority
                    </span>

                    {/* Category Badge */}
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {task.category}
                    </span>
                  </div>

                  {task.description && (
                    <p className="text-xs text-slate-500">{task.description}</p>
                  )}

                  {/* Subtask count or progress bar */}
                  {task.progress !== undefined && (
                    <div className="w-48 pt-1">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${task.progress}%` }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="text-xs font-semibold text-slate-400">
                  {task.dueTime || task.dueDate}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {todayTasks.length === 0 && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 space-y-2">
              <CheckSquare className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800">All tasks completed!</p>
              <p className="text-xs">Great job. You have no pending tasks under this filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <span>Completed Tasks ({completedTasks.length})</span>
            {showCompleted ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showCompleted && (
            <div className="grid grid-cols-1 gap-2">
              {completedTasks.map((task) => (
                <div 
                  key={task.id}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-center justify-between text-slate-500 opacity-75"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-medium line-through">{task.title}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">Done</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* New Task Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Create New Task
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Review Q4 Marketing Budget"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Description
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Additional notes or details..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="College">College</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
