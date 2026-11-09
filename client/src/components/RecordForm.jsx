import { useState } from 'react';

// Turns a record from the API into form values (dates -> "YYYY-MM-DD" for <input type="date">)
function toFormValues(fields, record) {
  return Object.fromEntries(
    fields.map(({ name, type }) => {
      const value = record?.[name] ?? '';
      return [name, type === 'date' && value ? String(value).slice(0, 10) : value];
    })
  );
}

/**
 * Reusable controlled form used to create or edit a record (Project, Qualification, Contact).
 * `fields` describes the inputs: [{ name, label, type, required, wide }]
 * The form keeps every input value in React state and calls onSubmit(values).
 */
export default function RecordForm({ title, fields, initialRecord, submitLabel = 'Save', onSubmit, onCancel }) {
  const [values, setValues] = useState(() => toFormValues(fields, initialRecord));
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      // Empty optional fields are sent as null so they are cleared in the database
      const payload = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value === '' ? null : value]));
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  return (
    <form className="card form record-form" onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {error && <div className="alert-error" role="alert">{error}</div>}
      <div className="form-grid">
        {fields.map(({ name, label, type = 'text', required, wide }) => (
          <label key={name} className={wide || type === 'textarea' ? 'wide' : ''}>
            {label}{required && ' *'}
            {type === 'textarea' ? (
              <textarea name={name} rows="4" value={values[name]} onChange={handleChange} required={required} />
            ) : (
              <input type={type} name={name} value={values[name]} onChange={handleChange} required={required} />
            )}
          </label>
        ))}
      </div>
      <div className="button-row">
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving…' : submitLabel}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
