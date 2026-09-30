import { checklists } from '../data/platformData'

function ChecklistPage() {
  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Control de operación</span>
          <h1>Checklists de campo</h1>
        </div>
        <button className="primary-btn">Registrar chequeo</button>
      </section>

      <div className="checklist-grid">
        {checklists.map((item) => (
          <article key={item.name} className="content-card checklist-card">
            <div className="card-header">
              <h2>{item.name}</h2>
              <span className="tag neutral">{item.shift}</span>
            </div>
            <div className="progress-row">
              <div className="progress-track">
                <span style={{ width: `${item.progress}%` }} />
              </div>
              <strong>{item.progress}%</strong>
            </div>
            <div className="owner-row">
              <span>Responsable</span>
              <strong>{item.owner}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ChecklistPage
