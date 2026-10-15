import { educationHistory, professionalExperience } from '../data/education.js';

// Education page: academic credentials (with dates) plus a short work timeline
export default function Education() {
  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Education</span>
        <h1>Qualifications</h1>
        <p className="muted">Formal education and the professional experience that complements it.</p>
      </header>

      <ol className="timeline">
        {educationHistory.map((school) => (
          <li key={school.institution} className="card timeline-item">
            <div className="timeline-head">
              <div>
                <h2>{school.credential}</h2>
                <p className="muted">{school.institution} · {school.location}</p>
              </div>
              <span className="date-badge">{school.dates}</span>
            </div>
            <ul className="detail-list">
              {school.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <section className="experience">
        <h2>Professional Experience</h2>
        <ul className="grid grid-2 experience-list">
          {professionalExperience.map((job) => (
            <li key={job.role} className="card experience-item">
              <h3>{job.role}</h3>
              <p className="muted">{job.organization}</p>
              <span className="date-badge">{job.dates}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
