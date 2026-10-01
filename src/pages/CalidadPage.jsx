import { useEffect, useState } from 'react'
import { createQualitySignal, createReport, fetchQualitySignals } from '../lib/mineriaService'

const emptyForm = {
  metric_name: '',
  metric_value: '',
  metric_unit: '',
  status: 'estable',
}

function CalidadPage() {
  const [qualitySignals, setQualitySignals] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const loadSignals = async () => {
    const data = await fetchQualitySignals()
    setQualitySignals(data)
  }

  useEffect(() => {
    loadSignals()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const generateReport = async (event) => {
    event.preventDefault()

    await createQualitySignal({
      metric_name: form.metric_name,
      metric_value: form.metric_value,
      metric_unit: form.metric_unit,
      status: form.status,
    })

    await createReport({
      title: `Informe ${form.metric_name}`,
      report_type: 'calidad',
      value: form.metric_value,
      notes: `Métrico cargado desde la plataforma de calidad (${form.status}).`,
    })

    setModalOpen(false)
    setForm(emptyForm)
    loadSignals()
  }

  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Control de calidad</span>
          <h1>Monitoreo de variables críticas</h1>
        </div>
        <button className="primary-btn" onClick={() => setModalOpen(true)}>Generar informe</button>
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

      {modalOpen ? (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h2>Generar informe</h2>
            <form className="modal-form" onSubmit={generateReport}>
              <label>
                Nombre de la variable
                <input name="metric_name" value={form.metric_name} onChange={handleChange} required />
              </label>
              <label>
                Valor
                <input name="metric_value" value={form.metric_value} onChange={handleChange} required />
              </label>
              <label>
                Unidad
                <input name="metric_unit" value={form.metric_unit} onChange={handleChange} placeholder="mm, %, g/cm³" />
              </label>
              <label>
                Estado
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="estable">Estable</option>
                  <option value="dentro de rango">Dentro de rango</option>
                  <option value="alerta leve">Alerta leve</option>
                  <option value="excelente">Excelente</option>
                </select>
              </label>

              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit" className="primary-btn">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CalidadPage
