import { qualitySignals } from '../data/platformData'

function CalidadPage() {
  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Control de calidad</span>
          <h1>Monitoreo de variables críticas</h1>
        </div>
        <button className="primary-btn">Generar informe</button>
      </section>

      <div className="quality-grid">
        {qualitySignals.map((signal) => (
          <article key={signal.item} className="content-card quality-card">
            <span>{signal.item}</span>
            <strong>{signal.value}</strong>
            <small>{signal.status}</small>
          </article>
        ))}
      </div>
    </div>
  )
}

export default CalidadPage
