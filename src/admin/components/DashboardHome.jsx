import StatCard from './StatCard'
import { stats, registrationData, applicationStatus, paymentSummary, recentApplications, recentPayments, notifications } from '../data/dashboardData'

function DashboardHome() {
  const maxRegistrationValue = Math.max(...registrationData.map((item) => item.value))
  const donutGradient = applicationStatus
    .map((item, index) => {
      const previous = applicationStatus
        .slice(0, index)
        .reduce((total, current) => total + current.value, 0)
      return `${item.color} ${previous}% ${previous + item.value}%`
    })
    .join(', ')

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div className="header-banner">
          <h1>Welcome, Boniface Namajojo</h1>
          <p className="header-subtitle">Tanzania Teachers Proffessional Board Management System</p>
        </div>
        <button type="button" className="btn btn-primary">Generate Report</button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-header">
            <h2>Teacher Registration Statistics</h2>
            <span>2026</span>
          </div>

          <div className="bar-chart" aria-label="Teacher registration chart">
            {registrationData.map((item) => (
              <div key={item.month} className="bar-group">
                <div
                  className="bar"
                  style={{ height: `${(item.value / maxRegistrationValue) * 100}%` }}
                  title={`${item.month}: ${item.value}`}
                />
                <span>{item.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel chart-panel">
          <div className="panel-header">
            <h2>Application Status</h2>
            <span>Current</span>
          </div>

          <div className="donut-wrap">
            <div
              className="donut-chart"
              aria-label="Application status chart"
              style={{ background: `conic-gradient(${donutGradient})` }}
            >
              <div className="donut-center">
                <strong>58%</strong>
                <span>Approved</span>
              </div>
            </div>

            <ul className="legend-list">
              {applicationStatus.map((item) => (
                <li key={item.label}>
                  <span className="legend-dot" style={{ background: item.color }} />
                  {item.label} <strong>{item.value}%</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel chart-panel payment-panel">
          <div className="panel-header">
            <h2>Payment Statistics</h2>
            <span>Monthly</span>
          </div>

          <div className="progress-list">
            {paymentSummary.map((item) => (
              <div className="progress-row" key={item.label}>
                <div className="progress-label">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${item.value}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel table-panel">
          <div className="panel-header">
            <h2>Recent Applications</h2>
            <button type="button" className="text-link-button">View all</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Application Number</th>
                  <th>Teacher Name</th>
                  <th>Application Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((row) => (
                  <tr key={row.number}>
                    <td>{row.number}</td>
                    <td>{row.teacher}</td>
                    <td>{row.type}</td>
                    <td>{row.date}</td>
                    <td>
                      <span className={row.statusClass}>{row.status}</span>
                    </td>
                    <td>
                      <button type="button" className="table-action">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel payments-panel">
          <div className="panel-header">
            <h2>Recent Payments</h2>
            <button type="button" className="text-link-button">View report</button>
          </div>

          <div className="payment-list">
            {recentPayments.map((payment) => (
              <div key={payment.ref} className="payment-item">
                <div>
                  <strong>{payment.teacher}</strong>
                  <span>{payment.ref}</span>
                </div>
                <div>
                  <strong>{payment.amount}</strong>
                  <span>{payment.date}</span>
                </div>
                <span className={`payment-status ${payment.status === 'Paid' ? 'paid' : 'pending'}`}>
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel notification-panel">
          <div className="panel-header">
            <h2>Notifications</h2>
            <span className="pill">Today</span>
          </div>

          <ul className="notification-list">
            {notifications.map((item) => (
              <li key={item}>
                <span className="dot" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default DashboardHome
