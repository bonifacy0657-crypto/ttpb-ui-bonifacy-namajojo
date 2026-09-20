import { useMemo, useState } from 'react'

const applications = [
  { id: 'APP-2041', organization: 'Mwenge Teacher Development Centre', contact: 'Mariam Mtei', date: '2026-08-12', category: 'Pedagogy', status: 'Submitted', reviewer: 'Dr. K. Mwakalebela' },
  { id: 'APP-2087', organization: 'Amani Learning Institute', contact: 'Salum King', date: '2026-08-19', category: 'Leadership', status: 'Under Review', reviewer: 'Ms. A. Mbilinyi' },
  { id: 'APP-2124', organization: 'Bright Path Academy', contact: 'Hassan Ndege', date: '2026-08-22', category: 'Technology', status: 'Requires Changes', reviewer: 'Mr. J. Kivuyo' },
  { id: 'APP-2168', organization: 'Nuru Education Hub', contact: 'Asha Noor', date: '2026-08-26', category: 'Curriculum', status: 'Approved', reviewer: 'Dr. C. Mhando' },
]

function AccreditationApplicationsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [regionFilter, setRegionFilter] = useState('All Regions')
  const [dateFilter, setDateFilter] = useState('All Dates')
  const [selectedApplication, setSelectedApplication] = useState(null)

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch = `${application.id} ${application.organization}`.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All Statuses' || application.status === statusFilter
      const matchesType = typeFilter === 'All Types' || application.category === typeFilter
      const matchesRegion = regionFilter === 'All Regions' || regionFilter === 'Dar es Salaam'
      const matchesDate = dateFilter === 'All Dates' || application.date === dateFilter
      return matchesSearch && matchesStatus && matchesType && matchesRegion && matchesDate
    })
  }, [dateFilter, regionFilter, search, statusFilter, typeFilter])

  const summaryCards = [
    { label: 'Total Applications', value: applications.length, tone: 'blue' },
    { label: 'Pending Review', value: applications.filter((item) => item.status === 'Submitted' || item.status === 'Under Review').length, tone: 'amber' },
    { label: 'Approved', value: applications.filter((item) => item.status === 'Approved').length, tone: 'green' },
    { label: 'Rejected', value: applications.filter((item) => item.status === 'Rejected').length, tone: 'red' },
  ]

  const handleDecision = (decision) => {
    if (window.confirm(`${decision} this application?`)) {
      console.log(decision)
    }
  }

  return (
    <div className="cpd-module-page">
      <header className="cpd-header">
        <div>
          <p className="cpd-eyebrow">Review Center</p>
          <h1>Accreditation Applications</h1>
        </div>
      </header>

      <p className="cpd-subtitle">Review and track CPD provider accreditation applications.</p>

      <section className="cpd-summary-grid" aria-label="Accreditation application summary cards">
        {summaryCards.map((card) => (
          <article key={card.label} className={`cpd-summary-card cpd-tone-${card.tone}`}>
            <span className="cpd-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="cpd-search-panel" aria-label="Accreditation filters">
        <div className="cpd-control-row">
          <label className="cpd-field">
            <span>Search</span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search applications..." />
          </label>

          <label className="cpd-field">
            <span>Application Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="All Statuses">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Requires Changes">Requires Changes</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>

          <label className="cpd-field">
            <span>Organization Type</span>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="All Types">All Types</option>
              <option value="Pedagogy">Pedagogy</option>
              <option value="Leadership">Leadership</option>
              <option value="Technology">Technology</option>
              <option value="Curriculum">Curriculum</option>
            </select>
          </label>

          <label className="cpd-field">
            <span>Region</span>
            <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
              <option value="All Regions">All Regions</option>
              <option value="Dar es Salaam">Dar es Salaam</option>
              <option value="Dodoma">Dodoma</option>
            </select>
          </label>

          <label className="cpd-field">
            <span>Date Submitted</span>
            <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
              <option value="All Dates">All Dates</option>
              <option value="2026-08-12">2026-08-12</option>
              <option value="2026-08-19">2026-08-19</option>
              <option value="2026-08-22">2026-08-22</option>
              <option value="2026-08-26">2026-08-26</option>
            </select>
          </label>
        </div>
      </section>

      <section className="cpd-section-panel" aria-label="Application review table">
        <div className="cpd-section-header">
          <h2>Applications</h2>
          <span>{filteredApplications.length} records</span>
        </div>

        <div className="cpd-table-wrap">
          <table className="cpd-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Organization Name</th>
                <th>Contact Person</th>
                <th>Application Date</th>
                <th>Training Category</th>
                <th>Status</th>
                <th>Assigned Reviewer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.organization}</td>
                  <td>{application.contact}</td>
                  <td>{application.date}</td>
                  <td>{application.category}</td>
                  <td><span className={`cpd-badge status-${application.status.toLowerCase().replace(/\s+/g, '-')}`}>{application.status}</span></td>
                  <td>{application.reviewer}</td>
                  <td>
                    <div className="cpd-button-stack">
                      <button type="button" className="btn btn-secondary cpd-mini-btn" onClick={() => setSelectedApplication(application)}>View Application</button>
                      <button type="button" className="btn btn-secondary cpd-mini-btn">Review</button>
                      <button type="button" className="btn btn-primary cpd-mini-btn" onClick={() => handleDecision('Approve')}>Approve</button>
                      <button type="button" className="btn btn-secondary cpd-mini-btn" onClick={() => handleDecision('Reject')}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedApplication && (
        <div className="cpd-modal-backdrop" onClick={() => setSelectedApplication(null)}>
          <div className="cpd-modal large" role="dialog" aria-modal="true" aria-labelledby="application-review-title" onClick={(event) => event.stopPropagation()}>
            <div className="cpd-modal-header">
              <div>
                <p className="cpd-eyebrow">Application Review</p>
                <h2 id="application-review-title">{selectedApplication.id}</h2>
              </div>
              <button type="button" className="cpd-close-btn" aria-label="Close application review" onClick={() => setSelectedApplication(null)}>×</button>
            </div>

            <div className="cpd-detail-grid">
              <div><strong>Organization Name:</strong> {selectedApplication.organization}</div>
              <div><strong>Contact Person:</strong> {selectedApplication.contact}</div>
              <div><strong>Application Date:</strong> {selectedApplication.date}</div>
              <div><strong>Training Category:</strong> {selectedApplication.category}</div>
              <div><strong>Status:</strong> {selectedApplication.status}</div>
              <div><strong>Assigned Reviewer:</strong> {selectedApplication.reviewer}</div>
            </div>

            <div className="cpd-form-actions">
              <button type="button" className="btn btn-primary cpd-form-btn" onClick={() => handleDecision('Approve')}>Approve</button>
              <button type="button" className="btn btn-secondary cpd-form-btn" onClick={() => handleDecision('Reject')}>Reject</button>
              <button type="button" className="btn btn-secondary cpd-form-btn" onClick={() => handleDecision('Request Changes')}>Request Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccreditationApplicationsPage
