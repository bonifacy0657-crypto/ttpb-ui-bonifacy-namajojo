import { useMemo, useState } from 'react'

const trainings = [
  { id: 1, title: 'Inclusive Education and Assessment', provider: 'Mwenge Teacher Development Centre', category: 'Pedagogy', date: '2026-09-15', duration: '3 Days', deliveryMode: 'Physical', slots: 24, status: 'Available', description: 'This course supports teachers in inclusive classroom strategies and student assessment methods.', objectives: ['Use inclusive teaching strategies', 'Assess diverse learners effectively'], trainer: 'Dr. Elizabeth Kijazi', location: 'Dar es Salaam', level: 'Primary School Teachers', points: 12, enrollmentStatus: 'Open' },
  { id: 2, title: 'Digital Teaching Strategies', provider: 'Nuru Education Hub', category: 'Technology', date: '2026-09-18', duration: '2 Days', deliveryMode: 'Online', slots: 18, status: 'Enrolled', description: 'Learn digital tools to deliver effective blended learning.', objectives: ['Use online platforms', 'Design digital lessons'], trainer: 'Mr. John Amani', location: 'Online', level: 'Secondary School Teachers', points: 8, enrollmentStatus: 'Enrolled' },
  { id: 3, title: 'School Leadership for Improvement', provider: 'Amani Learning Institute', category: 'Leadership', date: '2026-10-05', duration: '5 Days', deliveryMode: 'Hybrid', slots: 12, status: 'Completed', description: 'Build leadership practices for school quality improvement.', objectives: ['Lead improvement cycles', 'Monitor school performance'], trainer: 'Prof. Zaina Salim', location: 'Dodoma', level: 'School Leaders', points: 15, enrollmentStatus: 'Completed' },
  { id: 4, title: 'Curriculum Design for Competency-Based Learning', provider: 'Bright Path Academy', category: 'Curriculum', date: '2026-10-21', duration: '4 Days', deliveryMode: 'Physical', slots: 20, status: 'Pending', description: 'Strengthen competencies through learner-centered curriculum practices.', objectives: ['Design competency-based tasks', 'Align assessments'], trainer: 'Ms. Hilda Kivuyo', location: 'Arusha', level: 'Secondary School Teachers', points: 10, enrollmentStatus: 'Pending' },
]

function CPDTrainingsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [modeFilter, setModeFilter] = useState('All Modes')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [selectedTraining, setSelectedTraining] = useState(null)

  const filteredTrainings = useMemo(() => {
    return trainings.filter((training) => {
      const matchesSearch = `${training.title} ${training.provider}`.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === 'All Categories' || training.category === categoryFilter
      const matchesMode = modeFilter === 'All Modes' || training.deliveryMode === modeFilter
      const matchesStatus = statusFilter === 'All Statuses' || training.status === statusFilter
      return matchesSearch && matchesCategory && matchesMode && matchesStatus
    })
  }, [categoryFilter, modeFilter, search, statusFilter])

  const summaryCards = [
    { label: 'Available Trainings', value: trainings.filter((item) => item.status === 'Available').length, tone: 'blue' },
    { label: 'Enrolled Trainings', value: trainings.filter((item) => item.status === 'Enrolled').length, tone: 'green' },
    { label: 'Completed Trainings', value: trainings.filter((item) => item.status === 'Completed').length, tone: 'amber' },
    { label: 'Pending Trainings', value: trainings.filter((item) => item.status === 'Pending').length, tone: 'red' },
  ]

  return (
    <div className="cpd-module-page">
      <header className="cpd-header">
        <div>
          <p className="cpd-eyebrow">Learning Hub</p>
          <h1>Trainings</h1>
        </div>
      </header>

      <p className="cpd-subtitle">Manage and view professional development training opportunities.</p>

      <div className="cpd-top-actions">
        <button type="button" className="btn btn-primary cpd-action-btn">
          <span aria-hidden="true">＋</span>
          Add Training
        </button>
      </div>

      <section className="cpd-summary-grid" aria-label="Training summary cards">
        {summaryCards.map((card) => (
          <article key={card.label} className={`cpd-summary-card cpd-tone-${card.tone}`}>
            <span className="cpd-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="cpd-search-panel" aria-label="Training filters">
        <div className="cpd-control-row">
          <label className="cpd-field">
            <span>Search</span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search training..." />
          </label>

          <label className="cpd-field">
            <span>Training Category</span>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="All Categories">All Categories</option>
              <option value="Pedagogy">Pedagogy</option>
              <option value="Technology">Technology</option>
              <option value="Leadership">Leadership</option>
              <option value="Curriculum">Curriculum</option>
            </select>
          </label>

          <label className="cpd-field">
            <span>Delivery Mode</span>
            <select value={modeFilter} onChange={(event) => setModeFilter(event.target.value)}>
              <option value="All Modes">All Modes</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </label>

          <label className="cpd-field">
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="All Statuses">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </label>
        </div>
      </section>

      <section className="cpd-section-panel" aria-label="Training list table">
        <div className="cpd-section-header">
          <h2>Training Opportunities</h2>
          <span>{filteredTrainings.length} records</span>
        </div>

        <div className="cpd-table-wrap">
          <table className="cpd-table">
            <thead>
              <tr>
                <th>Training Title</th>
                <th>CPD Provider</th>
                <th>Training Category</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Delivery Mode</th>
                <th>Available Slots</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainings.map((training) => (
                <tr key={training.id}>
                  <td>{training.title}</td>
                  <td>{training.provider}</td>
                  <td>{training.category}</td>
                  <td>{training.date}</td>
                  <td>{training.duration}</td>
                  <td>{training.deliveryMode}</td>
                  <td>{training.slots}</td>
                  <td><span className={`cpd-badge status-${training.status.toLowerCase()}`}>{training.status}</span></td>
                  <td>
                    <div className="cpd-button-stack">
                      <button type="button" className="btn btn-secondary cpd-mini-btn" onClick={() => setSelectedTraining(training)}>View Details</button>
                      <button type="button" className="btn btn-primary cpd-mini-btn">Enroll</button>
                      <button type="button" className="btn btn-secondary cpd-mini-btn">View Certificate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedTraining && (
        <div className="cpd-modal-backdrop" onClick={() => setSelectedTraining(null)}>
          <div className="cpd-modal large" role="dialog" aria-modal="true" aria-labelledby="training-detail-title" onClick={(event) => event.stopPropagation()}>
            <div className="cpd-modal-header">
              <div>
                <p className="cpd-eyebrow">Training Overview</p>
                <h2 id="training-detail-title">{selectedTraining.title}</h2>
              </div>
              <button type="button" className="cpd-close-btn" aria-label="Close details" onClick={() => setSelectedTraining(null)}>×</button>
            </div>

            <div className="cpd-detail-grid">
              <div><strong>Provider:</strong> {selectedTraining.provider}</div>
              <div><strong>Training Description:</strong> {selectedTraining.description}</div>
              <div><strong>Learning Objectives:</strong> {selectedTraining.objectives.join('; ')}</div>
              <div><strong>Trainer/Facilitator:</strong> {selectedTraining.trainer}</div>
              <div><strong>Start Date:</strong> {selectedTraining.date}</div>
              <div><strong>Duration:</strong> {selectedTraining.duration}</div>
              <div><strong>Location/Online Link:</strong> {selectedTraining.location}</div>
              <div><strong>Target Teacher Level:</strong> {selectedTraining.level}</div>
              <div><strong>CPD Points/Credits:</strong> {selectedTraining.points}</div>
              <div><strong>Available Slots:</strong> {selectedTraining.slots}</div>
              <div><strong>Enrollment Status:</strong> {selectedTraining.enrollmentStatus}</div>
            </div>

            <div className="cpd-form-actions">
              <button type="button" className="btn btn-primary cpd-form-btn">Enroll</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CPDTrainingsPage
