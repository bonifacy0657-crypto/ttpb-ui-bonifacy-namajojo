import { useMemo, useState } from 'react'

const assignments = [
  { id: 'ASSIGN-104', teacher: 'Faith Ndagala', registration: 'REG-2026-1188', type: 'Professional Teacher License', assigned: '2026-08-20', status: 'In Progress' },
  { id: 'ASSIGN-112', teacher: 'Joseph Mwangosi', registration: 'REG-2026-1212', type: 'Renewal License', assigned: '2026-08-18', status: 'Completed' },
  { id: 'ASSIGN-126', teacher: 'Boniface Namajojo', registration: 'REG-2026-1236', type: 'Temporary License', assigned: '2026-08-14', status: 'Pending Action' },
  { id: 'ASSIGN-134', teacher: 'Grace Mwakalebela', registration: 'REG-2026-1274', type: 'Professional Teacher License', assigned: '2026-08-12', status: 'In Progress' },
]

function AssignedLicenseRequestsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [assignmentDateFilter, setAssignmentDateFilter] = useState('All Dates')
  const [selectedRequest, setSelectedRequest] = useState(null)

  const summaryCards = [
    { label: 'Assigned Requests', value: assignments.length, tone: 'blue' },
    { label: 'In Progress', value: assignments.filter((item) => item.status === 'In Progress').length, tone: 'amber' },
    { label: 'Completed', value: assignments.filter((item) => item.status === 'Completed').length, tone: 'green' },
    { label: 'Pending Action', value: assignments.filter((item) => item.status === 'Pending Action').length, tone: 'red' },
  ]

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesSearch = `${item.teacher} ${item.id}`.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter
      const matchesType = typeFilter === 'All Types' || item.type === typeFilter
      const matchesDate = assignmentDateFilter === 'All Dates' || item.assigned === assignmentDateFilter
      return matchesSearch && matchesStatus && matchesType && matchesDate
    })
  }, [assignmentDateFilter, search, statusFilter, typeFilter])

  const handleDecision = (decision) => {
    if (decision === 'Approve' || decision === 'Reject' || decision === 'Request Correction' || decision === 'Add Review Comment') {
      window.confirm(`${decision} this request?`)
    }
  }

  return (
    <div className="license-assigned-page">
      <header className="license-header">
        <div>
          <p className="license-eyebrow">Assigned to Me</p>
          <h1>Assigned License Requests</h1>
        </div>
      </header>

      <p className="license-subtitle">Manage license requests assigned to you for processing.</p>

      <section className="license-summary-grid" aria-label="Assigned requests summary cards">
        {summaryCards.map((card) => (
          <article key={card.label} className={`license-summary-card license-tone-${card.tone}`}>
            <span className="license-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="license-search-panel" aria-label="Assigned requests filters">
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
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending Action">Pending Action</option>
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
            <span>Assignment Date</span>
            <select value={assignmentDateFilter} onChange={(event) => setAssignmentDateFilter(event.target.value)}>
              <option value="All Dates">All Dates</option>
              <option value="2026-08-12">2026-08-12</option>
              <option value="2026-08-14">2026-08-14</option>
              <option value="2026-08-18">2026-08-18</option>
              <option value="2026-08-20">2026-08-20</option>
            </select>
          </label>
        </div>
      </section>

      <section className="license-table-panel" aria-label="Assigned requests table">
        <div className="license-table-header">
          <h2>Assignments</h2>
          <span>{filteredAssignments.length} records</span>
        </div>

        <div className="license-table-wrap">
          <table className="license-table">
            <thead>
              <tr>
                <th>Request Number</th>
                <th>Teacher Name</th>
                <th>Registration Number</th>
                <th>License Type</th>
                <th>Assigned Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.id}</td>
                  <td>{assignment.teacher}</td>
                  <td>{assignment.registration}</td>
                  <td>{assignment.type}</td>
                  <td>{assignment.assigned}</td>
                  <td>
                    <span className={`license-status-badge status-${assignment.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td>
                    <div className="license-action-stack">
                      <button type="button" className="btn btn-secondary license-mini-btn" onClick={() => setSelectedRequest(assignment)}>View Details</button>
                      <button type="button" className="btn btn-primary license-mini-btn" onClick={() => setSelectedRequest(assignment)}>Process Request</button>
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
          <div className="license-modal large" role="dialog" aria-modal="true" aria-labelledby="assigned-request-title" onClick={(event) => event.stopPropagation()}>
            <div className="license-modal-header">
              <div>
                <p className="license-eyebrow">Processing</p>
                <h2 id="assigned-request-title">{selectedRequest.id}</h2>
              </div>
              <button type="button" className="license-close-btn" aria-label="Close processing form" onClick={() => setSelectedRequest(null)}>
                ×
              </button>
            </div>

            <div className="license-detail-list">
              <div><strong>Teacher Name:</strong> {selectedRequest.teacher}</div>
              <div><strong>Registration Number:</strong> {selectedRequest.registration}</div>
              <div><strong>License Type:</strong> {selectedRequest.type}</div>
              <div><strong>Assigned Date:</strong> {selectedRequest.assigned}</div>
              <div><strong>Status:</strong> {selectedRequest.status}</div>
            </div>

            <div className="license-form-actions review-actions">
              <button type="button" className="btn btn-primary license-form-btn" onClick={() => handleDecision('Approve')}>Approve</button>
              <button type="button" className="btn btn-secondary license-form-btn" onClick={() => handleDecision('Reject')}>Reject</button>
              <button type="button" className="btn btn-secondary license-form-btn" onClick={() => handleDecision('Request Correction')}>Request Correction</button>
              <button type="button" className="btn btn-secondary license-form-btn" onClick={() => handleDecision('Add Review Comment')}>Add Review Comment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssignedLicenseRequestsPage
