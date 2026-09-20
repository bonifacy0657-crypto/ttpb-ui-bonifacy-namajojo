import { useMemo, useState } from 'react'

const windowInfo = {
  status: 'Open',
  openingDate: '2026-09-01',
  closingDate: '2026-09-30',
  applicationStatus: 'Open for applications',
  deadline: '2026-09-30',
  remainingDays: 12,
}

const existingApplications = [
  { id: 'INT-2026-001', school: 'Kibaha Secondary School' },
]

function InternshipWindowPage() {
  const [hasApplied, setHasApplied] = useState(existingApplications.length > 0)
  const [windowStatus, setWindowStatus] = useState(windowInfo.status)

  const statusCard = useMemo(() => [{
    label: 'Window Status', value: windowStatus,
  }, {
    label: 'Opening Date', value: windowInfo.openingDate,
  }, {
    label: 'Closing Date', value: windowInfo.closingDate,
  }, {
    label: 'Application Status', value: windowInfo.applicationStatus,
  }], [windowStatus])

  const handleApply = () => {
    if (windowStatus === 'Closed') {
      return
    }

    if (hasApplied) {
      return
    }

    setHasApplied(true)
  }

  return (
    <div className="internship-module-page">
      <header className="internship-header">
        <div>
          <p className="internship-eyebrow">Placement Cycle</p>
          <h1>Internship Window</h1>
        </div>
      </header>

      <p className="internship-subtitle">
        This section allows eligible teachers and interns to view and apply during an active internship placement period.
      </p>

      <section className="internship-status-grid" aria-label="Internship window status">
        {statusCard.map((item) => (
          <article key={item.label} className="internship-status-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="internship-panel">
        <div className="internship-panel-header">
          <h2>Application Timeline</h2>
          <span>{windowStatus === 'Open' ? 'Active' : 'Closed'}</span>
        </div>

        {windowStatus === 'Open' ? (
          <div className="internship-window-body">
            <p>
              Application deadline: <strong>{windowInfo.deadline}</strong>
            </p>
            <p>
              Remaining status: <strong>{windowInfo.remainingDays} days left</strong>
            </p>

            {hasApplied ? (
              <div className="internship-alert alert-info">
                Your internship application has already been submitted. Duplicate applications are not allowed.
              </div>
            ) : (
              <button type="button" className="btn btn-primary internship-action-btn" onClick={handleApply}>
                Apply for Internship
              </button>
            )}
          </div>
        ) : (
          <div className="internship-window-body">
            <div className="internship-alert alert-warning">
              The internship window is currently closed. Applications are no longer being accepted for this cycle.
            </div>
            <p>Application deadline: <strong>{windowInfo.deadline}</strong></p>
            <p>Expired status: <strong>Closed</strong></p>
          </div>
        )}
      </section>
    </div>
  )
}

export default InternshipWindowPage
