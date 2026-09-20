function StatCard({ title, value, change, trend, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-card-header">
        <div className="stat-icon" aria-hidden="true">{icon}</div>
        <span className={`trend ${trend}`}>{change}</span>
      </div>

      <div className="stat-card-body">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </article>
  )
}

export default StatCard
