import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';
import headshotImage from '../assets/mark-perez-headshot.jpg';

// About Me page: legal name, headshot, short bio and a link to the PDF resume
export default function About() {
  return (
    <section className="about">
      <div className="about-photo">
        <img src={headshotImage} alt={`Headshot of ${profile.legalName}`} width="640" height="800" />
      </div>

      <div className="about-text">
        <span className="eyebrow">About Me</span>
        <h1>{profile.legalName}</h1>
        <p className="about-title">{profile.title}</p>

        {/* Each bio paragraph is stored in profile.js to keep this component tidy */}
        {profile.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}

        <ul className="tag-list" aria-label="Key skills">
          {profile.skills.map((skill) => (
            <li key={skill} className="tag">{skill}</li>
          ))}
        </ul>

        <div className="button-row about-actions">
          <a href={profile.resumePdfPath} target="_blank" rel="noreferrer" className="btn btn-primary">
            View Resume (PDF)
          </a>
          <Link to="/contact" className="btn btn-outline">Contact Me</Link>
        </div>
      </div>
    </section>
  );
}
