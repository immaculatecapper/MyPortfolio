import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profile } from '../data/profile.js';

// Starting (empty) values for every field in the contact form
const emptyFormValues = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  message: '',
};

/**
 * Contact page: contact-information panel + a controlled contact form.
 * On submit the contact is saved to MongoDB via POST /api/contacts and the
 * user is redirected to the Home page,
 * which shows a thank-you message using the captured data.
 */
export default function Contact() {
  const [formValues, setFormValues] = useState(emptyFormValues);
  const navigate = useNavigate();

  // Update the matching field in state whenever an input changes
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previousValues) => ({ ...previousValues, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // stop the browser's full-page form submission
    console.log('Contact form submitted:', formValues);
    // Save the contact to MongoDB through the backend REST API (POST /api/contacts)
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formValues.firstName,
          lastname: formValues.lastName,
          email: formValues.email,
        }),
      });
      console.log('API response:', await response.json());
    } catch (error) {
      console.error('Could not reach the backend:', error);
    }
    // Pass the captured data to the Home page through router state
    navigate('/', { state: { submittedMessage: formValues } });
  };

  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Contact Me</span>
        <h1>Let&apos;s Work Together</h1>
        <p className="muted">Questions, opportunities or just want to say hi? Send me a message.</p>
      </header>

      <div className="contact-layout">
        <aside className="card contact-panel" aria-label="Contact information">
          <h2>Contact Information</h2>
          <dl className="contact-list">
            <dt>Email</dt>
            <dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd>
            <dt>Phone</dt>
            <dd><a href={`tel:${profile.phone.replace(/\D/g, '')}`}>{profile.phone}</a></dd>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
            <dt>LinkedIn</dt>
            <dd><a href={profile.linkedInUrl} target="_blank" rel="noreferrer">mark-perez</a></dd>
            <dt>GitHub</dt>
            <dd><a href={profile.gitHubUrl} target="_blank" rel="noreferrer">immaculatecapper</a></dd>
          </dl>
        </aside>

        <form className="card contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              First Name
              <input name="firstName" value={formValues.firstName} onChange={handleFieldChange} required autoComplete="given-name" />
            </label>
            <label>
              Last Name
              <input name="lastName" value={formValues.lastName} onChange={handleFieldChange} required autoComplete="family-name" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Contact Number
              <input type="tel" name="contactNumber" value={formValues.contactNumber} onChange={handleFieldChange} autoComplete="tel" />
            </label>
            <label>
              Email Address
              <input type="email" name="email" value={formValues.email} onChange={handleFieldChange} required autoComplete="email" />
            </label>
          </div>
          <label>
            Message
            <textarea name="message" rows="6" value={formValues.message} onChange={handleFieldChange} required />
          </label>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </>
  );
}
