import { useState } from 'react'

const supervisionStats = [
  { label: 'Active Supervision', value: 4, icon: '👁️' },
  { label: 'Completed', value: 1, icon: '✅' },
  { label: 'Pending Review', value: 3, icon: '⏳' },
]

const supervisedTeachers = [
  {
    name: 'Amina Hassan',
    status: 'Internship',
    info: 'Assigned to Mikocheni Secondary School • Mentor: Mr. Kivuyo',
  },
  {
    name: 'Daniel Mwesiga',
    status: 'Active',
    info: 'Monthly review due on 27 Sep 2026 • District: Morogoro',
  },
  {
    name: 'Grace Msimbe',
    status: 'Probation',
    info: 'Probation period ends in 18 days • Supervisor: Mrs. Mwajuma',
  },
  {
    name: 'Joseph Lema',
    status: 'At Risk',
    info: 'Follow-up required • Last observation score: 58%',
  },
  {
    name: 'Salma Ally',
    status: 'Active',
    info: 'Mentoring session completed • School: Arusha Girls',
  },
  {
    name: 'Emmanuel Nyamwiza',
    status: 'Internship',
    info: 'Placement approved • Week 6 of teaching practice',
  },
  {
    name: 'Ruth Kabogo',
    status: 'Probation',
    info: 'Newly assigned • First review scheduled for 14 Oct 2026',
  },
]

const statusClassMap = {
  Internship: 'status-internship',
  Active: 'status-active',
  Probation: 'status-probation',
  'At Risk': 'status-risk',
}

const initialFormData = {
  teacherRegistrationNumber: '',
  fullName: '',
  nationalId: '',
  gender: '',
  dateOfBirth: '',
  phoneNumber: '',
  emailAddress: '',
  schoolName: '',
  schoolRegistrationNumber: '',
  region: '',
  district: '',
  ward: '',
  employmentStatus: '',
  teachingSubjects: '',
  supervisorName: '',
  supervisionType: 'Internship',
  startDate: '',
  expectedEndDate: '',
  supervisionStatus: 'Pending',
  remarks: '',
}

function TeachingSupervisionPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [savedTeacher, setSavedTeacher] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleOpenForm = () => {
    setSavedTeacher('')
    setFormData(initialFormData)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    resetForm()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const teacherName = formData.fullName || 'Supervised teacher'
    setSavedTeacher(teacherName)
    setIsFormOpen(false)
    resetForm()
  }

  return (
    <div className="teaching-supervision-page">
      <header className="teaching-supervision-header">
        <div>
          <span className="section-tag admin-tag">Teaching Supervision</span>
          <h1>Teaching Under Supervision</h1>
        </div>
      </header>

      <p className="teaching-supervision-subtitle">Monitor and manage teachers under supervision.</p>

      {savedTeacher && (
        <div className="teaching-supervision-success" role="status" aria-live="polite">
          {savedTeacher} has been added successfully to the supervision list.
        </div>
      )}

      <button type="button" className="btn btn-primary teaching-supervision-add-btn" onClick={handleOpenForm}>
        <span className="teaching-supervision-add-icon" aria-hidden="true">＋</span>
        <span>Add Supervised Teacher</span>
      </button>

      <section className="teaching-supervision-stats" aria-label="Teaching supervision summary">
        {supervisionStats.map((stat) => (
          <article key={stat.label} className="teaching-supervision-stat-card">
            <div className="teaching-supervision-stat-top">
              <span className="teaching-supervision-stat-icon" aria-hidden="true">{stat.icon}</span>
            </div>
            <div className="teaching-supervision-stat-body">
              <span className="teaching-supervision-stat-label">{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          </article>
        ))}
      </section>

      <div className="teaching-supervision-search-panel">
        <label className="teaching-supervision-search-field" htmlFor="teacher-search">
          <span>Search by teacher</span>
          <input id="teacher-search" type="search" placeholder="Search by teacher" />
        </label>
      </div>

      <section className="teaching-supervision-list-panel" aria-label="Supervised teachers list">
        <div className="teaching-supervision-list-header">
          <h2>Supervised Teachers</h2>
          <span>{supervisedTeachers.length} records</span>
        </div>

        <div className="teaching-supervision-list">
          {supervisedTeachers.map((teacher) => (
            <div key={teacher.name} className="teaching-supervision-row">
              <div className="teaching-supervision-teacher-info">
                <strong>{teacher.name}</strong>
                <span>{teacher.info}</span>
              </div>

              <span className={`teaching-supervision-status ${statusClassMap[teacher.status]}`}>
                {teacher.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {isFormOpen && (
        <div className="teaching-supervision-modal-backdrop" onClick={handleCloseForm}>
          <div
            className="teaching-supervision-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-supervised-teacher-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="teaching-supervision-modal-header">
              <div>
                <span className="section-tag admin-tag">Teaching Supervision</span>
                <h2 id="add-supervised-teacher-title">Add Supervised Teacher</h2>
              </div>
              <button type="button" className="teaching-supervision-close-btn" onClick={handleCloseForm} aria-label="Close form">
                ✕
              </button>
            </div>

            <p className="teaching-supervision-modal-subtitle">Add and manage a teacher under professional supervision.</p>

            <form className="teacher-update-form" onSubmit={handleSubmit}>
              <section className="teacher-form-card">
                <div className="teacher-form-card-header">
                  <h2>Teacher Information</h2>
                </div>

                <div className="teacher-form-grid">
                  <label className="teacher-form-field">
                    <span>Teacher Registration Number</span>
                    <input type="text" name="teacherRegistrationNumber" value={formData.teacherRegistrationNumber} onChange={handleChange} placeholder="e.g. TTPB-2026-015" />
                  </label>

                  <label className="teacher-form-field">
                    <span>Full Name</span>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
                  </label>

                  <label className="teacher-form-field">
                    <span>National ID / NIDA Number</span>
                    <input type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="Enter national ID" />
                  </label>

                  <label className="teacher-form-field">
                    <span>Gender</span>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="teacher-form-field">
                    <span>Date of Birth</span>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                  </label>

                  <label className="teacher-form-field">
                    <span>Phone Number</span>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="e.g. +255 712 345 678" />
                  </label>

                  <label className="teacher-form-field" style={{ gridColumn: '1 / -1' }}>
                    <span>Email Address</span>
                    <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="teacher@example.com" />
                  </label>
                </div>
              </section>

              <section className="teacher-form-card">
                <div className="teacher-form-card-header">
                  <h2>Employment Information</h2>
                </div>

                <div className="teacher-form-grid">
                  <label className="teacher-form-field">
                    <span>School Name</span>
                    <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} placeholder="Enter school name" />
                  </label>

                  <label className="teacher-form-field">
                    <span>School Registration Number</span>
                    <input type="text" name="schoolRegistrationNumber" value={formData.schoolRegistrationNumber} onChange={handleChange} placeholder="Enter registration number" />
                  </label>

                  <label className="teacher-form-field">
                    <span>Region</span>
                    <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Enter region" />
                  </label>

                  <label className="teacher-form-field">
                    <span>District</span>
                    <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="Enter district" />
                  </label>

                  <label className="teacher-form-field">
                    <span>Ward</span>
                    <input type="text" name="ward" value={formData.ward} onChange={handleChange} placeholder="Enter ward" />
                  </label>

                  <label className="teacher-form-field">
                    <span>Employment Status</span>
                    <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange}>
                      <option value="">Select employment status</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </label>

                  <label className="teacher-form-field" style={{ gridColumn: '1 / -1' }}>
                    <span>Teaching Subject(s)</span>
                    <input type="text" name="teachingSubjects" value={formData.teachingSubjects} onChange={handleChange} placeholder="e.g. Mathematics, Biology, Chemistry" />
                  </label>
                </div>
              </section>

              <section className="teacher-form-card">
                <div className="teacher-form-card-header">
                  <h2>Supervision Details</h2>
                </div>

                <div className="teacher-form-grid">
                  <label className="teacher-form-field">
                    <span>Supervisor Name</span>
                    <input type="text" name="supervisorName" value={formData.supervisorName} onChange={handleChange} placeholder="Enter supervisor name" />
                  </label>

                  <label className="teacher-form-field">
                    <span>Supervision Type</span>
                    <select name="supervisionType" value={formData.supervisionType} onChange={handleChange}>
                      <option value="Internship">Internship</option>
                      <option value="Probation">Probation</option>
                      <option value="Teaching Practice">Teaching Practice</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="teacher-form-field">
                    <span>Start Date</span>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                  </label>

                  <label className="teacher-form-field">
                    <span>Expected End Date</span>
                    <input type="date" name="expectedEndDate" value={formData.expectedEndDate} onChange={handleChange} />
                  </label>

                  <label className="teacher-form-field">
                    <span>Supervision Status</span>
                    <select name="supervisionStatus" value={formData.supervisionStatus} onChange={handleChange}>
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </label>

                  <label className="teacher-form-field" style={{ gridColumn: '1 / -1' }}>
                    <span>Remarks / Notes</span>
                    <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Add notes for the supervision case" />
                  </label>
                </div>
              </section>

              <div className="teacher-form-actions">
                <button type="submit" className="btn btn-primary teacher-registration-btn">
                  <span className="teacher-registration-btn-icon" aria-hidden="true">✓</span>
                  <span>Save &amp; Add Teacher</span>
                </button>

                <button type="button" className="btn btn-secondary teacher-registration-btn" onClick={handleCloseForm}>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeachingSupervisionPage
