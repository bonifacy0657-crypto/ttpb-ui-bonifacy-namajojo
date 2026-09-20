import { useMemo, useState } from 'react'

const licenses = [
  { number: 'LIC-2026-0102', teacher: 'Joseph Mwangosi', registration: 'REG-2026-1198', type: 'Professional Teacher License', approvalDate: '2026-08-20', printingStatus: 'Ready for Print' },
  { number: 'LIC-2026-0108', teacher: 'Grace Mwakalebela', registration: 'REG-2026-1215', type: 'Renewal License', approvalDate: '2026-08-18', printingStatus: 'Printed' },
  { number: 'LIC-2026-0111', teacher: 'Asha Mshana', registration: 'REG-2026-1231', type: 'Professional Teacher License', approvalDate: '2026-08-15', printingStatus: 'Reprint Requested' },
  { number: 'LIC-2026-0116', teacher: 'Salim Juma', registration: 'REG-2026-1244', type: 'Temporary License', approvalDate: '2026-08-11', printingStatus: 'Ready for Print' },
]

function LicensePrintingPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [printingFilter, setPrintingFilter] = useState('All Printing Statuses')
  const [dateFilter, setDateFilter] = useState('All Dates')
  const [selectedLicense, setSelectedLicense] = useState(null)

  const summaryCards = [
    { label: 'Ready for Printing', value: licenses.filter((item) => item.printingStatus === 'Ready for Print').length, tone: 'blue' },
    { label: 'Printed', value: licenses.filter((item) => item.printingStatus === 'Printed').length, tone: 'green' },
    { label: 'Reprint Requests', value: licenses.filter((item) => item.printingStatus === 'Reprint Requested').length, tone: 'amber' },
  ]

  const filteredLicenses = useMemo(() => {
    return licenses.filter((item) => {
      const matchesSearch = `${item.number} ${item.teacher}`.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All Statuses' || item.type.includes(statusFilter)
      const matchesPrinting = printingFilter === 'All Printing Statuses' || item.printingStatus === printingFilter
      const matchesDate = dateFilter === 'All Dates' || item.approvalDate === dateFilter
      return matchesSearch && matchesPrinting && matchesDate && matchesStatus
    })
  }, [dateFilter, printingFilter, search, statusFilter])

  const handleAction = (actionType, item) => {
    if (actionType === 'Preview') {
      setSelectedLicense(item)
      return
    }

    if (window.confirm(`${actionType} this license?`)) {
      console.log(actionType, item.number)
    }
  }

  return (
    <div className="license-printing-page">
      <header className="license-header">
        <div>
          <p className="license-eyebrow">Printing Desk</p>
          <h1>License Printing</h1>
        </div>
      </header>

      <p className="license-subtitle">Generate, preview, and print approved professional teaching licenses.</p>

      <section className="license-summary-grid" aria-label="Printing summary cards">
        {summaryCards.map((card) => (
          <article key={card.label} className={`license-summary-card license-tone-${card.tone}`}>
            <span className="license-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="license-search-panel" aria-label="License printing filters">
        <div className="license-control-row">
          <label className="license-field">
            <span>Search</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by license number or teacher name"
            />
          </label>

          <label className="license-field">
            <span>License Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="All Statuses">All Statuses</option>
              <option value="Professional Teacher License">Professional Teacher License</option>
              <option value="Renewal License">Renewal License</option>
              <option value="Temporary License">Temporary License</option>
            </select>
          </label>

          <label className="license-field">
            <span>Printing Status</span>
            <select value={printingFilter} onChange={(event) => setPrintingFilter(event.target.value)}>
              <option value="All Printing Statuses">All Printing Statuses</option>
              <option value="Ready for Print">Ready for Print</option>
              <option value="Printed">Printed</option>
              <option value="Reprint Requested">Reprint Requested</option>
            </select>
          </label>

          <label className="license-field">
            <span>Date</span>
            <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
              <option value="All Dates">All Dates</option>
              <option value="2026-08-11">2026-08-11</option>
              <option value="2026-08-15">2026-08-15</option>
              <option value="2026-08-18">2026-08-18</option>
              <option value="2026-08-20">2026-08-20</option>
            </select>
          </label>
        </div>
      </section>

      <section className="license-table-panel" aria-label="License printing table">
        <div className="license-table-header">
          <h2>Approved Licenses</h2>
          <span>{filteredLicenses.length} records</span>
        </div>

        <div className="license-table-wrap">
          <table className="license-table">
            <thead>
              <tr>
                <th>License Number</th>
                <th>Teacher Name</th>
                <th>Registration Number</th>
                <th>License Type</th>
                <th>Approval Date</th>
                <th>Printing Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLicenses.map((item) => (
                <tr key={item.number}>
                  <td>{item.number}</td>
                  <td>{item.teacher}</td>
                  <td>{item.registration}</td>
                  <td>{item.type}</td>
                  <td>{item.approvalDate}</td>
                  <td>
                    <span className={`license-status-badge status-${item.printingStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.printingStatus}
                    </span>
                  </td>
                  <td>
                    <div className="license-action-stack">
                      <button type="button" className="btn btn-secondary license-mini-btn" onClick={() => handleAction('Preview', item)}>Preview</button>
                      <button type="button" className="btn btn-primary license-mini-btn" onClick={() => handleAction('Print', item)}>Print</button>
                      <button type="button" className="btn btn-secondary license-mini-btn" onClick={() => handleAction('Download', item)}>Download</button>
                      <button type="button" className="btn btn-secondary license-mini-btn" onClick={() => handleAction('Reprint', item)}>Reprint</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedLicense && (
        <div className="license-modal-backdrop" onClick={() => setSelectedLicense(null)}>
          <div className="license-modal preview-modal" role="dialog" aria-modal="true" aria-labelledby="license-preview-title" onClick={(event) => event.stopPropagation()}>
            <div className="license-modal-header">
              <div>
                <p className="license-eyebrow">License Preview</p>
                <h2 id="license-preview-title">{selectedLicense.number}</h2>
              </div>
              <button type="button" className="license-close-btn" aria-label="Close preview" onClick={() => setSelectedLicense(null)}>
                ×
              </button>
            </div>

            <div className="license-preview-card">
              <div className="license-preview-topbar">
                <strong>Tanzania Teachers Professional Board</strong>
                <span>Professional Teaching License</span>
              </div>

              <div className="license-preview-grid">
                <div><span>Teacher Name</span><strong>{selectedLicense.teacher}</strong></div>
                <div><span>Registration Number</span><strong>{selectedLicense.registration}</strong></div>
                <div><span>License Number</span><strong>{selectedLicense.number}</strong></div>
                <div><span>License Type</span><strong>{selectedLicense.type}</strong></div>
                <div><span>Issue Date</span><strong>{selectedLicense.approvalDate}</strong></div>
                <div><span>Expiry Date</span><strong>2031-08-20</strong></div>
              </div>

              <div className="license-preview-footer">
                <div>
                  <span>Authorized Signature</span>
                  <div className="signature-box">________________</div>
                </div>
                <div>
                  <span>QR Code</span>
                  <div className="qr-box">QR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LicensePrintingPage
