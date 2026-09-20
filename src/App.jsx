import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminApp from './admin/AdminApp'

const AUTH_KEY = 'ttpb_is_authenticated'
const REMEMBER_KEY = 'ttpb_remember_me'
const LAST_ACTIVITY_KEY = 'ttpb_last_activity'
const SESSION_TIMEOUT_MS = 30 * 60 * 1000

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const rememberState = localStorage.getItem(REMEMBER_KEY)
    const savedState = localStorage.getItem(AUTH_KEY)
    const savedActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY))
    const hasActiveSession = savedActivity && Date.now() - savedActivity < SESSION_TIMEOUT_MS

    if ((rememberState === 'true' || savedState === 'true') && (hasActiveSession || !savedActivity)) {
      setIsAuthenticated(true)
      localStorage.setItem(AUTH_KEY, 'true')
      if (!savedActivity) {
        localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()))
      }
    } else {
      setIsAuthenticated(false)
      localStorage.setItem(AUTH_KEY, 'false')
      localStorage.removeItem(REMEMBER_KEY)
      localStorage.removeItem(LAST_ACTIVITY_KEY)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, String(isAuthenticated))
    }

    if (!isAuthenticated && typeof window !== 'undefined') {
      localStorage.removeItem(REMEMBER_KEY)
      localStorage.removeItem(LAST_ACTIVITY_KEY)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated || typeof window === 'undefined') {
      return undefined
    }

    let lastRecordedActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY)) || Date.now()
    localStorage.setItem(LAST_ACTIVITY_KEY, String(lastRecordedActivity))

    const recordActivity = () => {
      const now = Date.now()

      if (now - lastRecordedActivity >= 60 * 1000) {
        lastRecordedActivity = now
        localStorage.setItem(LAST_ACTIVITY_KEY, String(now))
      }
    }

    const checkSessionTimeout = () => {
      const lastActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY))

      if (!lastActivity || Date.now() - lastActivity >= SESSION_TIMEOUT_MS) {
        setIsAuthenticated(false)
        localStorage.setItem(AUTH_KEY, 'false')
        localStorage.removeItem(REMEMBER_KEY)
        localStorage.removeItem(LAST_ACTIVITY_KEY)
      }
    }

    const activityEvents = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart']
    activityEvents.forEach((eventName) => window.addEventListener(eventName, recordActivity))
    const timeoutChecker = window.setInterval(checkSessionTimeout, 60 * 1000)

    return () => {
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, recordActivity))
      window.clearInterval(timeoutChecker)
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem(AUTH_KEY, 'true')
    localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.setItem(AUTH_KEY, 'false')
    localStorage.setItem(REMEMBER_KEY, 'false')
    localStorage.removeItem(LAST_ACTIVITY_KEY)
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminApp onLogout={handleLogout} /></ProtectedRoute>} />
      <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/dashboard/*" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App