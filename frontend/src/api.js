const BASE = 'http://localhost:8000/api/tasks';

export async function getTasks() {
  const r = await fetch(`${BASE}/`);
  return r.json();
}

export async function createTask(data) {
  const r = await fetch(`${BASE}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.json();
}

export async function updateTask(id, data) {
  const r = await fetch(`${BASE}/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.json();
}

export async function toggleTask(id) {
  const r = await fetch(`${BASE}/${id}/toggle/`, { method: 'PATCH' });
  return r.json();
}

export async function deleteTask(id) {
  await fetch(`${BASE}/${id}/`, { method: 'DELETE' });
}
