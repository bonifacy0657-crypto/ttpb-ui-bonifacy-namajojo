import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import nationalLogo from '../assets/national logo.jpg'

const DEMO_EMAIL = 'admin@ttpb.go.tz'
const DEMO_PASSWORD = 'Admin@123'

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    if (!trimmedUsername || !trimmedPassword) {
      setError('Please enter both username/email and password.')
      return
    }

    const isValidCredentials = trimmedUsername === DEMO_EMAIL && trimmedPassword === DEMO_PASSWORD

    if (!isValidCredentials) {
      setError('Invalid username or password')
      return
    }

    setError('')
    localStorage.setItem('ttpb_is_authenticated', 'true')
    localStorage.setItem('ttpb_remember_me', String(rememberMe))

    if (onLogin) {
      onLogin()
    }

    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-brand" aria-label="TTPB brand">
            <img src={nationalLogo} alt="Tanzania National Logo" className="brand-logo" />
            <div className="brand-text">
              <span className="brand-name">TTPB</span>
              <span className="brand-subtitle">Tanzania Teachers Professional Board</span>
            </div>
          </div>

          <div className="auth-header">
            <span className="section-tag">Secure Portal</span>
            <h1>Welcome back</h1>
            <p>Sign in to continue to your TTPB dashboard.</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin} noValidate>
            <label className="field-group">
              <span>Username or Email</span>
              <input
                type="text"
                placeholder="admin@ttpb.go.tz"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </label>

            <label className="field-group">
              <span>Password</span>
              <div className="password-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}

            <div className="form-row">
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember Me</span>
              </label>

              <button type="button" className="text-link-button" onClick={() => navigate('/register')}>
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn btn-primary large auth-btn">
              Login
            </button>
          </form>

          <p className="auth-footer">
            Don’t have an account?{' '}
            <button type="button" className="text-link-button" onClick={() => navigate('/register')}>
              Create account
            </button>
          </p>

          <button type="button" className="back-link-button" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
