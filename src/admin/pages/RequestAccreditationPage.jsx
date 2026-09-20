import { useMemo, useState } from 'react'

const sampleRequests = [
  { id: 'CPD-ACC-1021', organization: 'Mwenge Teacher Development Centre', date: '2026-08-12', type: 'Institutional Provider', status: 'Submitted' },
  { id: 'CPD-ACC-1048', organization: 'Amani Learning Institute', date: '2026-08-18', type: 'Training Partner', status: 'Under Review' },
  { id: 'CPD-ACC-1102', organization: 'Bright Path Academy', date: '2026-08-20', type: 'Institutional Provider', status: 'Requires Changes' },
  { id: 'CPD-ACC-1130', organization: 'Nuru Education Hub', date: '2026-08-25', type: 'Private Training Provider', status: 'Approved' },
]

const emptyForm = {
  organizationName: '',
  organizationType: 'Institutional Provider',
  registrationNumber: '',
  physicalAddress: '',
  region: 'Dar es Salaam',
  district: '',
  contactPerson: '',
  phoneNumber: '',
  emailAddress: '',
  website: '',
  typeOfTraining: 'Pedagogy and Assessment',
  targetTeacherLevel: 'Primary School Teachers',
  trainingAreas: '',
  description: '',
  trainerInfo: '',
  expectedTeachers: '',
  trainingDuration: '3 Days',
  deliveryMode: 'Physical',
  declaration: false,
}

