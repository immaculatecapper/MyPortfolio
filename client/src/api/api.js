import { apiRequest } from './apiClient.js';

// ---------- Authentication ----------
export const signin = (credentials) => apiRequest('/auth/signin', { method: 'POST', body: credentials });
export const signout = () => apiRequest('/auth/signout');
export const signup = (user) => apiRequest('/api/users', { method: 'POST', body: user });

// ---------- Generic CRUD helpers for one REST resource ----------
// e.g. createResourceApi('projects') -> { list, read, create, update, remove }
function createResourceApi(resource) {
  const base = `/api/${resource}`;
  return {
    list: (token) => apiRequest(base, { token }),
    read: (id, token) => apiRequest(`${base}/${id}`, { token }),
    create: (record, token) => apiRequest(base, { method: 'POST', body: record, token }),
    update: (id, record, token) => apiRequest(`${base}/${id}`, { method: 'PUT', body: record, token }),
    remove: (id, token) => apiRequest(`${base}/${id}`, { method: 'DELETE', token }),
  };
}

export const projectApi = createResourceApi('projects');
export const qualificationApi = createResourceApi('qualifications');
export const contactApi = createResourceApi('contacts');
export const userApi = createResourceApi('users');
