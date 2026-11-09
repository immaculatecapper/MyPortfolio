import { useState } from 'react';
import { qualificationApi } from '../api/api.js';
import { useAuth } from '../auth/AuthContext.jsx';
import useRecords from '../hooks/useRecords.js';
import RecordForm from '../components/RecordForm.jsx';
import AdminActions from '../components/AdminActions.jsx';
import { professionalExperience } from '../data/education.js';
import { qualificationFields, formatDate } from '../data/recordFields.js';

/**
 * Education page - qualifications come from MongoDB (GET /api/qualifications).
 * Everyone can view them; an admin can Add / Edit / Delete (CRUD).
 */
export default function Education() {
  const { isAdmin } = useAuth();
  const { records: qualifications, isLoading, error, create, update, remove } = useRecords(qualificationApi);
  const [editing, setEditing] = useState(null);

  const handleSave = async (values) => {
    if (editing.record) await update(editing.record._id, values);
    else await create(values);
    setEditing(null);
  };

  return (
    <>
      <header className="page-header with-action">
        <div>
          <span className="eyebrow">Education</span>
          <h1>Qualifications</h1>
          <p className="muted">Formal education and the professional experience that complements it.</p>
        </div>
        {isAdmin && !editing && (
          <button type="button" className="btn btn-primary" onClick={() => setEditing({})}>+ Add Qualification</button>
        )}
      </header>

      {editing && (
        <RecordForm
          key={editing.record?._id || 'new'}
          title={editing.record ? 'Edit Qualification' : 'Add Qualification'}
          fields={qualificationFields}
          initialRecord={editing.record}
          submitLabel={editing.record ? 'Update Qualification' : 'Create Qualification'}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {error && <div className="alert-error" role="alert">{error}</div>}
      {isLoading && <p className="muted">Loading qualifications…</p>}
      {!isLoading && !error && qualifications.length === 0 && <p className="muted">No qualifications yet.</p>}

      <ol className="timeline">
        {qualifications.map((qualification) => (
          <li key={qualification._id} className="card timeline-item">
            <div className="timeline-head">
              <div>
                <h2>{qualification.title}</h2>
                <p className="muted">{qualification.firstname} {qualification.lastname} · {qualification.email}</p>
              </div>
              {qualification.completion && (
                <span className="date-badge">{formatDate(qualification.completion)}</span>
              )}
            </div>
            {qualification.description && <p className="detail-text">{qualification.description}</p>}
            {isAdmin && (
              <AdminActions
                label={qualification.title}
                onEdit={() => { setEditing({ record: qualification }); window.scrollTo(0, 0); }}
                onDelete={() => remove(qualification._id).catch(() => {})}
              />
            )}
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
