import { useMemo, useState } from 'react'

const activities = [
  { name: 'Inclusive Education Workshop', type: 'Workshop', provider: 'TTPB Training Unit', date: '2026-08-10', points: 12, status: 'Completed', certificate: 'Available', action: 'View Certificate' },
  { name: 'Digital Learning Seminar', type: 'Seminar', provider: 'eLearning Hub', date: '2026-08-15', points: 8, status: 'Verified', certificate: 'Uploaded', action: 'View Details' },
  { name: 'School Leadership Coaching', type: 'Mentorship', provider: 'Institute for Education', date: '2026-09-01', points: 10, status: 'In Progress', certificate: 'Pending', action: 'Upload Certificate' },
  { name: 'Research Methods Course', type: 'Online Course', provider: 'Open Learning Institute', date: '2026-09-12', points: 6, status: 'Pending', certificate: 'Not Uploaded', action: 'View Details' },
]

function CareerDevelopmentPage() {
  const [search, setSearch] = useState('')
  const [selectedActivity, setSelectedActivity] = useState(null)

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => `${activity.name} ${activity.type}`.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0)
  const requiredPoints = 60
  const remainingPoints = Math.max(requiredPoints - totalPoints, 0)
  const completionPercentage = Math.min((totalPoints / requiredPoints) * 100, 100)

  return (
    <div className="cpd-module-page">
      <header className="cpd-header">
        <div>
          <p className="cpd-eyebrow">Growth Tracker</p>
          <h1>Career Development</h1>
        </div>
      </header>

      <p className="cpd-subtitle">Track your professional growth and career development activities.</p>

      <section className="cpd-summary-grid" aria-label="Career development summary cards">
        <article className="cpd-summary-card cpd-tone-blue">
          <span className="cpd-summary-label">Total CPD Points</span>
          <strong>{totalPoints}</strong>
        </article>
        <article className="cpd-summary-card cpd-tone-green">
          <span className="cpd-summary-label">Completed Activities</span>
          <strong>{activities.filter((item) => item.status === 'Completed' || item.status === 'Verified').length}</strong>
        </article>
        <article className="cpd-summary-card cpd-tone-amber">
          <span className="cpd-summary-label">Pending Activities</span>
          <strong>{activities.filter((item) => item.status === 'Pending' || item.status === 'In Progress').length}</strong>
        </article>
        <article className="cpd-summary-card cpd-tone-red">
          <span className="cpd-summary-label">Required CPD Points</span>
          <strong>{requiredPoints}</strong>
        </article>
      </section>

      <section className="cpd-section-panel" aria-label="Career development progress overview">
        <div className="cpd-section-header">
          <h2>Career Development Progress</h2>
        </div>

        <div className="cpd-progress-overview">
          <div className="cpd-progress-meta">
            <div><span>Required CPD Points</span><strong>{requiredPoints}</strong></div>
            <div><span>Earned CPD Points</span><strong>{totalPoints}</strong></div>
            <div><span>Remaining Points</span><strong>{remainingPoints}</strong></div>
            <div><span>Completion Percentage</span><strong>{Math.round(completionPercentage)}%</strong></div>
          </div>

          <div className="cpd-progress-bar-wrap" aria-label="Progress bar">
            <div className="cpd-progress-bar" style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>
      </section>

      <section className="cpd-section-panel" aria-label="Professional development activities">
        <div className="cpd-section-header">
          <h2>Professional Development Activities</h2>
          <button type="button" className="btn btn-primary cpd-mini-btn">+ Add Activity</button>
        </div>

        <div className="cpd-search-panel">
          <label className="cpd-field">
            <span>Search</span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search activities..." />
          </label>
        </div>

        <div className="cpd-table-wrap">
          <table className="cpd-table">
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Activity Type</th>
                <th>Provider</th>
                <th>Date</th>
                <th>CPD Points</th>
                <th>Status</th>
                <th>Certificate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.name}>
                  <td>{activity.name}</td>
                  <td>{activity.type}</td>
                  <td>{activity.provider}</td>
                  <td>{activity.date}</td>
                  <td>{activity.points}</td>
                  <td><span className={`cpd-badge status-${activity.status.toLowerCase().replace(/\s+/g, '-')}`}>{activity.status}</span></td>
                  <td>{activity.certificate}</td>
                  <td>
                    <div className="cpd-button-stack">
                      <button type="button" className="btn btn-secondary cpd-mini-btn" onClick={() => setSelectedActivity(activity)}>View Details</button>
                      <button type="button" className="btn btn-secondary cpd-mini-btn">Upload Certificate</button>
                      <button type="button" className="btn btn-primary cpd-mini-btn">View Certificate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="cpd-section-panel" aria-label="Career development history">
        <div className="cpd-section-header">
          <h2>Career Development History</h2>
        </div>

        <div className="cpd-history-list">
          {activities.filter((item) => item.status === 'Completed' || item.status === 'Verified').map((item) => (
            <div key={item.name} className="cpd-history-item">
              <div>
                <strong>{item.name}</strong>
                <span>{item.type} • {item.provider}</span>
              </div>
              <div className="cpd-history-meta">
                <span>{item.date}</span>
                <span>{item.points} CPD points</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedActivity && (
        <div className="cpd-modal-backdrop" onClick={() => setSelectedActivity(null)}>
          <div className="cpd-modal" role="dialog" aria-modal="true" aria-labelledby="activity-detail-title" onClick={(event) => event.stopPropagation()}>
            <div className="cpd-modal-header">
              <div>
                <p className="cpd-eyebrow">Activity Details</p>
                <h2 id="activity-detail-title">{selectedActivity.name}</h2>
              </div>
              <button type="button" className="cpd-close-btn" aria-label="Close activity" onClick={() => setSelectedActivity(null)}>×</button>
            </div>

            <div className="cpd-detail-list">
              <div><strong>Activity Type:</strong> {selectedActivity.type}</div>
              <div><strong>Provider:</strong> {selectedActivity.provider}</div>
              <div><strong>Date:</strong> {selectedActivity.date}</div>
              <div><strong>CPD Points:</strong> {selectedActivity.points}</div>
              <div><strong>Status:</strong> {selectedActivity.status}</div>
              <div><strong>Certificate:</strong> {selectedActivity.certificate}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerDevelopmentPage
