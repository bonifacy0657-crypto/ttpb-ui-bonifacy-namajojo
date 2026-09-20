import { useMemo, useState } from 'react'

const baseApplications = [
  { id: 'TTPB-LA-2026-104', type: 'Professional Teacher License', date: '2026-08-12', status: 'Pending', paymentStatus: 'Paid', paymentNote: 'Receipt #RCP-4410' },
  { id: 'TTPB-LA-2026-112', type: 'Temporary License', date: '2026-08-18', status: 'Under Review', paymentStatus: 'Pending', paymentNote: 'Awaiting payment confirmation' },
  { id: 'TTPB-LA-2026-120', type: 'Renewal License', date: '2026-08-22', status: 'Approved', paymentStatus: 'Paid', paymentNote: 'Approved and processed' },
  { id: 'TTPB-LA-2026-126', type: 'Professional Teacher License', date: '2026-08-25', status: 'Rejected', paymentStatus: 'Refunded', paymentNote: 'Documents incomplete' },
]

const emptyForm = {
  licenseType: 'Professional Teacher License',
  registrationNumber: '',
  applicationType: 'New Application',
  applicationDate: '',
  supportingDocuments: '',
  declaration: false,
}

function MyLicenseApplicationsPage() {
  const [applications, setApplications] = useState(baseApplications)
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  const summaryCards = [
    { label: 'Total Applications', value: applications.length, tone: 'blue' },
    { label: 'Pending', value: applications.filter((item) => item.status === 'Pending').length, tone: 'amber' },
    { label: 'Approved', value: applications.filter((item) => item.status === 'Approved').length, tone: 'green' },
    { label: 'Rejected', value: applications.filter((item) => item.status === 'Rejected').length, tone: 'red' },
  ]

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const query = search.toLowerCase()
      return `${application.id} ${application.type}`.toLowerCase().includes(query)
    })
  }, [applications, search])

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newApplication = {
      id: `TTPB-LA-${new Date().getFullYear()}-${String(applications.length + 101).padStart(3, '0')}`,
      type: formData.licenseType,
      date: formData.applicationDate || new Date().toISOString().slice(0, 10),
      status: 'Pending',
      paymentStatus: 'Pending',
      paymentNote: 'Awaiting payment confirmation',
    }

    setApplications((current) => [newApplication, ...current])
    setFormData(emptyForm)
    setIsFormOpen(false)
  }

  return (
    <div className="license-applications-page">
      <header className="license-header">
        <div>
          <p className="license-eyebrow">My Records</p>
          <h1>My License Applications</h1>
        </div>
      </header>

      <p className="license-subtitle">View and track your professional license applications.</p>

      <div className="license-top-actions">
        <button type="button" className="btn btn-primary license-action-btn" onClick={() => setIsFormOpen(true)}>
          <span aria-hidden="true">＋</span>
          New License Application
        </button>
      </div>

      <section className="license-summary-grid" aria-label="License application summary cards">
        {summaryCards.map((card) => (
          <article key={card.label} className={`license-summary-card license-tone-${card.tone}`}>
            <span className="license-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="license-search-panel" aria-label="License application search and filters">
        <div className="license-control-row">
          <label className="license-field license-search-field">
            <span>Search</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by application number"
            />
          </label>
        </div>
      </section>

      <section className="license-table-panel" aria-label="License applications list">
        <div className="license-table-header">
          <h2>Applications</h2>
          <span>{filteredApplications.length} records</span>
        </div>

        <div className="license-table-wrap">
          <table className="license-table">
            <thead>
              <tr>
                <th>Application Number</th>
                <th>License Type</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.type}</td>
                  <td>{application.date}</td>
                  <td>
                    <span className={`license-status-badge status-${application.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {application.status}
                    </span>
                  </td>
                  <td>{application.paymentStatus}</td>
                  <td>
                    <button type="button" className="btn btn-secondary license-mini-btn" onClick={() => setSelectedApplication(application)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isFormOpen && (
        <div className="license-modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="license-modal" role="dialog" aria-modal="true" aria-labelledby="license-application-title" onClick={(event) => event.stopPropagation()}>
            <div className="license-modal-header">
              <div>
                <p className="license-eyebrow">New Request</p>
                <h2 id="license-application-title">New License Application</h2>
              </div>
              <button type="button" className="license-close-btn" aria-label="Close form" onClick={() => setIsFormOpen(false)}>
                ×
              </button>
            </div>

            <form className="license-form" onSubmit={handleSubmit}>
              <div className="license-form-grid">
                <label className="license-field">
                  <span>License Type</span>
                  <select name="licenseType" value={formData.licenseType} onChange={handleFieldChange}>
                    <option value="Professional Teacher License">Professional Teacher License</option>
                    <option value="Temporary License">Temporary License</option>
                    <option value="Renewal License">Renewal License</option>
                  </select>
                </label>

                <label className="license-field">
                  <span>Registration Number</span>
                  <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleFieldChange} required />
                </label>

                <label className="license-field">
                  <span>Application Type</span>
                  <select name="applicationType" value={formData.applicationType} onChange={handleFieldChange}>
                    <option value="New Application">New Application</option>
                    <option value="Renewal">Renewal</option>
                    <option value="Upgrade">Upgrade</option>
                  </select>
                </label>

                <label className="license-field">
                  <span>Date of Application</span>
                  <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleFieldChange} required />
                </label>

                <label className="license-field license-field-full">
                  <span>Supporting Documents</span>
                  <textarea name="supportingDocuments" value={formData.supportingDocuments} onChange={handleFieldChange} placeholder="List supporting documents and attachments" rows="4" />
                </label>

                <label className="license-field license-field-full checkbox-field">
                  <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleFieldChange} />
                  <span>I confirm that the information provided is true and the supporting documents are valid.</span>
                </label>
              </div>

              <div className="license-form-actions">
                <button type="submit" className="btn btn-primary license-form-btn" disabled={!formData.declaration}>
                  Submit Application
                </button>
                <button type="button" className="btn btn-secondary license-form-btn" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedApplication && (
        <div className="license-modal-backdrop" onClick={() => setSelectedApplication(null)}>
          <div className="license-modal" role="dialog" aria-modal="true" aria-labelledby="application-detail-title" onClick={(event) => event.stopPropagation()}>
            <div className="license-modal-header">
              <div>
                <p className="license-eyebrow">Application</p>
                <h2 id="application-detail-title">{selectedApplication.id}</h2>
              </div>
              <button type="button" className="license-close-btn" aria-label="Close details" onClick={() => setSelectedApplication(null)}>
                ×
              </button>
            </div>

            <div className="license-detail-list">
              <div><strong>License Type:</strong> {selectedApplication.type}</div>
              <div><strong>Application Date:</strong> {selectedApplication.date}</div>
              <div><strong>Status:</strong> {selectedApplication.status}</div>
              <div><strong>Payment Status:</strong> {selectedApplication.paymentStatus}</div>
              <div><strong>Notes:</strong> {selectedApplication.paymentNote}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyLicenseApplicationsPage
