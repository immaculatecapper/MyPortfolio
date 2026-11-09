import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

// Protects a route on the frontend.
//  <PrivateRoute>             -> any signed-in user
//  <PrivateRoute adminOnly>   -> only users with the "admin" role
// Visitors who are not signed in are sent to /signin and returned afterwards.
export default function PrivateRoute({ adminOnly = false, children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }
  if (adminOnly && !isAdmin) {
    return (
      <div className="center-block">
        <h1>Admins only</h1>
        <p className="muted">You need an admin account to view this page.</p>
      </div>
    );
  }
  return children;
}
