import { useMemo, useState } from 'react'

const summaryCards = [
  { label: 'Total Revenue', value: 'TSh 12.4M', tone: 'blue' },
  { label: 'Paid', value: 'TSh 9.8M', tone: 'green' },
  { label: 'Pending', value: 'TSh 2.1M', tone: 'amber' },
  { label: 'Overdue', value: 'TSh 0.5M', tone: 'red' },
]

const invoiceRows = [
  {
    id: 1,
    invoiceNumber: 'INV-2248',
    teacher: 'Grace Mwakalebela',
    type: 'Registration Fee',
    amount: 'TSh 250,000',
    dueDate: '2026-09-18',
    status: 'Paid',
  },
  {
    id: 2,
    invoiceNumber: 'INV-2251',
    teacher: 'Asha Mshana',
    type: 'Licensing Fee',
    amount: 'TSh 180,000',
    dueDate: '2026-09-22',
    status: 'Pending',
  },
  {
    id: 3,
    invoiceNumber: 'INV-2257',
    teacher: 'Joseph Mwangosi',
    type: 'CPD Fee',
    amount: 'TSh 120,000',
    dueDate: '2026-09-28',
    status: 'Paid',
  },
  {
    id: 4,
    invoiceNumber: 'INV-2260',
    teacher: 'Salim Juma',
    type: 'Registration Fee',
    amount: 'TSh 320,000',
    dueDate: '2026-10-02',
    status: 'Overdue',
  },
]

const paymentTypes = ['Registration Fee', 'Licensing Fee', 'CPD Fee', 'Renewal Fee', 'Other']
const statusOptions = ['All', 'Paid', 'Pending', 'Overdue']

const emptyForm = {
  invoiceNumber: '',
  teacherName: '',
  paymentType: '',
  amount: '',
  dueDate: '',
  status: 'Pending',
  notes: '',
}

