function UserManagementPage() {
  const summaryCards = [
    { label: 'Total Users', value: '248', note: '+12 this month', icon: '👥', tone: 'total' },
    { label: 'Active', value: '196', note: 'Current page', icon: '✅', tone: 'active' },
    { label: 'Inactive', value: '52', note: 'Current page', icon: '⏳', tone: 'inactive' },
  ]

  const sampleUsers = [
    { name: 'Boniface Namajojo', role: 'Super Admin', status: 'Active' },
    { name: 'Grace Mwakalebela', role: 'System Admin', status: 'Active' },
    { name: 'John Mushi', role: 'Finance Officer', status: 'Inactive' },
    { name: 'Asha Mshana', role: 'Teacher', status: 'Active' },
    { name: 'Salim Juma', role: 'Registrar', status: 'Active' },
    { name: 'Faith Ndagala', role: 'Auditor', status: 'Inactive' },
    { name: 'Joseph Mwangosi', role: 'Supervisor', status: 'Active' },
    { name: 'Mary Kivuyo', role: 'Support Officer', status: 'Active' },
    { name: 'Abdul Msuya', role: 'Data Analyst', status: 'Inactive' },
    { name: 'Ruth Kijazi', role: 'Operations Manager', status: 'Active' },
  ]

  return (
    <div className="user-management-page">
      <div className="user-management-header">
        <div>
          <h1>User Management</h1>
        </div>
      </div>

      <p className="user-management-subtitle">Manage system user and their permissions</p>

      <div className="user-summary-grid">
        {summaryCards.map((card) => (
          <div key={card.label} className={`summary-card ${card.tone}`}>
            <div className="summary-card-top">
              <span className="summary-icon" aria-hidden="true">{card.icon}</span>
              <span className="summary-label">{card.label}</span>
            </div>
            <strong className="summary-value">{card.value}</strong>
            <small>{card.note}</small>
          </div>
        ))}
      </div>

      <div className="user-search-panel">
        <label className="user-search-field" htmlFor="user-search">
          <span>Search users</span>
          <input id="user-search" type="search" placeholder="Search by name, email, role..." />
        </label>
      </div>

      <div className="user-list-panel">
        <div className="user-list-header">
          <h2>System Users</h2>
          <span>10 examples</span>
        </div>

        <div className="user-list">
          {sampleUsers.map((user) => (
            <div className="user-row" key={user.name}>
              <div className="user-info">
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>
              <span className={`user-status ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                {user.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage
