import { useEffect, useState } from 'react'
import { createIncident, fetchIncidents } from '../lib/mineriaService'

const emptyForm = {
  incident_code: '',
  area: '',
  incident_type: '',
  severity: 'media',
  status: 'abierto',
  summary: '',
}

function IncidentesPage() {
  const [incidentHistory, setIncidentHistory] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const loadIncidents = async () => {
    const data = await fetchIncidents()
    setIncidentHistory(data)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submitIncident = async (event) => {
    event.preventDefault()

    await createIncident({
      incident_code: form.incident_code,
      area: form.area,
      incident_type: form.incident_type,
      severity: form.severity,
      status: form.status,
      summary: form.summary,
    })

    setModalOpen(false)
    setForm(emptyForm)
    loadIncidents()
  }

  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Gestión de incidentes</span>
          <h1>Historial y seguimiento</h1>
        </div>
        <button className="primary-btn" onClick={() => setModalOpen(true)}>Registrar incidente</button>
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

      {modalOpen ? (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h2>Registrar incidente</h2>
            <form className="modal-form" onSubmit={submitIncident}>
              <label>
                Código
                <input name="incident_code" value={form.incident_code} onChange={handleChange} required />
              </label>
              <label>
                Área
                <input name="area" value={form.area} onChange={handleChange} required />
              </label>
              <label>
                Tipo
                <input name="incident_type" value={form.incident_type} onChange={handleChange} required />
              </label>
              <label>
                Severidad
                <select name="severity" value={form.severity} onChange={handleChange}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </label>
              <label>
                Estado
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="abierto">Abierto</option>
                  <option value="en_seguimiento">En seguimiento</option>
                  <option value="investigacion">Investigación</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </label>
              <label>
                Resumen
                <textarea name="summary" value={form.summary} onChange={handleChange} rows="4" required />
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

export default IncidentesPage
