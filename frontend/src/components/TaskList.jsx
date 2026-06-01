import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const pending = tasks.filter(t => !t.is_completed);
  const completed = tasks.filter(t => t.is_completed);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">📋</p>
        <p className="text-slate-400 text-lg">No hay tareas todavia.</p>
        <p className="text-slate-500 text-sm mt-1">Crea una nueva tarea para empezar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {pending.length > 0 && (
        <section>
          <h2 className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            Pendientes ({pending.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {pending.map(t => (
              <TaskCard key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
            Completadas ({completed.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {completed.map(t => (
              <TaskCard key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
