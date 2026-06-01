import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch {
      setError('No se pudo conectar con el servidor. Asegurate de que Django este corriendo en :8000');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(data) {
    const t = await createTask(data);
    setTasks(prev => [t, ...prev]);
  }

  async function handleToggle(id) {
    const t = await toggleTask(id);
    setTasks(prev => prev.map(x => x.id === id ? t : x));
  }

  async function handleEdit(id, data) {
    const t = await updateTask(id, data);
    setTasks(prev => prev.map(x => x.id === id ? t : x));
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks(prev => prev.filter(x => x.id !== id));
  }

  const pending = tasks.filter(t => !t.is_completed).length;
  const completed = tasks.filter(t => t.is_completed).length;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
            Gestionador de Tareas
          </h1>
          <p className="text-slate-400 text-sm">Organiza tu dia de forma simple</p>

          {tasks.length > 0 && (
            <div className="flex justify-center gap-6 mt-5">
              <div className="bg-slate-700 rounded-xl px-5 py-2.5 text-center">
                <p className="text-2xl font-bold text-blue-300">{pending}</p>
                <p className="text-slate-400 text-xs uppercase tracking-wide">Pendientes</p>
              </div>
              <div className="bg-slate-700 rounded-xl px-5 py-2.5 text-center">
                <p className="text-2xl font-bold text-teal-300">{completed}</p>
                <p className="text-slate-400 text-xs uppercase tracking-wide">Completadas</p>
              </div>
              <div className="bg-slate-700 rounded-xl px-5 py-2.5 text-center">
                <p className="text-2xl font-bold text-white">{tasks.length}</p>
                <p className="text-slate-400 text-xs uppercase tracking-wide">Total</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <TaskForm onCreate={handleCreate} />

        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 mt-3">Cargando tareas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}
