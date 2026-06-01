import { useState } from 'react';

export default function TaskForm({ onCreate }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim()) return;
    await onCreate({ titulo, descripcion });
    setTitulo('');
    setDescripcion('');
    setOpen(false);
  }

  return (
    <div className="mb-8">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-violet-500 hover:to-blue-500 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span className="text-xl">+</span> Nueva tarea
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl max-w-lg mx-auto"
        >
          <h2 className="text-white font-semibold text-lg mb-4">Nueva tarea</h2>
          <input
            type="text"
            placeholder="Titulo *"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            autoFocus
            className="w-full bg-slate-900 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <textarea
            placeholder="Descripcion (opcional)"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-4 py-2.5 mb-4 resize-none focus:outline-none focus:border-violet-500 transition-colors"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold py-2.5 rounded-lg hover:from-violet-500 hover:to-blue-500 transition-all duration-200"
            >
              Crear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
