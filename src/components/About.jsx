function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="about-content">
          <span className="section-tag">About TTPB</span>
          <h2>Building a stronger teaching profession in Tanzania</h2>
          <p>
            The Tanzania Teachers Professional Board is committed to regulating and
            supporting the teaching profession through quality standards, teacher
            registration, licensing, and continuous professional development.
          </p>
          <p>
            Our mission is to ensure that teachers are professionally qualified,
            accountable, and equipped to deliver excellent education outcomes for learners
            across the country.
          </p>

          <ul className="feature-list">
            <li>Transparent teacher registration and verification services</li>
            <li>Professional standards for licensing and renewal</li>
            <li>Continuous professional development for quality teaching</li>
          </ul>
        </div>

        <div className="about-panel" aria-label="TTPB values panel">
          <div className="panel-box">
            <strong>Professionalism</strong>
            <span>Ethical standards and accountable practice.</span>
          </div>
          <div className="panel-box">
            <strong>Excellence</strong>
            <span>Quality teaching and continuous improvement.</span>
          </div>
          <div className="panel-box">
            <strong>Integrity</strong>
            <span>Trust, transparency, and public confidence.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
