import { incidentHistory } from '../data/platformData'

function IncidentesPage() {
  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Gestión de incidentes</span>
          <h1>Historial y seguimiento</h1>
        </div>
        <button className="primary-btn">Registrar incidente</button>
      </section>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Área</th>
              <th>Tipo</th>
              <th>Severidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {incidentHistory.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.area}</td>
                <td>{incident.type}</td>
                <td><span className="status-pill severity-pill">{incident.severity}</span></td>
                <td><span className="status-pill">{incident.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IncidentesPage
