import { useState } from 'react'

const initialChoices = [
  { id: 1, schoolName: 'Kibaha Secondary School', schoolCode: 'KSS-201', region: 'Coast', district: 'Kibaha', schoolLevel: 'Secondary', subject: 'Mathematics', priority: 'First Choice' },
  { id: 2, schoolName: 'Mtwara Girls Secondary School', schoolCode: 'MGS-118', region: 'Southern', district: 'Mtwara', schoolLevel: 'Secondary', subject: 'Biology', priority: 'Second Choice' },
]

function MySchoolChoicesPage() {
  const [choices, setChoices] = useState(initialChoices)
  const [saved, setSaved] = useState(false)

  const handleAddSchool = () => {
    setChoices((current) => [
      ...current,
      { id: Date.now(), schoolName: 'New School', schoolCode: 'NEW-001', region: 'Tanga', district: 'Muheza', schoolLevel: 'Secondary', subject: 'Physics', priority: `${current.length + 1}th Choice` },
    ])
  }

  const handleRemove = (id) => {
    setChoices((current) => current.filter((choice) => choice.id !== id))
  }

  const moveChoice = (index, direction) => {
    setChoices((current) => {
      const next = [...current]
      const targetIndex = index + direction
      if (targetIndex < 0 || targetIndex >= next.length) return current
      ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
      return next.map((item, idx) => ({ ...item, priority: idx === 0 ? 'First Choice' : idx === 1 ? 'Second Choice' : idx === 2 ? 'Third Choice' : `${idx + 1}th Choice` }))
    })
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="internship-module-page">
      <header className="internship-header">
        <div>
          <p className="internship-eyebrow">School Placement</p>
          <h1>My School Choices</h1>
        </div>
      </header>

      <p className="internship-subtitle">
        Applicants can select and manage their preferred schools for internship placement.
      </p>

      <div className="internship-top-actions">
        <button type="button" className="btn btn-primary internship-action-btn" onClick={handleAddSchool}>Add School Choice</button>
        <button type="button" className="btn btn-secondary internship-action-btn" onClick={handleSave}>Save Choices</button>
      </div>

      {saved && <div className="internship-alert alert-success">Your school choices were saved successfully.</div>}

      <section className="internship-panel">
        <div className="internship-panel-header">
          <h2>Preferred Schools</h2>
        </div>

        <div className="internship-choice-list">
          {choices.map((choice, index) => (
            <div className="internship-choice-card" key={choice.id}>
              <div className="internship-choice-top">
                <strong>{choice.priority}</strong>
                <button type="button" className="btn btn-danger internship-inline-btn" onClick={() => handleRemove(choice.id)}>Remove</button>
              </div>

              <div className="internship-choice-grid">
                <div><span>School Name</span><strong>{choice.schoolName}</strong></div>
                <div><span>School Code</span><strong>{choice.schoolCode}</strong></div>
                <div><span>Region</span><strong>{choice.region}</strong></div>
                <div><span>District</span><strong>{choice.district}</strong></div>
                <div><span>School Level</span><strong>{choice.schoolLevel}</strong></div>
                <div><span>Subject/Teaching Area</span><strong>{choice.subject}</strong></div>
              </div>

              <div className="internship-choice-actions">
                <button type="button" className="btn btn-secondary internship-inline-btn" disabled={index === 0} onClick={() => moveChoice(index, -1)}>Move Up</button>
                <button type="button" className="btn btn-secondary internship-inline-btn" disabled={index === choices.length - 1} onClick={() => moveChoice(index, 1)}>Move Down</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MySchoolChoicesPage
