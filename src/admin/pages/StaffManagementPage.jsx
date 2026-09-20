import { useMemo, useState } from 'react'

const initialStaff = [
  { id: 1, name: 'Boniface Namajojo', role: 'Director', department: 'Administration', email: 'boniface@ttpb.go.tz', phone: '+255 712 123 456', status: 'Active', lastActive: '2 hours ago' },
  { id: 2, name: 'Grace Mwakalebela', role: 'HR Officer', department: 'Human Resources', email: 'grace@ttpb.go.tz', phone: '+255 764 234 567', status: 'Active', lastActive: '1 day ago' },
  { id: 3, name: 'John Mushi', role: 'Finance Officer', department: 'Finance', email: 'john@ttpb.go.tz', phone: '+255 765 345 678', status: 'On Leave', lastActive: '3 days ago' },
  { id: 4, name: 'Asha Mshana', role: 'Teacher', department: 'Academic Affairs', email: 'asha@ttpb.go.tz', phone: '+255 655 456 789', status: 'Active', lastActive: 'Today' },
  { id: 5, name: 'Salim Juma', role: 'Registrar', department: 'Student Services', email: 'salim@ttpb.go.tz', phone: '+255 789 567 890', status: 'Active', lastActive: '5 hours ago' },
  { id: 6, name: 'Joseph Mwangosi', role: 'Supervisor', department: 'Teaching Supervision', email: 'joseph@ttpb.go.tz', phone: '+255 754 678 901', status: 'Inactive', lastActive: '1 week ago' },
]

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  department: 'Administration',
  role: 'Staff',
  status: 'Active',
}

function StaffManagementPage() {
  const [staffMembers, setStaffMembers] = useState(initialStaff)
  const [search, setSearch] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All departments')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [formData, setFormData] = useState(emptyForm)

  const summaryCards = [
    { label: 'Total Staff', value: String(staffMembers.length), note: 'Across all departments', tone: 'blue' },
    { label: 'Active', value: String(staffMembers.filter((member) => member.status === 'Active').length), note: 'Currently active', tone: 'green' },
    { label: 'On Leave', value: String(staffMembers.filter((member) => member.status === 'On Leave').length), note: 'Away from duty', tone: 'amber' },
    { label: 'Inactive', value: String(staffMembers.filter((member) => member.status === 'Inactive').length), note: 'Require follow-up', tone: 'red' },
  ]

  const filteredStaff = useMemo(() => {
    return staffMembers.filter((member) => {
      const matchesSearch = `${member.name} ${member.role} ${member.department} ${member.email}`
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesDepartment = departmentFilter === 'All departments' || member.department === departmentFilter
      const matchesStatus = statusFilter === 'All statuses' || member.status === statusFilter

      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [departmentFilter, search, staffMembers, statusFilter])

  const departmentOptions = ['All departments', ...new Set(staffMembers.map((member) => member.department))]
  const statusOptions = ['All statuses', 'Active', 'On Leave', 'Inactive']

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleAddStaff = (event) => {
    event.preventDefault()

    const newMember = {
      id: Date.now(),
      name: formData.fullName,
      role: formData.role,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      lastActive: 'Just now',
    }

    setStaffMembers((current) => [newMember, ...current])
    setFormData(emptyForm)
    setIsAddStaffOpen(false)
  }

  return (
    <div className="staff-management-page">
      <header className="staff-management-header">
        <div>
          <p className="staff-management-eyebrow">Human Resources</p>
          <h1>Staff Management</h1>
        </div>
      </header>

      <p className="staff-management-subtitle">
        Manage staff profiles, assignments, attendance, and administrative access across the institution.
      </p>

      <div className="staff-management-top-actions">
        <button type="button" className="btn btn-primary staff-management-action-btn" onClick={() => setIsAddStaffOpen(true)}>
          <span aria-hidden="true">＋</span>
          Add Staff
        </button>
      </div>

      <section className="staff-management-summary-grid" aria-label="Staff summary cards">
        {summaryCards.map((card) => (
          <article key={card.label} className={`staff-management-summary-card staff-tone-${card.tone}`}>
            <span className="staff-management-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.note}</small>
          </article>
        ))}
      </section>

      <section className="staff-management-search-panel" aria-label="Staff filters">
        <div className="staff-management-control-row">
          <label className="staff-management-field">
            <span>Search staff</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, role, email..."
            />
          </label>

          <label className="staff-management-field">
            <span>Department</span>
            <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
              {departmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="staff-management-field">
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="staff-management-table-panel" aria-label="Staff list table">
        <div className="staff-management-table-header">
          <h2>Staff Directory</h2>
          <span>{filteredStaff.length} records</span>
        </div>

        <div className="staff-management-table-wrap">
          <table className="staff-management-table">
            <thead>
              <tr>
                <th>Staff</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="staff-management-person-cell">
                      <div className="staff-management-avatar" aria-hidden="true">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{member.name}</strong>
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{member.department}</td>
                  <td>{member.role}</td>
                  <td>
                    <span className={`staff-management-status-badge status-${member.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>{member.lastActive}</td>
                  <td>
                    <div className="staff-management-actions">
                      <button type="button" className="staff-management-action-icon action-view" aria-label={`View ${member.name}`}>
                        👁
                      </button>
                      <button type="button" className="staff-management-action-icon action-edit" aria-label={`Edit ${member.name}`}>
                        ✎
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isAddStaffOpen && (
        <div className="staff-management-modal-backdrop" onClick={() => setIsAddStaffOpen(false)}>
          <div className="staff-management-modal" role="dialog" aria-modal="true" aria-labelledby="add-staff-title" onClick={(event) => event.stopPropagation()}>
            <div className="staff-management-modal-header">
              <div>
                <p className="staff-management-eyebrow">New Staff Record</p>
                <h2 id="add-staff-title">Add Staff</h2>
              </div>
              <button type="button" className="staff-management-close-btn" aria-label="Close staff form" onClick={() => setIsAddStaffOpen(false)}>
                ×
              </button>
            </div>

            <form className="staff-management-form" onSubmit={handleAddStaff}>
              <div className="staff-management-form-grid">
                <label className="staff-management-field">
                  <span>Full name</span>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleFieldChange} required />
                </label>

                <label className="staff-management-field">
                  <span>Email address</span>
                  <input type="email" name="email" value={formData.email} onChange={handleFieldChange} required />
                </label>

                <label className="staff-management-field">
                  <span>Phone number</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleFieldChange} />
                </label>

                <label className="staff-management-field">
                  <span>Department</span>
                  <select name="department" value={formData.department} onChange={handleFieldChange}>
                    <option value="Administration">Administration</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Academic Affairs">Academic Affairs</option>
                    <option value="Student Services">Student Services</option>
                    <option value="Teaching Supervision">Teaching Supervision</option>
                  </select>
                </label>

                <label className="staff-management-field">
                  <span>Role</span>
                  <input type="text" name="role" value={formData.role} onChange={handleFieldChange} required />
                </label>

                <label className="staff-management-field">
                  <span>Status</span>
                  <select name="status" value={formData.status} onChange={handleFieldChange}>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
              </div>

              <div className="staff-management-form-actions">
                <button type="submit" className="btn btn-primary staff-management-form-btn">
                  Save Staff
                </button>
                <button type="button" className="btn btn-secondary staff-management-form-btn" onClick={() => setIsAddStaffOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaffManagementPage
