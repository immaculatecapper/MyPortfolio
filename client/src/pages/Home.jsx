import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile.js';

/**
 * Home page: welcome message, mission statement and quick links.
 * If the visitor was redirected here from the Contact form, a thank-you
 * banner is shown using the name passed through router state.
 */
export default function Home() {
  const location = useLocation();
  const submittedMessage = location.state?.submittedMessage;

  return (
    <>
      {submittedMessage && (
        <div className="notice" role="status">
          Thanks, {submittedMessage.firstName}! Your message was received – I&apos;ll get back to you at{' '}
          {submittedMessage.email} soon.
        </div>
      )}

      <section className="hero">
        <span className="eyebrow">Welcome to my portfolio</span>
        <h1>
          Hi, I&apos;m Mark. I build <span className="accent-text">AI tools</span> and make sure software{' '}
          <span className="accent-text">actually works</span>.
        </h1>
        <p className="hero-lead muted">
          {profile.title} based in {profile.location}. I combine agentic AI development with a background in QA
          automation to deliver solutions that are useful, reliable and well-tested.
        </p>
        <div className="button-row">
          <Link to="/about" className="btn btn-primary">About Me →</Link>
          <Link to="/projects" className="btn btn-outline">View Projects</Link>
          <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
        </div>
      </section>

      <section className="mission card">
        <span className="eyebrow">Mission</span>
        <p className="mission-text">{profile.missionStatement}</p>
      </section>

      <section className="grid grid-3 quick-links">
        <Link to="/projects" className="card link-card">
          <h3>Projects</h3>
          <p className="muted">Agentic AI pipelines, test automation, Python and Bash.</p>
        </Link>
        <Link to="/services" className="card link-card">
          <h3>Services</h3>
          <p className="muted">QA automation, software development and AI solutions.</p>
        </Link>
        <Link to="/education" className="card link-card">
          <h3>Education</h3>
          <p className="muted">AI Software Engineering at Centennial · BSc from Waterloo.</p>
        </Link>
      </section>
    </>
  );
}
