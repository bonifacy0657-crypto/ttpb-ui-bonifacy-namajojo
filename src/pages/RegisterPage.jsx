import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('details')
  const [contact, setContact] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const sendOtp = (event) => {
    event.preventDefault()
    const newOtp = String(Math.floor(100000 + Math.random() * 900000))

    setGeneratedOtp(newOtp)
    setStep('otp')
    setOtpError('')
  }

  const verifyOtp = (event) => {
    event.preventDefault()

    if (otp !== generatedOtp) {
      setOtpError('The OTP is incorrect. Please try again.')
      return
    }

    setIsVerified(true)
  }

  const resendOtp = () => {
    setGeneratedOtp(String(Math.floor(100000 + Math.random() * 900000)))
    setOtp('')
    setOtpError('')
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-header">
            <span className="section-tag">Join TTPB</span>
            <h1>{isVerified ? 'Registration complete' : step === 'otp' ? 'Verify your account' : 'Create your account'}</h1>
            <p>
              {isVerified
                ? 'Your account has been verified successfully.'
                : step === 'otp'
                  ? `Enter the 6-digit OTP sent to ${contact}.`
                  : 'Register as a teacher and begin your professional journey with TTPB.'}
            </p>
          </div>

          {isVerified ? (
            <button type="button" className="btn btn-primary large auth-btn" onClick={() => navigate('/login', { replace: true })}>
              Continue to Login
            </button>
          ) : step === 'otp' ? (
            <form className="auth-form" onSubmit={verifyOtp}>
              <div className="otp-demo-note" role="status">
                Demo OTP: <strong>{generatedOtp}</strong>
              </div>

              <label className="field-group">
                <span>One-Time Password</span>
                <input
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  placeholder="000000"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
                  required
                  autoFocus
                />
              </label>

              {otpError && <p className="form-error" role="alert">{otpError}</p>}

              <button type="submit" className="btn btn-primary large auth-btn">
                Verify OTP
              </button>

              <button type="button" className="text-link-button otp-resend" onClick={resendOtp}>
                Resend OTP
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={sendOtp}>
              <div className="two-column-fields">
                <label className="field-group">
                  <span>Full Name</span>
                  <input type="text" placeholder="John Mushi" required />
                </label>

                <label className="field-group">
                  <span>Phone Number</span>
                  <input type="tel" placeholder="+255 712 345 678" required onChange={(event) => setContact(event.target.value)} />
                </label>
              </div>

              <label className="field-group">
                <span>Email Address</span>
                <input type="email" placeholder="name@example.com" required />
              </label>

              <label className="field-group">
                <span>Teacher ID / Registration Number</span>
                <input type="text" placeholder="TTPB-0001" required />
              </label>

              <div className="two-column-fields">
                <label className="field-group">
                  <span>Password</span>
                  <input type="password" placeholder="Create password" required />
                </label>

                <label className="field-group">
                  <span>Confirm Password</span>
                  <input type="password" placeholder="Repeat password" required />
                </label>
              </div>

              <button type="submit" className="btn btn-primary large auth-btn">
                Send OTP & Continue
              </button>
            </form>
          )}

          <p className="auth-footer">
            Already registered?{' '}
            <button type="button" className="text-link-button" onClick={() => navigate('/login', { replace: true })}>
              Login here
            </button>
          </p>

          <button type="button" className="back-link-button" onClick={() => navigate('/', { replace: true })}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
