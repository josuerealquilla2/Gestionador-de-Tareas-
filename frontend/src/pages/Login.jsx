import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';

function EyeIcon({ open }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.16-3.588M6.228 6.228A9.97 9.97 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.423 5.366M3 3l18 18" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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
              autoComplete="username"
              className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 text-sm mb-1.5">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-2.5 pr-11 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
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
