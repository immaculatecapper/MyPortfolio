import { Link } from 'react-router-dom';
import { offeredServices } from '../data/services.js';
import ServiceIcon from '../components/ServiceIcon.jsx';

// Services page: short list of what I offer, each with an icon
export default function Services() {
  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Services</span>
        <h1>What I Can Do for You</h1>
        <p className="muted">From building AI-powered tools to making sure your software ships without surprises.</p>
      </header>

      <div className="grid grid-2">
        {offeredServices.map((service) => (
          <article key={service.name} className="card service-card">
            <div className="service-icon-wrap">
              <ServiceIcon name={service.icon} />
            </div>
            <div>
              <h2>{service.name}</h2>
              <p className="muted">{service.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="cta card">
        <h2>Have a project in mind?</h2>
        <Link to="/contact" className="btn btn-primary">Let&apos;s talk</Link>
      </div>
    </>
  );
}
