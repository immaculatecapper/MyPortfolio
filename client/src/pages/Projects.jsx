import { useState } from 'react';
import { projectApi } from '../api/api.js';
import { useAuth } from '../auth/AuthContext.jsx';
import useRecords from '../hooks/useRecords.js';
import RecordForm from '../components/RecordForm.jsx';
import AdminActions from '../components/AdminActions.jsx';
import { featuredProjects } from '../data/projects.js';
import { projectFields, formatDate } from '../data/recordFields.js';

// Extra media (image, tags, repo link) for projects whose title matches one of my featured projects
const mediaByTitle = Object.fromEntries(featuredProjects.map((project) => [project.title.toLowerCase(), project]));

/**
 * Projects page - the list comes from MongoDB (GET /api/projects).
 * Everyone can view the projects; an admin also gets Add / Edit / Delete (CRUD).
 */
export default function Projects() {
  const { isAdmin } = useAuth();
  const { records: projects, isLoading, error, create, update, remove } = useRecords(projectApi);
  const [editing, setEditing] = useState(null); // null | { record } ; record undefined = new project

  const handleSave = async (values) => {
    if (editing.record) await update(editing.record._id, values);
    else await create(values);
    setEditing(null);
  };

  return (
    <>
      <header className="page-header with-action">
        <div>
          <span className="eyebrow">Projects</span>
          <h1>Selected Work</h1>
          <p className="muted">A mix of professional and personal projects across AI, QA automation, Python and shell scripting.</p>
        </div>
        {isAdmin && !editing && (
          <button type="button" className="btn btn-primary" onClick={() => setEditing({})}>+ Add Project</button>
        )}
      </header>

      {editing && (
        <RecordForm
          key={editing.record?._id || 'new'}
          title={editing.record ? 'Edit Project' : 'Add Project'}
          fields={projectFields}
          initialRecord={editing.record}
          submitLabel={editing.record ? 'Update Project' : 'Create Project'}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {error && <div className="alert-error" role="alert">{error}</div>}
      {isLoading && <p className="muted">Loading projects…</p>}
      {!isLoading && !error && projects.length === 0 && <p className="muted">No projects yet.</p>}

      <div className="grid grid-2">
        {projects.map((project) => {
          const media = mediaByTitle[project.title.toLowerCase()];
          return (
            <article key={project._id} className="card project-card">
              {media ? (
                <img src={media.image} alt={`Illustration for ${project.title}`} className="project-image" />
              ) : (
                <div className="project-placeholder" aria-hidden="true">{'</>'}</div>
              )}
              <div className="project-body">
                <span className="project-context">
                  {media?.context || formatDate(project.completion) || 'Project'}
                </span>
                <h2>{project.title}</h2>
                {project.description && <p>{project.description}</p>}
                <p className="muted small">
                  {project.firstname} {project.lastname} · {project.email}
                  {project.completion && ` · Completed ${formatDate(project.completion)}`}
                </p>
                {media && (
                  <ul className="tag-list">
                    {media.technologies.map((technology) => (
                      <li key={technology} className="tag">{technology}</li>
                    ))}
                  </ul>
                )}
                {media?.repositoryUrl && (
                  <a href={media.repositoryUrl} target="_blank" rel="noreferrer" className="repo-link">View on GitHub →</a>
                )}
                {isAdmin && (
                  <AdminActions
                    label={project.title}
                    onEdit={() => { setEditing({ record: project }); window.scrollTo(0, 0); }}
                    onDelete={() => remove(project._id).catch(() => {})}
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
