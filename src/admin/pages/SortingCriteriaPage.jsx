const criteria = [
  { criterion: 'Applicant Eligibility', description: 'Applicants must meet the required teaching qualification and internship eligibility standards.', priority: 'High', status: 'Active' },
  { criterion: 'Academic Qualifications', description: 'Academic credentials and training background are considered for placement priority.', priority: 'High', status: 'Active' },
  { criterion: 'Teaching Subject/Teaching Area', description: 'Subject specialization is matched with school needs and available teaching roles.', priority: 'High', status: 'Active' },
  { criterion: 'Preferred School Choices', description: 'Applicants are ranked according to their prioritized school preferences.', priority: 'High', status: 'Active' },
  { criterion: 'Region and District Preference', description: 'Regional and district preferences are used to align placement with applicant interest.', priority: 'Medium', status: 'Active' },
  { criterion: 'Available School Capacity', description: 'School capacity and vacancies influence final assignment decisions.', priority: 'High', status: 'Active' },
  { criterion: 'Internship Requirements', description: 'Applicants must satisfy placement requirements such as subject suitability and school readiness.', priority: 'High', status: 'Active' },
  { criterion: 'Application Completion Status', description: 'Incomplete applications may be deferred until all required documents are submitted.', priority: 'High', status: 'Active' },
  { criterion: 'Application Submission Date', description: 'Submission dates help organize applicants in the queue when all other criteria are equal.', priority: 'Medium', status: 'Active' },
]

function SortingCriteriaPage() {
  return (
    <div className="internship-module-page">
      <header className="internship-header">
        <div>
          <p className="internship-eyebrow">Placement Review</p>
          <h1>Sorting Criteria</h1>
        </div>
      </header>

      <p className="internship-subtitle">
        Sorting criteria are used to organize eligible applicants before internship placement.
      </p>

      <section className="internship-panel">
        <div className="internship-panel-header">
          <h2>Criteria Used for Placement Prioritization</h2>
        </div>

        <div className="internship-table-wrap">
          <table className="internship-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((item) => (
                <tr key={item.criterion}>
                  <td>{item.criterion}</td>
                  <td>{item.description}</td>
                  <td>{item.priority}</td>
                  <td><span className="internship-badge status-active">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default SortingCriteriaPage
