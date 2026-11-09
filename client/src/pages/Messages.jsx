import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contactApi } from '../api/api.js';
import { useAuth } from '../auth/AuthContext.jsx';
import useRecords from '../hooks/useRecords.js';
import RecordForm from '../components/RecordForm.jsx';
import AdminActions from '../components/AdminActions.jsx';
import { contactFields, formatDate } from '../data/recordFields.js';

/**
 * Messages page (signed-in users only) - contact form entries from MongoDB.
 *  - Admin: sees every message and can Add / Edit / Delete them (CRUD)
 *  - User:  read-only view of the messages they sent (matched by email)
 */
export default function Messages() {
  const { isAdmin } = useAuth();
  const { records: contacts, isLoading, error, create, update, remove } = useRecords(contactApi, { requireToken: true });
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
          <span className="eyebrow">{isAdmin ? 'Admin' : 'My account'}</span>
          <h1>{isAdmin ? 'Contact Messages' : 'My Messages'}</h1>
          <p className="muted">
            {isAdmin
              ? 'Every message sent through the contact form.'
              : 'Messages you have sent through the contact form (read-only).'}
          </p>
        </div>
        {isAdmin && !editing && (
          <button type="button" className="btn btn-primary" onClick={() => setEditing({})}>+ Add Contact</button>
        )}
      </header>

      {editing && (
        <RecordForm
          key={editing.record?._id || 'new'}
          title={editing.record ? 'Edit Contact' : 'Add Contact'}
          fields={contactFields}
          initialRecord={editing.record}
          submitLabel={editing.record ? 'Update Contact' : 'Create Contact'}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {error && <div className="alert-error" role="alert">{error}</div>}
      {isLoading && <p className="muted">Loading messages…</p>}
      {!isLoading && !error && contacts.length === 0 && (
        <p className="muted">No messages yet. <Link to="/contact">Send one</Link>.</p>
      )}

      <div className="grid grid-2">
        {contacts.map((contact) => (
          <article key={contact._id} className="card message-card">
            <div className="timeline-head">
              <div>
                <h3>{contact.firstname} {contact.lastname}</h3>
                <p className="muted small">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  {contact.contactNumber && ` · ${contact.contactNumber}`}
                </p>
              </div>
              {contact.created && (
                <span className="date-badge">{formatDate(contact.created, { dateStyle: 'medium' })}</span>
              )}
            </div>
            {contact.message && <p className="message-text">{contact.message}</p>}
            {isAdmin && (
              <AdminActions
                label={`${contact.firstname} ${contact.lastname}`}
                onEdit={() => { setEditing({ record: contact }); window.scrollTo(0, 0); }}
                onDelete={() => remove(contact._id).catch(() => {})}
              />
            )}
          </article>
        ))}
      </div>
    </>
  );
}
