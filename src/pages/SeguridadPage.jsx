import { safetyAlerts } from '../data/platformData'

function SeguridadPage() {
  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Seguridad industrial</span>
          <h1>Control de riesgos y permisos</h1>
        </div>
        <button className="primary-btn">Emitir permiso</button>
      </section>

      <div className="split-grid">
        <article className="content-card">
          <div className="card-header">
            <h2>Riesgos activos</h2>
            <span className="tag warning">Monitoreo</span>
          </div>
          <div className="list-stack">
            {safetyAlerts.map((alert) => (
              <div key={alert.title} className="alert-item">
                <span className={`severity ${alert.impact.toLowerCase()}`}>{alert.impact}</span>
                <div>
                  <strong>{alert.title}</strong>
                  <p>{alert.location}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="content-card">
          <div className="card-header">
            <h2>Acciones requeridas</h2>
            <span className="tag danger">Critico</span>
          </div>
          <ul className="action-list">
            <li>Verificación de taludes en Frente 4 antes de inicio de turno.</li>
            <li>Revisión de señalética y barricadas en acceso al taller.</li>
            <li>Inspección de extintores y equipos de respuesta ante emergencias.</li>
            <li>Confirmación de permisos de trabajo para tareas en altura.</li>
          </ul>
        </article>
      </div>
    </div>
  )
}

export default SeguridadPage
