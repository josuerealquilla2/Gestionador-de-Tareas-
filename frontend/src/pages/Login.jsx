import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!form.username.trim()) return 'El usuario es requerido.';
    if (!form.password) return 'La contraseña es requerida.';
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setError('');
    setLoading(true);
    try {
      const data = await login(form.username, form.password);
      localStorage.setItem('token', data.access);
      localStorage.setItem('username', data.username);
      navigate('/');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Gestionador de Tareas</h1>
          <p className="text-slate-400 text-sm mt-1">Inicia sesion para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
          <h2 className="text-white font-semibold text-xl mb-6">Iniciar sesion</h2>

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded-lg p-3 text-red-300 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-slate-400 text-sm mb-1.5">Usuario</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              placeholder="tu_usuario"
              className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 text-sm mb-1.5">Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <p className="text-slate-500 text-sm text-center mt-5">
            No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
