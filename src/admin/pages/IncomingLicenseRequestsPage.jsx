import { useMemo, useState } from 'react'

const requests = [
  { id: 'LIC-REQ-201', teacher: 'Asha Mshana', registration: 'REG-2026-1008', type: 'Professional Teacher License', submitted: '2026-08-19', status: 'Pending Review' },
  { id: 'LIC-REQ-218', teacher: 'John Mushi', registration: 'REG-2026-1051', type: 'Renewal License', submitted: '2026-08-17', status: 'Approved' },
  { id: 'LIC-REQ-227', teacher: 'Mary Kivuyo', registration: 'REG-2026-1070', type: 'Temporary License', submitted: '2026-08-14', status: 'Rejected' },
  { id: 'LIC-REQ-231', teacher: 'Salim Juma', registration: 'REG-2026-1112', type: 'Professional Teacher License', submitted: '2026-08-10', status: 'Pending Review' },
]

function IncomingLicenseRequestsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [dateFilter, setDateFilter] = useState('All Dates')
  const [selectedRequest, setSelectedRequest] = useState(null)

  const summaryCards = [
    { label: 'Total Requests', value: requests.length, tone: 'blue' },
    { label: 'Pending Review', value: requests.filter((item) => item.status === 'Pending Review').length, tone: 'amber' },
    { label: 'Approved', value: requests.filter((item) => item.status === 'Approved').length, tone: 'green' },
    { label: 'Rejected', value: requests.filter((item) => item.status === 'Rejected').length, tone: 'red' },
  ]

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      const matchesSearch = `${item.teacher} ${item.id}`.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter
      const matchesType = typeFilter === 'All Types' || item.type === typeFilter
      const matchesDate = dateFilter === 'All Dates' || item.submitted === dateFilter
      return matchesSearch && matchesStatus && matchesType && matchesDate
    })
  }, [dateFilter, search, statusFilter, typeFilter])

  const handleDecision = (decision) => {
    if (decision === 'Approve' || decision === 'Reject' || decision === 'Request Correction') {
      window.confirm(`${decision} this request?`)
    }
  }

  return (
    <div className="license-requests-page">
      <header className="license-header">
        <div>
          <p className="license-eyebrow">Review Queue</p>
          <h1>Incoming License Requests</h1>
        </div>
      </header>

      <p className="license-subtitle">Review and manage license requests received from teachers.</p>

      <section className="license-summary-grid" aria-label="Incoming requests summary cards">
        {summaryCards.map((card) => (
          <article key={card.label} className={`license-summary-card license-tone-${card.tone}`}>
            <span className="license-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="license-search-panel" aria-label="Incoming requests filters">
        <div className="license-control-row">
          <label className="license-field">
            <span>Search</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by teacher or application number"
            />
          </label>

          <label className="license-field">
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="All Statuses">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>

          <label className="license-field">
            <span>License Type</span>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="All Types">All Types</option>
              <option value="Professional Teacher License">Professional Teacher License</option>
              <option value="Renewal License">Renewal License</option>
              <option value="Temporary License">Temporary License</option>
            </select>
          </label>

          <label className="license-field">
            <span>Date</span>
            <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
              <option value="All Dates">All Dates</option>
              <option value="2026-08-10">2026-08-10</option>
              <option value="2026-08-14">2026-08-14</option>
              <option value="2026-08-17">2026-08-17</option>
              <option value="2026-08-19">2026-08-19</option>
            </select>
          </label>
        </div>
      </section>

      <section className="license-table-panel" aria-label="Incoming license requests table">
        <div className="license-table-header">
          <h2>Requests</h2>
          <span>{filteredRequests.length} records</span>
        </div>

        <div className="license-table-wrap">
          <table className="license-table">
            <thead>
              <tr>
                <th>Request/Application Number</th>
                <th>Teacher Name</th>
                <th>Registration Number</th>
                <th>License Type</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.teacher}</td>
                  <td>{request.registration}</td>
                  <td>{request.type}</td>
                  <td>{request.submitted}</td>
                  <td>
                    <span className={`license-status-badge status-${request.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div className="license-action-stack">
                      <button type="button" className="btn btn-secondary license-mini-btn" onClick={() => setSelectedRequest(request)}>View</button>
                      <button type="button" className="btn btn-primary license-mini-btn" onClick={() => setSelectedRequest(request)}>Review</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedRequest && (
        <div className="license-modal-backdrop" onClick={() => setSelectedRequest(null)}>
          <div className="license-modal large" role="dialog" aria-modal="true" aria-labelledby="request-review-title" onClick={(event) => event.stopPropagation()}>
            <div className="license-modal-header">
              <div>
                <p className="license-eyebrow">Request Review</p>
                <h2 id="request-review-title">{selectedRequest.id}</h2>
              </div>
              <button type="button" className="license-close-btn" aria-label="Close review" onClick={() => setSelectedRequest(null)}>
                ×
              </button>
            </div>

            <div className="license-detail-list">
              <div><strong>Teacher Name:</strong> {selectedRequest.teacher}</div>
              <div><strong>Registration Number:</strong> {selectedRequest.registration}</div>
              <div><strong>License Type:</strong> {selectedRequest.type}</div>
              <div><strong>Submission Date:</strong> {selectedRequest.submitted}</div>
              <div><strong>Status:</strong> {selectedRequest.status}</div>
            </div>

            <div className="license-form-actions review-actions">
              <button type="button" className="btn btn-primary license-form-btn" onClick={() => handleDecision('Approve')}>Approve</button>
              <button type="button" className="btn btn-secondary license-form-btn" onClick={() => handleDecision('Reject')}>Reject</button>
              <button type="button" className="btn btn-secondary license-form-btn" onClick={() => handleDecision('Request Correction')}>Request Correction</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IncomingLicenseRequestsPage
