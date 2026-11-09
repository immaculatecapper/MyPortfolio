// Edit / Delete buttons shown on a record card - only rendered for admins
export default function AdminActions({ label, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Delete "${label}"? This cannot be undone.`)) onDelete();
  };
  return (
    <div className="record-actions">
      <button type="button" className="btn btn-outline btn-sm" onClick={onEdit}>Edit</button>
      <button type="button" className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
    </div>
  );
}
