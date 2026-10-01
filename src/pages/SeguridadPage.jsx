import { useEffect, useState } from 'react'
import { createSafetyAction, createSafetyAlert, fetchSafetyAlerts } from '../lib/mineriaService'

const emptyForm = {
  title: '',
  location: '',
  impact: 'media',
  description: '',
  assigned_to: '',
  due_date: '',
}

function SeguridadPage() {
  const [safetyAlerts, setSafetyAlerts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const loadAlerts = async () => {
    const data = await fetchSafetyAlerts()
    setSafetyAlerts(data)
  }

  useEffect(() => {
    loadAlerts()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submitPermission = async (event) => {
    event.preventDefault()

    const alertResult = await createSafetyAlert({
      title: form.title,
      location: form.location,
      impact: form.impact,
      description: form.description || 'Permiso emitido desde la plataforma.',
      owner: 'Seguridad',
    })

    if (alertResult) {
      await createSafetyAction({
        alert_id: alertResult.id,
        action_text: `Permiso emitido para ${form.title}`,
        assigned_to: form.assigned_to || 'Seguridad',
        due_date: form.due_date || null,
        is_completed: false,
      })
    }

    setModalOpen(false)
    setForm(emptyForm)
    loadAlerts()
  }

  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Seguridad industrial</span>
          <h1>Control de riesgos y permisos</h1>
        </div>
        <button className="primary-btn" onClick={() => setModalOpen(true)}>Emitir permiso</button>
      </section>

      <div className="split-grid">
        <article className="content-card">
          <div className="card-header">
            <h2>Riesgos activos</h2>
            <span className="tag warning">Monitoreo</span>
          </div>
          <div className="list-stack">
            {safetyAlerts.map((alert) => (
              <div key={alert.id || alert.title} className="alert-item">
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

      {modalOpen ? (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h2>Emitir permiso</h2>
            <form className="modal-form" onSubmit={submitPermission}>
              <label>
                Nombre del permiso
                <input name="title" value={form.title} onChange={handleChange} required />
              </label>
              <label>
                Ubicación
                <input name="location" value={form.location} onChange={handleChange} required />
              </label>
              <label>
                Impacto
                <select name="impact" value={form.impact} onChange={handleChange}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </label>
              <label>
                Encargado
                <input name="assigned_to" value={form.assigned_to} onChange={handleChange} />
              </label>
              <label>
                Fecha límite
                <input type="date" name="due_date" value={form.due_date} onChange={handleChange} />
              </label>
              <label>
                Descripción
                <textarea name="description" value={form.description} onChange={handleChange} rows="4" />
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

export default SeguridadPage
