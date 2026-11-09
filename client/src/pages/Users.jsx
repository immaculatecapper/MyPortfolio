import { userApi } from '../api/api.js';
import { useAuth } from '../auth/AuthContext.jsx';
import useRecords from '../hooks/useRecords.js';
import { formatDate } from '../data/recordFields.js';

/**
 * Users page (admin only) - every account from MongoDB (GET /api/users).
 * The admin can promote/demote a user's role or delete their account.
 */
export default function Users() {
  const { user: currentUser } = useAuth();
  const { records: users, isLoading, error, update, remove } = useRecords(userApi, { requireToken: true });

  const toggleRole = (user) =>
    update(user._id, { role: user.role === 'admin' ? 'user' : 'admin' }).catch(() => {});

  const handleDelete = (user) => {
    if (window.confirm(`Delete the account for ${user.email}?`)) remove(user._id).catch(() => {});
  };

  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Admin</span>
        <h1>Users</h1>
        <p className="muted">Everyone who has signed up. New accounts start with the “user” (read-only) role.</p>
      </header>

      {error && <div className="alert-error" role="alert">{error}</div>}
      {isLoading && <p className="muted">Loading users…</p>}

      {!isLoading && users.length > 0 && (
        <div className="card table-card">
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th aria-label="Actions" /></tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isMe = user._id === currentUser._id;
                return (
                  <tr key={user._id}>
                    <td>{user.name}{isMe && ' (you)'}</td>
                    <td>{user.email}</td>
                    <td><span className={`role-badge ${user.role === 'admin' ? 'admin' : ''}`}>{user.role}</span></td>
                    <td>{formatDate(user.created, { dateStyle: 'medium' })}</td>
                    <td>
                      {!isMe && (
                        <div className="record-actions">
                          <button type="button" className="btn btn-outline btn-sm" onClick={() => toggleRole(user)}>
                            {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                          </button>
                          <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(user)}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
