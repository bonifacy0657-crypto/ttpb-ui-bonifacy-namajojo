function PagePlaceholder({ title, description }) {
  const isInternshipWindowPage = title === 'Internship Window'

  return (
    <div className="placeholder-page">
      <div className="placeholder-box">
        {!isInternshipWindowPage && <span className="section-tag admin-tag">Admin Module</span>}

        {isInternshipWindowPage ? (
          <div className="internship-window-page">
            <div className="internship-window-header">
              <h1>{title}</h1>
            </div>

            <p className="internship-window-description">
              Manage internship application periods, selection stages, reporting and fees
            </p>

            <button type="button" className="btn btn-primary internship-window-button">
              <span className="button-plus">+</span>
              Add Internship Window
            </button>
          </div>
        ) : (
          <>
            <h1>{title}</h1>
            <p>{description}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default PagePlaceholder
