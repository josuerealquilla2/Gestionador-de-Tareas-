import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!form.username.trim()) return 'El usuario es requerido.';
    if (form.username.length < 3) return 'El usuario debe tener al menos 3 caracteres.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'El email no es valido.';
    if (!form.password) return 'La contraseña es requerida.';
    if (form.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    if (form.password !== form.confirm) return 'Las contraseñas no coinciden.';
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setError('');
    setLoading(true);
    try {
      const data = await register(form.username, form.email, form.password);
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
          <p className="text-slate-400 text-sm mt-1">Crea tu cuenta para empezar</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
          <h2 className="text-white font-semibold text-xl mb-6">Crear cuenta</h2>

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded-lg p-3 text-red-300 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-slate-400 text-sm mb-1.5">Usuario <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              placeholder="min. 3 caracteres"
              className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-400 text-sm mb-1.5">Email <span className="text-slate-600">(opcional)</span></label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="tu@email.com"
              className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-400 text-sm mb-1.5">Contraseña <span className="text-red-400">*</span></label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="min. 6 caracteres"
              className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 text-sm mb-1.5">Confirmar contraseña <span className="text-red-400">*</span></label>
            <input
              type="password"
              value={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              placeholder="Repite tu contraseña"
              className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          <p className="text-slate-500 text-sm text-center mt-5">
            Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Inicia sesion
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
