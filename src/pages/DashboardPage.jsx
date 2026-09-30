import { dashboardMetrics, procedures, safetyAlerts, reports } from '../data/platformData'

function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Tablero operativo</span>
          <h1>Supervisión minera en tiempo real</h1>
        </div>
        <button className="primary-btn">Sincronizar procedimientos</button>
      </section>

      <section className="metrics-grid">
        {dashboardMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small className={metric.tone}>{metric.trend}</small>
          </article>
        ))}
      </section>

      <section className="split-grid">
        <article className="content-card">
          <div className="card-header">
            <h2>Procedimientos vigentes</h2>
            <span className="tag success">Actualizados</span>
          </div>
          <div className="list-stack">
            {procedures.slice(0, 3).map((item) => (
              <div key={item.title} className="row-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.area}</p>
                </div>
                <span className="mini-badge">{item.version}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="content-card">
          <div className="card-header">
            <h2>Alertas de seguridad</h2>
            <span className="tag warning">Revisión</span>
          </div>
          <div className="alert-stack">
            {safetyAlerts.map((alert) => (
              <div key={alert.title} className="alert-item">
                <span className={`severity ${alert.impact.toLowerCase()}`}>{alert.impact}</span>
                <div>
                  <strong>{alert.title}</strong>
                  <p>{alert.location}</p>
                </div>
                <small>{alert.owner}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="content-card">
        <div className="card-header">
          <h2>Indicadores clave</h2>
          <span className="tag neutral">Reporte semanal</span>
        </div>
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.title} className="report-box">
              <span>{report.title}</span>
              <strong>{report.value}</strong>
              <small>{report.note}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
