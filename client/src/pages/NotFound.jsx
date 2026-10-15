import { Link } from 'react-router-dom';

// Fallback page for any URL that doesn't match a route
export default function NotFound() {
  return (
    <section className="center-block">
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for doesn&apos;t exist.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </section>
  );
}
