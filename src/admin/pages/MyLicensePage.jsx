function MyLicensePage() {
  const license = {
    licenseNumber: 'TTPB/LIC/2026/0048',
    licenseType: 'Professional Teacher License',
    issueDate: '2026-01-15',
    expiryDate: '2031-01-15',
    status: 'Active',
    teacherName: 'Grace Mwakalebela',
    registrationNumber: 'REG-2026-2145',
  }

  return (
    <div className="license-my-license-page">
      <header className="license-header">
        <div>
          <p className="license-eyebrow">Professional License</p>
          <h1>My License</h1>
        </div>
      </header>

      <p className="license-subtitle">View your professional teaching license and license status.</p>

      <section className="license-summary-panel" aria-label="License summary card">
        <div className="license-summary-header">
          <div>
            <span className="license-summary-label">License Number</span>
            <strong>{license.licenseNumber}</strong>
          </div>
          <span className={`license-status-badge status-${license.status.toLowerCase()}`}>{license.status}</span>
        </div>

        <div className="license-summary-grid compact">
          <article className="license-summary-card license-tone-blue">
            <span className="license-summary-label">License Type</span>
            <strong>{license.licenseType}</strong>
          </article>
          <article className="license-summary-card license-tone-green">
            <span className="license-summary-label">Issue Date</span>
            <strong>{license.issueDate}</strong>
          </article>
          <article className="license-summary-card license-tone-amber">
            <span className="license-summary-label">Expiry Date</span>
            <strong>{license.expiryDate}</strong>
          </article>
        </div>

        <div className="license-top-actions">
          <button type="button" className="btn btn-secondary license-action-btn">View License</button>
          <button type="button" className="btn btn-secondary license-action-btn">Download License</button>
          <button type="button" className="btn btn-primary license-action-btn">Renew License</button>
        </div>
      </section>

      <section className="license-info-panel" aria-label="License information">
        <div className="license-table-header">
          <h2>License Information</h2>
        </div>

        <div className="license-info-grid">
          <div className="license-info-item">
            <span>Teacher Name</span>
            <strong>{license.teacherName}</strong>
          </div>
          <div className="license-info-item">
            <span>Registration Number</span>
            <strong>{license.registrationNumber}</strong>
          </div>
          <div className="license-info-item">
            <span>License Number</span>
            <strong>{license.licenseNumber}</strong>
          </div>
          <div className="license-info-item">
            <span>License Type</span>
            <strong>{license.licenseType}</strong>
          </div>
          <div className="license-info-item">
            <span>Issue Date</span>
            <strong>{license.issueDate}</strong>
          </div>
          <div className="license-info-item">
            <span>Expiry Date</span>
            <strong>{license.expiryDate}</strong>
          </div>
          <div className="license-info-item full-width">
            <span>Current Status</span>
            <strong>{license.status}</strong>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyLicensePage
