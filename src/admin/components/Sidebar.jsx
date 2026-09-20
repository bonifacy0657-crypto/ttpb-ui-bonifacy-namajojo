import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { sidebarItems } from '../data/dashboardData'

function Sidebar({ onLogout, isOpen, onClose }) {
  const navigate = useNavigate()
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpandedItem = (label) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }

    if (onClose) {
      onClose()
    }

    navigate('/login', { replace: true })
  }

  const renderNavItem = (item) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems[item.label] ?? item.defaultExpanded ?? true

    return (
      <div key={item.path || item.label} className="sidebar-group">
        <div className="sidebar-link-row">
          {hasChildren && (
            <button
              type="button"
              className={`sidebar-link sidebar-parent-toggle ${isExpanded ? 'active' : ''}`}
              aria-expanded={isExpanded}
              onClick={() => toggleExpandedItem(item.label)}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              <span className={`sidebar-submenu-arrow ${isExpanded ? 'expanded' : ''}`} aria-hidden="true">▶</span>
            </button>
          )}

          {!hasChildren && (
            <NavLink
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="sidebar-subnav" aria-label={`${item.label} submenu`}>
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  `sidebar-sublink ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                <span className="sidebar-icon" aria-hidden="true">{child.icon}</span>
                <span>{child.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">T</div>
          <div>
            <strong>TTPB</strong>
            <span>Admin Portal</span>
          </div>
        </div>

        <button type="button" className="sidebar-close" aria-label="Close sidebar" onClick={onClose}>
          ×
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        {sidebarItems.map(renderNavItem)}
      </nav>

      <button type="button" className="btn btn-secondary nav-btn sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
