// Small wrapper around fetch() used by every API call in the app.
// - Prefixes the backend URL (empty in development: Vite proxies /api and /auth to port 3000)
// - Sends/receives JSON and attaches the JWT as "Authorization: Bearer <token>"
// - Throws an Error with the backend's error message when the request fails
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Could not reach the server. Is the backend running?');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data;
}
