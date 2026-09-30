import { reports } from '../data/platformData'

function ReportesPage() {
  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Reporte ejecutivo</span>
          <h1>Indicadores y cumplimiento</h1>
        </div>
        <button className="primary-btn">Exportar PDF</button>
      </section>

      <div className="reports-grid large">
        {reports.map((report) => (
          <div key={report.title} className="report-box">
            <span>{report.title}</span>
            <strong>{report.value}</strong>
            <small>{report.note}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReportesPage
