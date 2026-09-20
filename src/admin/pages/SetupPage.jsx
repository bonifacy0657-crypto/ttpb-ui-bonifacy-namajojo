import { Link } from 'react-router-dom'

const setupGroups = [
  {
    title: 'Master Data',
    icon: '▣',
    items: [
      { name: 'Organization Unit', path: '/admin/setup/master-data/organization-unit', icon: '🏢' },
      { name: 'Institutions', path: '/admin/setup/master-data/institutions', icon: '🏫' },
      { name: 'Regions', path: '/admin/setup/master-data/regions', icon: '📍' },
      { name: 'Admin Areas', path: '/admin/setup/master-data/admin-areas', icon: '🗺️' },
      { name: 'Categories', path: '/admin/setup/master-data/categories', icon: '🗂️' },
      { name: 'Subsectors', path: '/admin/setup/master-data/subsectors', icon: '🧩' },
      { name: 'Subjects', path: '/admin/setup/master-data/subjects', icon: '📘' },
      { name: 'Designation', path: '/admin/setup/master-data/designation', icon: '🎖️' },
    ],
  },
  {
    title: 'Access Control',
    icon: '🔒',
    items: [
      { name: 'Permissions', path: '/admin/setup/access-control/permissions', icon: '🔑' },
      { name: 'Roles', path: '/admin/setup/access-control/roles', icon: '👥' },
    ],
  },
  {
    title: 'Licensing',
    icon: '📜',
    items: [
      { name: 'License Status', path: '/admin/setup/licensing/license-status', icon: '✅' },
      { name: 'License Classes', path: '/admin/setup/licensing/license-classes', icon: '🏅' },
      { name: 'License Categories', path: '/admin/setup/licensing/license-categories', icon: '📁' },
    ],
  },
]

function SetupPage() {
  return (
    <div className="setup-page">
      <header className="setup-header">
        <div>
          <p className="setup-eyebrow">Configuration</p>
          <h1>Setup</h1>
        </div>
      </header>

      <div className="setup-groups-wrapper">
        {setupGroups.map((group) => (
          <section key={group.title} className="setup-group-section">
            <div className="setup-group-header">
              <span className="setup-group-icon" aria-hidden="true">{group.icon}</span>
              <h2>{group.title}</h2>
            </div>

            <div className="setup-group-grid">
              {group.items.map((item) => (
                <Link key={item.name} to={item.path} className="setup-module-card">
                  <div className="setup-module-icon" aria-hidden="true">{item.icon}</div>
                  <div className="setup-module-copy">
                    <h3>{item.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default SetupPage