function PaymentManagementPage() {
  const [invoices, setInvoices] = useState(invoiceRows)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('date-desc')
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false)
  const [formData, setFormData] = useState(emptyForm)

  const filteredInvoices = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    const nextInvoices = invoices.filter((invoice) => {
      const matchesSearch = !term || invoice.teacher.toLowerCase().includes(term) || invoice.invoiceNumber.toLowerCase().includes(term)
      const matchesType = selectedType === 'All' || invoice.type === selectedType
      const matchesStatus = selectedStatus === 'All' || invoice.status === selectedStatus

      return matchesSearch && matchesType && matchesStatus
    })

    return [...nextInvoices].sort((a, b) => {
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)

      return sortBy === 'date-asc' ? dateA - dateB : dateB - dateA
    })
  }, [invoices, searchTerm, selectedType, selectedStatus, sortBy])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleCreateInvoice = (event) => {
    event.preventDefault()

    if (!formData.invoiceNumber || !formData.teacherName) {
      return
    }

    const newInvoice = {
      id: Date.now(),
      invoiceNumber: formData.invoiceNumber,
      teacher: formData.teacherName,
      type: formData.paymentType || 'Other',
      amount: formData.amount ? `TSh ${Number(formData.amount).toLocaleString()}` : 'TSh 0',
      dueDate: formData.dueDate || new Date().toISOString().slice(0, 10),
      status: formData.status || 'Pending',
    }

    setInvoices((current) => [newInvoice, ...current])
    setFormData(emptyForm)
    setIsNewInvoiceOpen(false)
  }

  return (
    <div className="payment-management-page">
      <header className="payment-management-header">
        <div>
          <span className="section-tag admin-tag">Payment Management</span>
          <h1>Payment Management</h1>
        </div>
      </header>

      <p className="payment-management-subtitle">Manage fees, invoices, collections, and payment records.</p>

      <div className="payment-management-top-actions">
        <button type="button" className="btn btn-secondary payment-management-action-btn">
          <span aria-hidden="true">⇩</span>
          <span>Export</span>
        </button>

        <button type="button" className="btn btn-primary payment-management-action-btn" onClick={() => setIsNewInvoiceOpen(true)}>
          <span aria-hidden="true">＋</span>
          <span>New Invoice</span>
        </button>
      </div>

      <div className="payment-management-summary-grid">
        {summaryCards.map((card) => (
          <article key={card.label} className={`payment-management-summary-card payment-tone-${card.tone}`}>
            <span className="payment-management-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>

      <div className="payment-management-search-panel">
        <div className="payment-management-control-row">
          <label className="payment-management-field">
            <span>Search</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by invoice or teacher"
            />
          </label>

          <label className="payment-management-field">
            <span>Payment Type</span>
            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              <option value="All">All</option>
              {paymentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

          <label className="payment-management-field">
            <span>Status</span>
            <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option === 'All' ? 'All Statuses' : option}</option>
              ))}
            </select>
          </label>

          <label className="payment-management-field">
            <span>Sort By Date</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="date-desc">Newest first</option>
              <option value="date-asc">Oldest first</option>
            </select>
          </label>
        </div>
      </div>

      <section className="payment-management-table-panel" aria-label="Payment records table">
        <div className="payment-management-table-header">
          <h2>Invoices & Payments</h2>
          <span>{filteredInvoices.length} records</span>
        </div>

        <div className="payment-management-table-wrap">
          <table className="payment-management-table">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Teacher Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.teacher}</td>
                  <td>{invoice.type}</td>
                  <td>{invoice.amount}</td>
                  <td>{new Date(invoice.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <span className={`payment-management-status-badge status-${invoice.status.toLowerCase()}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <div className="payment-management-actions">
                      <button type="button" className="payment-management-action-icon action-view" aria-label={`View ${invoice.invoiceNumber}`}>
                        👁️
                      </button>
                      <button type="button" className="payment-management-action-icon action-download" aria-label={`Download ${invoice.invoiceNumber}`}>
                        ⬇️
                      </button>
                      <button type="button" className="payment-management-action-icon action-edit" aria-label={`Edit ${invoice.invoiceNumber}`}>
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isNewInvoiceOpen && (
        <div className="payment-management-modal-backdrop" onClick={() => setIsNewInvoiceOpen(false)}>
          <div className="payment-management-modal" role="dialog" aria-modal="true" aria-labelledby="new-invoice-title" onClick={(event) => event.stopPropagation()}>
            <div className="payment-management-modal-header">
              <div>
                <span className="section-tag admin-tag">Invoice</span>
                <h2 id="new-invoice-title">New Invoice</h2>
              </div>
              <button type="button" className="payment-management-close-btn" aria-label="Close invoice form" onClick={() => setIsNewInvoiceOpen(false)}>
                ✕
              </button>
            </div>

            <form className="payment-management-form" onSubmit={handleCreateInvoice}>
              <div className="payment-management-form-grid">
                <label className="payment-management-field">
                  <span>Invoice Number</span>
                  <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} placeholder="INV-" />
                </label>

                <label className="payment-management-field">
                  <span>Teacher Name</span>
                  <input type="text" name="teacherName" value={formData.teacherName} onChange={handleChange} placeholder="Enter teacher name" />
                </label>

                <label className="payment-management-field">
                  <span>Payment Type</span>
                  <select name="paymentType" value={formData.paymentType} onChange={handleChange}>
                    <option value="">Select type</option>
                    {paymentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>

                <label className="payment-management-field">
                  <span>Amount (TSh)</span>
                  <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="250000" />
                </label>

                <label className="payment-management-field">
                  <span>Due Date</span>
                  <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
                </label>

                <label className="payment-management-field">
                  <span>Status</span>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </label>

                <label className="payment-management-field payment-management-notes-field">
                  <span>Notes</span>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Add notes or payment instructions" />
                </label>
              </div>

              <div className="payment-management-form-actions">
                <button type="submit" className="btn btn-primary payment-management-form-btn">
                  <span aria-hidden="true">✓</span>
                  <span>Create Invoice</span>
                </button>

                <button type="button" className="btn btn-secondary payment-management-form-btn" onClick={() => setIsNewInvoiceOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentManagementPage
