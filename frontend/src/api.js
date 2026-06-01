const API = `${import.meta.env.VITE_API_URL ?? 'https://gestionador-de-tareas.vercel.app'}/api`;

function headers() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function login(username, password) {
  try {
    const r = await fetch(`${API}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Error al iniciar sesion');
    return data;
  } catch (e) {
    if (e.message.includes('fetch') || e.message.includes('Network')) {
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexion.');
    }
    throw e;
  }
}

export async function register(username, email, password) {
  try {
    const r = await fetch(`${API}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Error al registrarse');
    return data;
  } catch (e) {
    if (e.message.includes('fetch') || e.message.includes('Network')) {
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexion.');
    }
    throw e;
  }
}

export async function getTasks() {
  const r = await fetch(`${API}/tasks/`, { headers: headers() });
  if (!r.ok) throw new Error('No autorizado');
  return r.json();
}

export async function createTask(data) {
  const r = await fetch(`${API}/tasks/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });
  return r.json();
}

export async function updateTask(id, data) {
  const r = await fetch(`${API}/tasks/${id}/`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  });
  return r.json();
}

export async function toggleTask(id) {
  const r = await fetch(`${API}/tasks/${id}/toggle/`, {
    method: 'PATCH',
    headers: headers(),
  });
  return r.json();
}

export async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}/`, { method: 'DELETE', headers: headers() });
}
