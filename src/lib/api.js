const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const getToken = () => localStorage.getItem('novatech_token');
export const setToken = token => token ? localStorage.setItem('novatech_token', token) : localStorage.removeItem('novatech_token');

export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers, body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body });
  const data = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || `API error (${response.status})`);
  return data;
}