function RequestAccreditationPage() {
  const [requests, setRequests] = useState(sampleRequests)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState(emptyForm)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => `${item.id} ${item.organization}`.toLowerCase().includes(search.toLowerCase()))
  }, [requests, search])

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newRequest = {
      id: `CPD-ACC-${String(Date.now()).slice(-4)}`,
      organization: formData.organizationName || 'New Provider',
      date: new Date().toISOString().slice(0, 10),
      type: formData.organizationType,
      status: 'Draft',
    }

    setRequests((current) => [newRequest, ...current])
    setFormData(emptyForm)
    setIsFormOpen(false)
  }

  return (
    <div className="cpd-module-page">
      <header className="cpd-header">
        <div>
          <p className="cpd-eyebrow">Provider Access</p>
          <h1>Request Accreditation</h1>
        </div>
      </header>

      <p className="cpd-subtitle">Apply to become an accredited CPD provider.</p>

      <div className="cpd-top-actions">
        <button type="button" className="btn btn-primary cpd-action-btn" onClick={() => setIsFormOpen(true)}>
          <span aria-hidden="true">＋</span>
          New Request
        </button>
      </div>

      <section className="cpd-hero-card" aria-label="Accreditation information card">
        <h2>Become a CPD Provider</h2>
        <p>
          Submit your application to become an accredited CPD provider. Accredited providers can offer professional development training to teachers at various levels.
        </p>
      </section>

      <section className="cpd-section-panel" aria-label="My accreditation requests">
        <div className="cpd-section-header">
          <h2>My Accreditation Requests</h2>
        </div>

        <div className="cpd-search-panel">
          <label className="cpd-field">
            <span>Search</span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by organization or request ID" />
          </label>
        </div>

        <div className="cpd-table-wrap">
          <table className="cpd-table">
            <thead>
              <tr>
                <th>Application/Request ID</th>
                <th>Organization Name</th>
                <th>Date Submitted</th>
                <th>Application Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.organization}</td>
                  <td>{item.date}</td>
                  <td>{item.type}</td>
                  <td><span className={`cpd-badge status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span></td>
                  <td>
                    <div className="cpd-button-stack">
                      <button type="button" className="btn btn-secondary cpd-mini-btn" onClick={() => setSelectedRequest(item)}>View</button>
                      <button type="button" className="btn btn-secondary cpd-mini-btn">Edit</button>
                      <button type="button" className="btn btn-primary cpd-mini-btn" onClick={() => setSelectedRequest(item)}>View Status</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isFormOpen && (
        <div className="cpd-modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="cpd-modal" role="dialog" aria-modal="true" aria-labelledby="new-request-title" onClick={(event) => event.stopPropagation()}>
            <div className="cpd-modal-header">
              <div>
                <p className="cpd-eyebrow">Accreditation Form</p>
                <h2 id="new-request-title">New Request</h2>
              </div>
              <button type="button" className="cpd-close-btn" aria-label="Close request form" onClick={() => setIsFormOpen(false)}>×</button>
            </div>

            <form className="cpd-form" onSubmit={handleSubmit}>
              <div className="cpd-form-grid">
                <label className="cpd-field">
                  <span>Organization/Institution Name</span>
                  <input type="text" name="organizationName" value={formData.organizationName} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Organization Type</span>
                  <select name="organizationType" value={formData.organizationType} onChange={handleFieldChange}>
                    <option value="Institutional Provider">Institutional Provider</option>
                    <option value="Private Training Provider">Private Training Provider</option>
                    <option value="University/College">University/College</option>
                    <option value="NGO/CSO">NGO/CSO</option>
                  </select>
                </label>

                <label className="cpd-field">
                  <span>Registration Number</span>
                  <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Physical Address</span>
                  <input type="text" name="physicalAddress" value={formData.physicalAddress} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Region</span>
                  <select name="region" value={formData.region} onChange={handleFieldChange}>
                    <option value="Dar es Salaam">Dar es Salaam</option>
                    <option value="Arusha">Arusha</option>
                    <option value="Dodoma">Dodoma</option>
                    <option value="Kilimanjaro">Kilimanjaro</option>
                  </select>
                </label>

                <label className="cpd-field">
                  <span>District</span>
                  <input type="text" name="district" value={formData.district} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Contact Person</span>
                  <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Phone Number</span>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Email Address</span>
                  <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Website (optional)</span>
                  <input type="url" name="website" value={formData.website} onChange={handleFieldChange} />
                </label>

                <label className="cpd-field">
                  <span>Type of CPD Training Offered</span>
                  <input type="text" name="typeOfTraining" value={formData.typeOfTraining} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Target Teacher Level</span>
                  <select name="targetTeacherLevel" value={formData.targetTeacherLevel} onChange={handleFieldChange}>
                    <option value="Primary School Teachers">Primary School Teachers</option>
                    <option value="Secondary School Teachers">Secondary School Teachers</option>
                    <option value="College Tutors">College Tutors</option>
                    <option value="All Teacher Levels">All Teacher Levels</option>
                  </select>
                </label>

                <label className="cpd-field">
                  <span>Training Areas / Subjects</span>
                  <input type="text" name="trainingAreas" value={formData.trainingAreas} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Expected Number of Teachers</span>
                  <input type="number" name="expectedTeachers" value={formData.expectedTeachers} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Training Duration</span>
                  <input type="text" name="trainingDuration" value={formData.trainingDuration} onChange={handleFieldChange} required />
                </label>

                <label className="cpd-field">
                  <span>Delivery Mode</span>
                  <select name="deliveryMode" value={formData.deliveryMode} onChange={handleFieldChange}>
                    <option value="Physical">Physical</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </label>

                <label className="cpd-field cpd-field-full">
                  <span>Description of Training Programs</span>
                  <textarea name="description" value={formData.description} onChange={handleFieldChange} rows="4" required />
                </label>

                <label className="cpd-field cpd-field-full">
                  <span>Trainer/Facilitator Information</span>
                  <textarea name="trainerInfo" value={formData.trainerInfo} onChange={handleFieldChange} rows="4" required />
                </label>

                <label className="cpd-field cpd-field-full">
                  <span>Supporting Documents upload</span>
                  <input type="file" name="supportingDocuments" multiple />
                </label>

                <label className="cpd-field cpd-field-full cpd-checkbox-field">
                  <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleFieldChange} />
                  <span>I confirm that the information provided is accurate and complete.</span>
                </label>
              </div>

              <div className="cpd-form-actions">
                <button type="submit" className="btn btn-primary cpd-form-btn" disabled={!formData.declaration}>
                  Submit Application
                </button>
                <button type="button" className="btn btn-secondary cpd-form-btn" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedRequest && (
        <div className="cpd-modal-backdrop" onClick={() => setSelectedRequest(null)}>
          <div className="cpd-modal" role="dialog" aria-modal="true" aria-labelledby="request-status-title" onClick={(event) => event.stopPropagation()}>
            <div className="cpd-modal-header">
              <div>
                <p className="cpd-eyebrow">Status</p>
                <h2 id="request-status-title">{selectedRequest.id}</h2>
              </div>
              <button type="button" className="cpd-close-btn" aria-label="Close status" onClick={() => setSelectedRequest(null)}>×</button>
            </div>

            <div className="cpd-detail-list">
              <div><strong>Organization:</strong> {selectedRequest.organization}</div>
              <div><strong>Date Submitted:</strong> {selectedRequest.date}</div>
              <div><strong>Application Type:</strong> {selectedRequest.type}</div>
              <div><strong>Status:</strong> {selectedRequest.status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RequestAccreditationPage
