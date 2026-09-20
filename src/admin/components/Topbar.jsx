import { useNavigate } from 'react-router-dom'
import nationalFlag from '../../assets/national flag.jpg'

function Topbar({ onLogout, onToggleSidebar, isSidebarOpen }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }

    navigate('/login', { replace: true })
  }

  return (
    <header
      className="admin-topbar"
      style={{
        backgroundImage: `url(${nationalFlag})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="topbar-left">
        <button
          type="button"
          className="sidebar-toggle"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          onClick={onToggleSidebar}
        >
          ☰
        </button>

        <div className="topbar-search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input type="text" placeholder="Search teachers, applications, reports..." />
        </div>
      </div>

      <div className="topbar-actions">
        <button type="button" className="icon-button" aria-label="Notifications">
          <span aria-hidden="true">🔔</span>
          <span className="notification-badge">5</span>
        </button>

        <div className="user-profile">
          <div className="avatar">JL</div>
          <div>
            <strong>Joseph Luoga</strong>
            <span>Director of Registration</span>
          </div>
        </div>

        <button type="button" className="btn btn-secondary nav-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Topbar
