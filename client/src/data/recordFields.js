// Form field definitions for each object stored in MongoDB.
// They match the Mongoose models in server/models.
const ownerFields = [
  { name: 'firstname', label: 'First Name', required: true },
  { name: 'lastname', label: 'Last Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
];

export const projectFields = [
  { name: 'title', label: 'Project Title', required: true, wide: true },
  ...ownerFields,
  { name: 'completion', label: 'Completion Date', type: 'date' },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export const qualificationFields = [
  { name: 'title', label: 'Qualification / Credential', required: true, wide: true },
  ...ownerFields,
  { name: 'completion', label: 'Completion Date', type: 'date' },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export const contactFields = [
  ...ownerFields,
  { name: 'contactNumber', label: 'Contact Number', type: 'tel' },
  { name: 'message', label: 'Message', type: 'textarea' },
];

// Formats a date from the API for display, e.g. "Sep 2026"
export function formatDate(value, options = { month: 'short', year: 'numeric' }) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-CA', { timeZone: 'UTC', ...options });
}
