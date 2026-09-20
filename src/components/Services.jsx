const serviceItems = [
  {
    title: 'Teacher Registration',
    description:
      'Guide new teachers through registration, credential review, and approval processes.',
  },
  {
    title: 'Teacher Licensing',
    description:
      'Support qualified educators with licensing requirements and compliance standards.',
  },
  {
    title: 'CPD / Professional Development',
    description:
      'Promote ongoing learning, teaching excellence, and professional growth opportunities.',
  },
  {
    title: 'Teaching Under Supervision',
    description:
      'Provide supported learning and mentorship for newly qualified teachers to build confidence and professional practice.',
  },
  {
    title: 'User Management',
    description:
      'Manage member profiles, role access, and account updates for a smooth and secure user experience.',
  },
  {
    title: 'Payment Management',
    description:
      'Track fees, receipts, and payment follow-up to ensure transparent and efficient transactions.',
  },
  {
    title: 'License Renewal',
    description:
      'Assist licensed teachers with timely renewals and updated professional records.',
  },
  {
    title: 'Good Standing',
    description:
      'Verify eligibility and maintain a professional record that reflects accountability.',
  },
  {
    title: 'Teacher Verification',
    description:
      'Confirm teacher status, credentials, and registration details for institutions and employers.',
  },
]

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading center">
          <span className="section-tag">Our Services</span>
          <h2>Professional support for every stage of a teacher's career</h2>
        </div>

        <div className="services-grid">
          {serviceItems.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon" aria-hidden="true">
                {service.title.charAt(0)}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
