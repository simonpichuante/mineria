import { useEffect, useMemo, useState } from 'react'
import { fetchReports } from '../lib/mineriaService'

const tabs = ['Seguridad', 'Calidad', 'Operación', 'Medio Ambiente']
const ranges = [7, 30, 90]

const reportSets = {
  Seguridad: {
    stats: [
      { title: 'Cumplimiento operativo', value: '96.2%', tone: 'ok', detail: 'Respecto a últimos 30 días' },
      { title: 'Tiempo medio de cierre', value: '3.4 días', tone: 'warn', detail: 'Mejorando 18% semanal' },
      { title: 'Hallazgos críticos', value: '02', tone: 'danger', detail: 'Sin recurrencia' },
      { title: 'Capacitación completada', value: '89%', tone: 'ok', detail: 'Meta 95%' },
    ],
    bars: [72, 54, 88, 63, 96, 81, 91],
    donut: { ok: 72, warn: 18, danger: 10 },
    table: [
      { indicator: 'Permisos de trabajo', actual: '94%', meta: '96%', var: '+2%', date: '2026-09-28' },
      { indicator: 'Inspección taludes', actual: '88%', meta: '90%', var: '-2%', date: '2026-09-27' },
      { indicator: 'Fugas detectadas', actual: '03', meta: '05', var: '-2', date: '2026-09-25' },
      { indicator: 'Capacitación SST', actual: '91%', meta: '95%', var: '+4%', date: '2026-09-24' },
    ],
  },
  Calidad: {
    stats: [
      { title: 'Calidad del mineral', value: '97.8%', tone: 'ok', detail: 'Cumple especificación' },
      { title: 'Rendimiento de proceso', value: '92.4%', tone: 'ok', detail: 'Sin desviación crítica' },
      { title: 'Desviaciones detectadas', value: '05', tone: 'warn', detail: '3 cerradas' },
      { title: 'Rechazo promedio', value: '0.7%', tone: 'danger', detail: 'Meta máxima 1%' },
    ],
    bars: [60, 78, 66, 88, 74, 90, 84],
    donut: { ok: 68, warn: 22, danger: 10 },
    table: [
      { indicator: 'Granulometría', actual: '4.8 mm', meta: '5.0 mm', var: '-0.2', date: '2026-09-29' },
      { indicator: 'Humedad', actual: '12.3%', meta: '13.0%', var: '-0.7%', date: '2026-09-27' },
      { indicator: 'Densidad pulpa', actual: '1.76', meta: '1.80', var: '-0.04', date: '2026-09-26' },
      { indicator: 'Porcentaje rechazo', actual: '0.7%', meta: '1.0%', var: '-0.3%', date: '2026-09-24' },
    ],
  },
  Operación: {
    stats: [
      { title: 'Disponibilidad equipos', value: '92.1%', tone: 'ok', detail: '14% mejor que mes anterior' },
      { title: 'Horas productivas', value: '1,452 h', tone: 'ok', detail: '92% del plan' },
      { title: 'Paros no programados', value: '07', tone: 'warn', detail: '4 cerrados rápido' },
      { title: 'Eficiencia de transporte', value: '87.6%', tone: 'warn', detail: 'Meta 90%' },
    ],
    bars: [64, 70, 81, 77, 90, 86, 95],
    donut: { ok: 65, warn: 25, danger: 10 },
    table: [
      { indicator: 'Disponibilidad tren', actual: '93%', meta: '95%', var: '-2%', date: '2026-09-28' },
      { indicator: 'Carga y transporte', actual: '89%', meta: '90%', var: '-1%', date: '2026-09-27' },
      { indicator: 'Paros mantenimiento', actual: '06', meta: '04', var: '+2', date: '2026-09-26' },
      { indicator: 'Productividad turno', actual: '91%', meta: '94%', var: '-3%', date: '2026-09-25' },
    ],
  },
  'Medio Ambiente': {
    stats: [
      { title: 'Emisiones controladas', value: '88.5%', tone: 'ok', detail: 'Sin eventos críticos' },
      { title: 'Monitoreo agua', value: '97.0%', tone: 'ok', detail: 'Fuera de rango leve' },
      { title: 'Riesgo ambiental', value: '03', tone: 'warn', detail: '2 con mitigación' },
      { title: 'Recuperación residuos', value: '76.2%', tone: 'warn', detail: 'Meta 80%' },
    ],
    bars: [58, 68, 75, 82, 79, 88, 92],
    donut: { ok: 75, warn: 13, danger: 12 },
    table: [
      { indicator: 'Monitoreo polvo', actual: '91%', meta: '95%', var: '-4%', date: '2026-09-29' },
      { indicator: 'Aguas de proceso', actual: '96%', meta: '98%', var: '-2%', date: '2026-09-27' },
      { indicator: 'Ruidos', actual: '87%', meta: '90%', var: '-3%', date: '2026-09-26' },
      { indicator: 'Residuo valorizado', actual: '76%', meta: '80%', var: '-4%', date: '2026-09-24' },
    ],
  },
}

function ReportesPage() {
  const [reports, setReports] = useState([])
  const [selectedTab, setSelectedTab] = useState('Seguridad')
  const [selectedRange, setSelectedRange] = useState(30)
  const [selectedMetric, setSelectedMetric] = useState('Cumplimiento operativo')

  useEffect(() => {
    fetchReports().then(setReports)
  }, [])

  const activeData = useMemo(() => reportSets[selectedTab], [selectedTab])
  const donutStyle = useMemo(() => {
    const { ok, warn, danger } = activeData.donut
    return {
      background: `conic-gradient(#40d7a6 0 ${ok}%, #f6c76f ${ok}% ${ok + warn}%, #ff8c7a ${ok + warn}% ${ok + warn + danger}%, rgba(150, 165, 180, 0.15) ${ok + warn + danger}% 100%)`,
    }
  }, [activeData])

  const handleExportPdf = () => {
    window.print()
  }

  const handleExportCsv = () => {
    const rows = [
      ['Indicador', 'Actual', 'Meta', 'Var', 'Fecha'],
      ...activeData.table.map((row) => [row.indicator, row.actual, row.meta, row.var, row.date]),
    ]

    const csv = rows.map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const download = document.createElement('a')
    download.href = url
    download.download = `${selectedTab.toLowerCase().replace(/\s+/g, '-')}-reporte.csv`
    document.body.appendChild(download)
    download.click()
    document.body.removeChild(download)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Reporte ejecutivo</span>
          <h1>Indicadores y cumplimiento</h1>
        </div>
        <div className="action-group">
          <button className="secondary-btn" type="button" onClick={handleExportCsv}>Exportar CSV</button>
          <button className="primary-btn" onClick={handleExportPdf}>Exportar PDF</button>
        </div>
      </section>

      <div className="tabs-row">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={selectedTab === tab ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="range-row">
        {ranges.map((range) => (
          <button
            key={range}
            type="button"
            className={selectedRange === range ? 'range-btn active' : 'range-btn'}
            onClick={() => setSelectedRange(range)}
          >
            {range} días
          </button>
        ))}
      </div>

      <div className="stats-grid">
        {activeData.stats.map((item) => (
          <article key={item.title} className="stat-card">
            <span>{item.title}</span>
            <strong>{item.value}</strong>
            <small className={item.tone}>{item.detail}</small>
          </article>
        ))}
      </div>

      <div className="reports-layout">
        <section className="content-card chart-card">
          <div className="card-header">
            <h2>Rendimiento semanal</h2>
            <span className="tag neutral">{selectedRange} días</span>
          </div>

          <div className="bar-chart" aria-label="Gráfico de indicadores">
            {activeData.bars.map((value, index) => (
              <div key={`${selectedTab}-${index}`} className="bar-column">
                <button
                  type="button"
                  className={selectedMetric === activeData.stats[0].title ? 'bar active' : 'bar'}
                  style={{ height: `${value}%` }}
                  onClick={() => setSelectedMetric(activeData.stats[0].title)}
                  aria-label={`Semana ${index + 1}: ${value}%`}
                />
                <span>{['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="content-card insights-card">
          <div className="card-header">
            <h2>Distribución</h2>
            <span className="tag success">Promedio</span>
          </div>

          <div className="donut-wrap">
            <div className="donut-chart" style={donutStyle}>
              <div className="donut-inner">
                <strong>{activeData.donut.ok}%</strong>
                <span>Óptimo</span>
              </div>
            </div>
            <div className="donut-legend">
              <div><span className="legend-dot ok"></span> Óptimo </div>
              <div><span className="legend-dot warn"></span> Atención </div>
              <div><span className="legend-dot danger"></span> Crítico </div>
            </div>
          </div>
        </section>
      </div>

      <section className="content-card">
        <div className="card-header">
          <h2>Indicadores clave</h2>
          <span className="tag neutral">Reporte dinámico</span>
        </div>

        <div className="reports-grid large">
          {reports.map((report) => (
            <div key={report.title} className="report-box interactive">
              <span>{report.title}</span>
              <strong>{report.value}</strong>
              <small>{report.note}</small>
              <button type="button" className="mini-link" onClick={() => setSelectedMetric(report.title)}>
                Ver más información
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="content-card">
        <div className="card-header">
          <h2>Tabla ejecutiva</h2>
          <span className="tag neutral">Detalle por indicador</span>
        </div>

        <div className="table-card compact-table">
          <table>
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Actual</th>
                <th>Meta</th>
                <th>Var.</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {activeData.table.map((row) => (
                <tr key={row.indicator}>
                  <td>{row.indicator}</td>
                  <td>{row.actual}</td>
                  <td>{row.meta}</td>
                  <td>{row.var}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default ReportesPage
