import { useState } from 'react';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [titulo, setTitulo] = useState(task.titulo);
  const [descripcion, setDescripcion] = useState(task.descripcion);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSave() {
    await onEdit(task.id, { titulo, descripcion, is_completed: task.is_completed });
    setEditing(false);
  }

  function handleCancel() {
    setTitulo(task.titulo);
    setDescripcion(task.descripcion);
    setEditing(false);
  }

  const borderColor = task.is_completed
    ? 'border-emerald-500/40'
    : 'border-amber-500/40';
  const dotColor = task.is_completed ? 'bg-emerald-400' : 'bg-amber-400';

  return (
    <div
      className={`bg-slate-800 border ${borderColor} rounded-2xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}
    >
      {editing ? (
        <div>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            autoFocus
            className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            rows={2}
            className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg px-3 py-2 mb-3 resize-none focus:outline-none focus:border-violet-500 transition-colors"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-violet-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-violet-500 transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-slate-700 text-slate-300 text-sm font-semibold py-2 rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-3 mb-2">
            <button
              onClick={() => onToggle(task.id)}
              className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                task.is_completed
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-slate-500 hover:border-amber-400'
              }`}
            >
              {task.is_completed && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-base leading-tight ${task.is_completed ? 'line-through text-slate-500' : 'text-white'}`}>
                {task.titulo}
              </p>
              {task.descripcion && (
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  {task.descripcion}
                </p>
              )}
            </div>

            <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${dotColor}`} />
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
            <span className="text-slate-500 text-xs">
              {new Date(task.created).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                className="text-slate-400 hover:text-violet-400 transition-colors text-sm px-2 py-1 rounded hover:bg-slate-700"
              >
                Editar
              </button>
              {confirmDelete ? (
                <span className="flex gap-1">
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-900/30 transition-colors font-semibold"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="text-slate-400 text-sm px-2 py-1 rounded hover:bg-slate-700 transition-colors"
                  >
                    No
                  </button>
                </span>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="text-slate-400 hover:text-red-400 transition-colors text-sm px-2 py-1 rounded hover:bg-slate-700"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
