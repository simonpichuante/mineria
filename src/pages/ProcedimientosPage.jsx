import { procedures } from '../data/platformData'

function ProcedimientosPage() {
  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Documentación operativa</span>
          <h1>Procedimientos actuales</h1>
        </div>
        <button className="primary-btn">NUEVO PROCEDIMIENTO</button>
      </section>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Procedimiento</th>
              <th>Área</th>
              <th>Versión</th>
              <th>Última actualización</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((procedure) => (
              <tr key={procedure.title}>
                <td>{procedure.title}</td>
                <td>{procedure.area}</td>
                <td>{procedure.version}</td>
                <td>{procedure.updated}</td>
                <td><span className="status-pill">{procedure.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProcedimientosPage
