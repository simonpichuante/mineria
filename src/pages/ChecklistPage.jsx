import { useEffect, useState } from 'react'
import { createChecklist, fetchChecklists } from '../lib/mineriaService'

const emptyForm = {
  name: '',
  shift: 'Turno día',
  progress_percent: 0,
  status: 'pendiente',
}

function ChecklistPage() {
  const [checklists, setChecklists] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const loadChecklists = async () => {
    const data = await fetchChecklists()
    setChecklists(data)
  }

  useEffect(() => {
    loadChecklists()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submitChecklist = async (event) => {
    event.preventDefault()

    await createChecklist({
      name: form.name,
      shift: form.shift,
      progress_percent: Number(form.progress_percent),
      status: form.status,
      owner_user_id: null,
    })

    setModalOpen(false)
    setForm(emptyForm)
    loadChecklists()
  }

  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Control de operación</span>
          <h1>Checklists de campo</h1>
        </div>
        <button className="primary-btn" onClick={() => setModalOpen(true)}>Registrar chequeo</button>
      </section>

      <div className="checklist-grid">
        {checklists.map((item) => (
          <article key={item.id || item.name} className="content-card checklist-card">
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

      {modalOpen ? (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h2>Registrar chequeo</h2>
            <form className="modal-form" onSubmit={submitChecklist}>
              <label>
                Nombre del checklist
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Turno
                <select name="shift" value={form.shift} onChange={handleChange}>
                  <option value="Turno día">Turno día</option>
                  <option value="Turno tarde">Turno tarde</option>
                  <option value="Turno noche">Turno noche</option>
                </select>
              </label>
              <label>
                Progreso (%)
                <input type="number" min="0" max="100" name="progress_percent" value={form.progress_percent} onChange={handleChange} required />
              </label>
              <label>
                Estado
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="pendiente">Pendiente</option>
                  <option value="en_progreso">En progreso</option>
                  <option value="completado">Completado</option>
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

export default ChecklistPage
