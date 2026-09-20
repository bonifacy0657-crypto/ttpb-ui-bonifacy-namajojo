import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <div className="brand-mark">T</div>
            <div className="brand-text">
              <span className="brand-name">TTPB</span>
              <span className="brand-subtitle">Tanzania Teachers Professional Board</span>
            </div>
          </div>
          <p className="footer-copy">
            Supporting professional standards, teacher registration, and quality education.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3>Support</h3>
          <ul className="footer-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Licensing</Link></li>
            <li><Link to="/login">Renewal</Link></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="footer-links">
            <li><a href="tel:+255000000000">+255 000 000 000</a></li>
            <li><a href="mailto:info@ttpb.go.tz">info@ttpb.go.tz</a></li>
            <li><span>Dar es Salaam, Tanzania</span></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Tanzania Teachers Professional Board. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
