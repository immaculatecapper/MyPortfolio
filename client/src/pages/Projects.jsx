import { featuredProjects } from '../data/projects.js';

// Projects page: one card per highlighted project (image, role, outcome, tech)
export default function Projects() {
  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Projects</span>
        <h1>Selected Work</h1>
        <p className="muted">A mix of professional and personal projects across AI, QA automation, Python and shell scripting.</p>
      </header>

      <div className="grid grid-2">
        {featuredProjects.map((project) => (
          <article key={project.title} className="card project-card">
            <img src={project.image} alt={`Illustration for ${project.title}`} className="project-image" />
            <div className="project-body">
              <span className="project-context">{project.context}</span>
              <h2>{project.title}</h2>
              <p><strong>My role:</strong> {project.role}</p>
              <p><strong>Outcome:</strong> {project.outcome}</p>
              <ul className="tag-list">
                {project.technologies.map((technology) => (
                  <li key={technology} className="tag">{technology}</li>
                ))}
              </ul>
              {/* Only personal projects have a public repository to link to */}
              {project.repositoryUrl && (
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="repo-link">
                  View on GitHub →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
