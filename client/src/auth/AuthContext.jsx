import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as api from '../api/api.js';

// Global authentication state (React Context).
// Holds the signed-in user + JWT and exposes signin / signout to every component.
// The session is kept in sessionStorage so a page refresh keeps you signed in.
const AuthContext = createContext(null);
const STORAGE_KEY = 'jwt';

function loadSession() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (!saved?.token) return null;
    // Drop the session if the token has expired
    const { exp } = JSON.parse(atob(saved.token.split('.')[1]));
    if (exp && exp * 1000 < Date.now()) return null;
    return saved;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);

  const signin = useCallback(async (credentials) => {
    const data = await api.signin(credentials);
    const newSession = { token: data.token, user: data.user };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    setSession(newSession);
    return data.user;
  }, []);

  const signout = useCallback(async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSession(null);
    try {
      await api.signout();
    } catch {
      // Already signed out locally - nothing else to do
    }
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session),
      isAdmin: session?.user?.role === 'admin',
      signin,
      signout,
    }),
    [session, signin, signout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook used by components: const { user, isAdmin, signin } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}
