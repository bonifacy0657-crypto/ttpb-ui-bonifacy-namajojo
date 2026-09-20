const stats = [
  { label: 'Total Applications', value: 184, icon: '📄', trend: '+12.4%', trendType: 'up' },
  { label: 'Pending Applications', value: 42, icon: '⏳', trend: '+4.6%', trendType: 'up' },
  { label: 'Approved Applications', value: 96, icon: '✅', trend: '+8.2%', trendType: 'up' },
  { label: 'Rejected Applications', value: 18, icon: '❌', trend: '-1.9%', trendType: 'down' }
]

const applications = [
  {
    id: 'APP-2026-001',
    teacherName: 'Amina Hassan',
    registrationType: 'Full Registration',
    applicationDate: '2026-09-07',
    status: 'Under Review',
    officer: 'N. Robert',
    actions: ['View', 'Review']
  },
  {
    id: 'APP-2026-002',
    teacherName: 'Daniel Mwesiga',
    registrationType: 'Provisional Registration',
    applicationDate: '2026-09-04',
    status: 'Pending Payment',
    officer: 'J. Kivuyo',
    actions: ['View', 'Approve', 'Reject']
  },
  {
    id: 'APP-2026-003',
    teacherName: 'Grace Msimbe',
    registrationType: 'Temporary Registration',
    applicationDate: '2026-09-02',
    status: 'Payment Verified',
    officer: 'A. Makene',
    actions: ['View', 'Review', 'Approve']
  },
  {
    id: 'APP-2026-004',
    teacherName: 'Joseph Lema',
    registrationType: 'Full Registration',
    applicationDate: '2026-08-27',
    status: 'Approved',
    officer: 'S. Mlowe',
    actions: ['View']
  },
  {
    id: 'APP-2026-005',
    teacherName: 'Salma Ally',
    registrationType: 'Provisional Registration',
    applicationDate: '2026-08-22',
    status: 'Returned for Correction',
    officer: 'D. Mlay',
    actions: ['View', 'Review', 'Return']
  },
  {
    id: 'APP-2026-006',
    teacherName: 'Emmanuel Nyamwiza',
    registrationType: 'Temporary Registration',
    applicationDate: '2026-08-18',
    status: 'Rejected',
    officer: 'R. Komba',
    actions: ['View']
  },
  {
    id: 'APP-2026-007',
    teacherName: 'Ruth Kabogo',
    registrationType: 'Full Registration',
    applicationDate: '2026-08-12',
    status: 'Submitted',
    officer: 'M. Chacha',
    actions: ['View', 'Review']
  },
  {
    id: 'APP-2026-008',
    teacherName: 'Phillip Kweka',
    registrationType: 'Full Registration',
    applicationDate: '2026-08-09',
    status: 'Draft',
    officer: 'B. Mnyika',
    actions: ['View', 'Review']
  }
]

const statusClassMap = {
  Draft: 'draft',
  Submitted: 'submitted',
  'Under Review': 'under-review',
  'Pending Payment': 'pending-payment',
  'Payment Verified': 'payment-verified',
  Approved: 'approved',
  Rejected: 'rejected',
  'Returned for Correction': 'returned'
}

function ApplicationManagementPage() {
  return (
    <div className="application-management-page">
      <header className="application-management-header">
        <div>
          <span className="section-tag admin-tag">Teacher Registration</span>
          <h1>Application</h1>
        </div>
      </header>

      <p className="application-management-subtitle">
        Manage and track teacher registration applications.
      </p>

      <section className="application-stat-grid" aria-label="Application statistics">
        {stats.map((stat) => (
          <article key={stat.label} className="application-stat-card">
            <div className="application-stat-card-top">
              <span className="application-stat-icon" aria-hidden="true">{stat.icon}</span>
              <span className={`application-stat-trend ${stat.trendType}`}>{stat.trend}</span>
            </div>

            <div className="application-stat-body">
              <span className="application-stat-label">{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          </article>
        ))}
      </section>

      <section className="application-table-panel" aria-label="Teacher applications list">
        <div className="application-table-header">
          <div>
            <h2>Applications</h2>
          </div>
          <span>{applications.length} records</span>
        </div>

        <div className="application-table-wrapper">
          <table className="application-table">
            <thead>
              <tr>
                <th>Application Number</th>
                <th>Teacher Name</th>
                <th>Registration Type</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Assigned Officer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.teacherName}</td>
                  <td>
                    <span className="registration-type-badge">{application.registrationType}</span>
                  </td>
                  <td>{application.applicationDate}</td>
                  <td>
                    <span className={`status-pill ${statusClassMap[application.status]}`}>
                      {application.status}
                    </span>
                  </td>
                  <td>{application.officer}</td>
                  <td>
                    <div className="application-action-group">
                      {application.actions.map((action) => (
                        <button
                          key={`${application.id}-${action}`}
                          type="button"
                          className={`application-action-btn ${action.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default ApplicationManagementPage
