import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

// Custom hook that keeps a list of records from the backend in React state
// and exposes create / update / remove functions that call the API and then
// update the local list, so the page re-renders immediately.
export default function useRecords(resourceApi, { requireToken = false } = {}) {
  const { token, signout } = useAuth();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // An expired / invalid token means we are no longer signed in
  const handleError = useCallback(
    (err) => {
      if (err.status === 401) signout();
      setError(err.message);
      throw err;
    },
    [signout]
  );

  const load = useCallback(async () => {
    if (requireToken && !token) return;
    setIsLoading(true);
    setError('');
    try {
      setRecords(await resourceApi.list(token));
    } catch (err) {
      setError(err.message);
      if (err.status === 401) signout();
    } finally {
      setIsLoading(false);
    }
  }, [resourceApi, token, requireToken, signout]);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (record) => {
    try {
      const data = await resourceApi.create(record, token);
      // Each controller returns the saved document under a different key (project, qualification…)
      const saved = Object.values(data).find((value) => value && typeof value === 'object' && value._id);
      if (saved) setRecords((previous) => [saved, ...previous]);
      else await load();
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const update = async (id, record) => {
    try {
      const saved = await resourceApi.update(id, record, token);
      setRecords((previous) => previous.map((item) => (item._id === id ? saved : item)));
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const remove = async (id) => {
    try {
      await resourceApi.remove(id, token);
      setRecords((previous) => previous.filter((item) => item._id !== id));
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  return { records, isLoading, error, setError, reload: load, create, update, remove };
}
