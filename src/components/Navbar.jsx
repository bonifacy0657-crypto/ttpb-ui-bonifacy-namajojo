import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import nationalFlag from '../assets/national flag.jpg'
import nationalLogo from '../assets/national logo.jpg'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="site-header" style={{ backgroundImage: `url(${nationalFlag})` }}>
      <div className="container navbar">
        <Link to="/" className="brand brand-button" aria-label="Tanzania Teachers Professional Board home" onClick={handleNavClick}>
          <div className="brand-mark" aria-label="National logo">
            <img src={nationalLogo} alt="Tanzania national logo" />
          </div>
          <div className="brand-text">
            <span className="brand-name">TTPB</span>
            <span className="brand-subtitle">Tanzania Teachers Professional Board</span>
          </div>
        </Link>

        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            item.href.startsWith('#') ? (
              <a
                href={item.href}
                key={item.label}
                className={`nav-link ${location.hash === item.href || (item.href === '#home' && !location.hash) ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            ) : (
              <Link to={item.href} key={item.label} className="nav-link" onClick={handleNavClick}>
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="btn btn-secondary nav-btn" onClick={() => navigate('/register')}>
            Register
          </button>
          <button type="button" className="btn btn-primary nav-btn" onClick={() => navigate('/login')}>
            Login
          </button>

          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
