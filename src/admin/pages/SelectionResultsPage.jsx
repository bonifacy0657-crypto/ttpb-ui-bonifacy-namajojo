function SelectionResultsPage() {
  const selectionStatus = 'Selected'
  const placementDetails = {
    assignedSchool: 'Kibaha Secondary School',
    region: 'Coast',
    district: 'Kibaha',
    schoolLevel: 'Secondary',
    placementDate: '2026-10-01',
  }

  const selectionState = selectionStatus === 'Selected'

  return (
    <div className="internship-module-page">
      <header className="internship-header">
        <div>
          <p className="internship-eyebrow">Placement Outcome</p>
          <h1>Selection Results</h1>
        </div>
      </header>

      <section className="internship-panel">
        <div className="internship-panel-header">
          <h2>Selection Summary</h2>
        </div>

        <div className="internship-result-card">
          <div className="internship-summary-row">
            <span>Selection Status</span>
            <strong>{selectionStatus}</strong>
          </div>
          <div className="internship-summary-row">
            <span>Assigned School</span>
            <strong>{placementDetails.assignedSchool}</strong>
          </div>
          <div className="internship-summary-row">
            <span>Region</span>
            <strong>{placementDetails.region}</strong>
          </div>
          <div className="internship-summary-row">
            <span>District</span>
            <strong>{placementDetails.district}</strong>
          </div>
          <div className="internship-summary-row">
            <span>School Level</span>
            <strong>{placementDetails.schoolLevel}</strong>
          </div>
          <div className="internship-summary-row">
            <span>Placement Date</span>
            <strong>{placementDetails.placementDate}</strong>
          </div>
        </div>

        {selectionState ? (
          <div className="internship-placement-box">
            <h3>Internship Placement Details</h3>
            <div className="internship-placement-grid">
              <div><span>School</span><strong>{placementDetails.assignedSchool}</strong></div>
              <div><span>Region</span><strong>{placementDetails.region}</strong></div>
              <div><span>District</span><strong>{placementDetails.district}</strong></div>
              <div><span>Level</span><strong>{placementDetails.schoolLevel}</strong></div>
            </div>

            <div className="internship-top-actions">
              <button type="button" className="btn btn-primary internship-action-btn">View Placement Details</button>
              <button type="button" className="btn btn-secondary internship-action-btn">Print Summary</button>
            </div>
          </div>
        ) : (
          <div className="internship-alert alert-warning">
            You were not selected in the current placement round. Please check the next internship cycle or update your school choices.
          </div>
        )}
      </section>
    </div>
  )
}

export default SelectionResultsPage
