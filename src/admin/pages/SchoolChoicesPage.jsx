import { useMemo, useState } from 'react'

const schools = [
  { id: 1, name: 'Kibaha Secondary School', code: 'KSS-201', region: 'Coast', district: 'Kibaha', level: 'Secondary', slots: 8, subject: 'Mathematics', availability: 'Available' },
  { id: 2, name: 'Mtwara Girls Secondary School', code: 'MGS-118', region: 'Southern', district: 'Mtwara', level: 'Secondary', slots: 0, subject: 'Biology', availability: 'Full' },
  { id: 3, name: 'Arusha Central Academy', code: 'ACA-412', region: 'Northern', district: 'Arusha', level: 'Secondary', slots: 5, subject: 'Physics', availability: 'Available' },
  { id: 4, name: 'Tanga Technical School', code: 'TTS-302', region: 'Northern', district: 'Tanga', level: 'Secondary', slots: 3, subject: 'Chemistry', availability: 'Limited' },
]

function SchoolChoicesPage() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All Regions')
  const [district, setDistrict] = useState('All Districts')
  const [level, setLevel] = useState('All Levels')
  const [subject, setSubject] = useState('All Subjects')
  const [availability, setAvailability] = useState('All Availability')

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch = school.name.toLowerCase().includes(search.toLowerCase())
      const matchesRegion = region === 'All Regions' || school.region === region
      const matchesDistrict = district === 'All Districts' || school.district === district
      const matchesLevel = level === 'All Levels' || school.level === level
      const matchesSubject = subject === 'All Subjects' || school.subject === subject
      const matchesAvailability = availability === 'All Availability' || school.availability === availability
      return matchesSearch && matchesRegion && matchesDistrict && matchesLevel && matchesSubject && matchesAvailability
    })
  }, [availability, district, level, region, search, subject])

  return (
    <div className="internship-module-page">
      <header className="internship-header">
        <div>
          <p className="internship-eyebrow">Placement Directory</p>
          <h1>School Choices</h1>
        </div>
      </header>

      <p className="internship-subtitle">View available schools for internship placement.</p>

      <section className="internship-panel">
        <div className="internship-panel-header">
          <h2>Available Schools</h2>
        </div>

        <div className="internship-filter-grid">
          <label className="internship-field">
            <span>Search by school name</span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by school name" />
          </label>

          <label className="internship-field">
            <span>Region</span>
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
              <option value="All Regions">All Regions</option>
              <option value="Coast">Coast</option>
              <option value="Southern">Southern</option>
              <option value="Northern">Northern</option>
            </select>
          </label>

          <label className="internship-field">
            <span>District</span>
            <select value={district} onChange={(event) => setDistrict(event.target.value)}>
              <option value="All Districts">All Districts</option>
              <option value="Kibaha">Kibaha</option>
              <option value="Mtwara">Mtwara</option>
              <option value="Arusha">Arusha</option>
              <option value="Tanga">Tanga</option>
            </select>
          </label>

          <label className="internship-field">
            <span>School Level</span>
            <select value={level} onChange={(event) => setLevel(event.target.value)}>
              <option value="All Levels">All Levels</option>
              <option value="Secondary">Secondary</option>
            </select>
          </label>

          <label className="internship-field">
            <span>Subject/Teaching Area</span>
            <select value={subject} onChange={(event) => setSubject(event.target.value)}>
              <option value="All Subjects">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </label>

          <label className="internship-field">
            <span>Availability</span>
            <select value={availability} onChange={(event) => setAvailability(event.target.value)}>
              <option value="All Availability">All Availability</option>
              <option value="Available">Available</option>
              <option value="Limited">Limited</option>
              <option value="Full">Full</option>
            </select>
          </label>
        </div>

        <div className="internship-school-grid">
          {filteredSchools.map((school) => (
            <article key={school.id} className="internship-school-card">
              <div className="internship-school-header">
                <div>
                  <strong>{school.name}</strong>
                  <span>{school.code}</span>
                </div>
                <span className={`internship-badge status-${school.availability.toLowerCase()}`}>{school.availability}</span>
              </div>

              <div className="internship-school-meta">
                <div><span>Region</span><strong>{school.region}</strong></div>
                <div><span>District</span><strong>{school.district}</strong></div>
                <div><span>School Level</span><strong>{school.level}</strong></div>
                <div><span>Available Slots</span><strong>{school.slots}</strong></div>
                <div className="full-width"><span>Required Subjects</span><strong>{school.subject}</strong></div>
              </div>

              <button type="button" className="btn btn-primary internship-action-btn" disabled={school.slots === 0}>
                {school.slots === 0 ? 'No Slots Available' : 'Select School'}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default SchoolChoicesPage
