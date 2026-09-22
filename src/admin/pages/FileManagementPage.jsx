import { useMemo, useState } from 'react'

const summaryCards = [
  { label: 'Total Files', value: 12 },
  { label: 'Verified Files', value: 8 },
  { label: 'Pending Verification', value: 3 },
  { label: 'Rejected Files', value: 1 },
]

const documentTypeOptions = [
  'Academic Certificate',
  'Professional Certificate',
  'Identity Document',
  'Employment Letter',
  'Teaching License',
  'Training / CPD Certificate',
  'Other',
]

const initialFiles = [
  {
    id: 1,
    name: 'Bachelor Certificate.pdf',
    type: 'Academic Certificate',
    uploadDate: '2026-09-15',
    status: 'Verified',
  },
  {
    id: 2,
    name: 'Employment Letter.pdf',
    type: 'Employment Letter',
    uploadDate: '2026-09-12',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'CPD Certificate.pdf',
    type: 'Training / CPD Certificate',
    uploadDate: '2026-09-10',
    status: 'Verified',
  },
]

const initialUploadForm = {
  documentName: '',
  documentType: '',
  description: '',
  uploadFile: '',
  uploadDate: '',
}

const statusOptions = ['All', 'Verified', 'Pending', 'Rejected']

function FileManagementPage() {
  const [files, setFiles] = useState(initialFiles)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState(initialUploadForm)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDocumentType, setSelectedDocumentType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('date-desc')

  const filteredFiles = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    const nextFiles = files.filter((file) => {
      const matchesSearch = !normalizedSearch || file.name.toLowerCase().includes(normalizedSearch)
      const matchesType = selectedDocumentType === 'All' || file.type === selectedDocumentType
      const matchesStatus = selectedStatus === 'All' || file.status === selectedStatus

      return matchesSearch && matchesType && matchesStatus
    })

    return [...nextFiles].sort((a, b) => {
      const dateA = new Date(a.uploadDate)
      const dateB = new Date(b.uploadDate)

      if (sortBy === 'date-asc') {
        return dateA - dateB
      }

      return dateB - dateA
    })
  }, [files, searchTerm, selectedDocumentType, selectedStatus, sortBy])

  const handleUploadChange = (event) => {
    const { name, value } = event.target
    setUploadForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleUploadSubmit = (event) => {
    event.preventDefault()

    const trimmedName = uploadForm.documentName.trim()
    if (!trimmedName) {
      return
    }

    const newFile = {
      id: Date.now(),
      name: trimmedName || 'New Document.pdf',
      type: uploadForm.documentType || 'Other',
      uploadDate: uploadForm.uploadDate || new Date().toISOString().slice(0, 10),
      status: 'Pending',
    }

    setFiles((current) => [newFile, ...current])
    setUploadForm(initialUploadForm)
    setIsUploadOpen(false)
  }

  const handleDelete = (id) => {
    setFiles((current) => current.filter((file) => file.id !== id))
  }

  return (
    <div className="file-management-page">
      <header className="file-management-header">
        <div>
          <span className="section-tag admin-tag">File Management</span>
          <h1>File Management</h1>
        </div>
      </header>

      <p className="file-management-subtitle">Manage and organize your professional documents.</p>

      <div className="file-management-summary-grid">
        {summaryCards.map((card) => (
          <article key={card.label} className="file-management-summary-card">
            <span className="file-management-summary-label">{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>

      <div className="file-management-toolbar">
        <button type="button" className="btn btn-primary file-management-upload-button" onClick={() => setIsUploadOpen(true)}>
          <span className="file-management-upload-icon" aria-hidden="true">＋</span>
          <span>Upload New File</span>
        </button>
      </div>

      <div className="file-management-search-panel">
        <div className="file-management-control-row">
          <label className="file-management-field file-management-search-field">
            <span>Search</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by file name"
            />
          </label>

          <label className="file-management-field">
            <span>Document Type</span>
            <select value={selectedDocumentType} onChange={(event) => setSelectedDocumentType(event.target.value)}>
              <option value="All">All</option>
              {documentTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="file-management-field">
            <span>Status</span>
            <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option === 'All' ? 'All Statuses' : option}</option>
              ))}
            </select>
          </label>

          <label className="file-management-field">
            <span>Sort by Date</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="date-desc">Newest first</option>
              <option value="date-asc">Oldest first</option>
            </select>
          </label>
        </div>
      </div>

      <section className="file-management-table-panel" aria-label="Files list table">
        <div className="file-management-table-header">
          <h2>Uploaded Documents</h2>
          <span>{filteredFiles.length} files</span>
        </div>

        <div className="file-management-table-wrap">
          <table className="file-management-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Document Type</th>
                <th>Upload Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id}>
                  <td data-label="File Name">{file.name}</td>
                  <td data-label="Document Type">{file.type}</td>
                  <td data-label="Upload Date">{new Date(file.uploadDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td data-label="Status">
                    <span className={`file-management-status-badge status-${file.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {file.status}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="file-management-actions">
                      <button type="button" className="file-management-action-btn action-view" aria-label={`View ${file.name}`}>
                        👁️
                      </button>
                      <button type="button" className="file-management-action-btn action-download" aria-label={`Download ${file.name}`}>
                        ⬇️
                      </button>
                      <button type="button" className="file-management-action-btn action-edit" aria-label={`Edit ${file.name}`}>
                        ✏️
                      </button>
                      <button type="button" className="file-management-action-btn action-delete" aria-label={`Delete ${file.name}`} onClick={() => handleDelete(file.id)}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isUploadOpen && (
        <div className="file-management-upload-backdrop" onClick={() => setIsUploadOpen(false)}>
          <div className="file-management-upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-file-title" onClick={(event) => event.stopPropagation()}>
            <div className="file-management-upload-header">
              <div>
                <span className="section-tag admin-tag">Upload</span>
                <h2 id="upload-file-title">Upload New File</h2>
              </div>
              <button type="button" className="file-management-close-btn" aria-label="Close upload form" onClick={() => setIsUploadOpen(false)}>
                ✕
              </button>
            </div>

            <form className="file-management-upload-form" onSubmit={handleUploadSubmit}>
              <div className="file-management-upload-grid">
                <label className="teacher-form-field">
                  <span>Document Name</span>
                  <input type="text" name="documentName" value={uploadForm.documentName} onChange={handleUploadChange} placeholder="Enter document name" />
                </label>

                <label className="teacher-form-field">
                  <span>Document Type</span>
                  <select name="documentType" value={uploadForm.documentType} onChange={handleUploadChange}>
                    <option value="">Select type</option>
                    {documentTypeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="teacher-form-field" style={{ gridColumn: '1 / -1' }}>
                  <span>Description</span>
                  <textarea name="description" value={uploadForm.description} onChange={handleUploadChange} placeholder="Briefly describe the document" />
                </label>

                <label className="teacher-form-field">
                  <span>Upload File</span>
                  <input type="file" name="uploadFile" value={uploadForm.uploadFile} onChange={handleUploadChange} />
                </label>

                <label className="teacher-form-field">
                  <span>Upload Date</span>
                  <input type="date" name="uploadDate" value={uploadForm.uploadDate} onChange={handleUploadChange} />
                </label>
              </div>

              <div className="file-management-upload-actions">
                <button type="submit" className="btn btn-primary file-management-upload-submit-btn">
                  <span aria-hidden="true">✓</span>
                  <span>Save File</span>
                </button>

                <button type="button" className="btn btn-secondary file-management-upload-submit-btn" onClick={() => setIsUploadOpen(false)}>
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

export default FileManagementPage
