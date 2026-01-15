const API_BASE = "http://localhost:4000/api";

export async function fetchTasks() {
  return fetch(`${API_BASE}/tasks`).then((r) => r.json());
}

export async function createTask(title: string) {
  return fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((r) => r.json());
}

export async function fetchNotes() {
  return fetch(`${API_BASE}/notes`).then((r) => r.json());
}

export async function updateNote(id: string, data: any) {
  return fetch(`${API_BASE}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}
