import { useEffect, useState } from 'react'
import { createProcedure, deleteProcedure, fetchProcedures, updateProcedure } from '../lib/mineriaService'

const emptyForm = {
  title: '',
  area: '',
  version: 'V.01',
  status: 'vigente',
  revision_notes: '',
}

function ProcedimientosPage() {
  const [procedures, setProcedures] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const loadProcedures = async () => {
    const data = await fetchProcedures()
    setProcedures(data)
  }

  useEffect(() => {
    loadProcedures()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const openCreateModal = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEditModal = (procedure) => {
    setEditingId(procedure.id)
    setForm({
      title: procedure.title,
      area: procedure.area,
      version: procedure.version,
      status: procedure.status === 'Vigente' ? 'vigente' : procedure.status === 'Revisión' ? 'revision' : procedure.status === 'Aprobado' ? 'aprobado' : 'historico',
      revision_notes: '',
    })
    setModalOpen(true)
  }

  const submitProcedure = async (event) => {
    event.preventDefault()

    const payload = {
      title: form.title,
      area: form.area,
      version: form.version,
      status: form.status,
      revision_notes: form.revision_notes || 'Documento actualizado desde el sistema de gestión.',
    }

    if (editingId) {
      await updateProcedure(editingId, payload)
    } else {
      await createProcedure(payload)
    }

    setModalOpen(false)
    setForm(emptyForm)
    loadProcedures()
  }

  const removeProcedure = async (id) => {
    const ok = await deleteProcedure(id)
    if (ok) {
      loadProcedures()
    }
  }

  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Documentación operativa</span>
          <h1>Procedimientos actuales</h1>
        </div>
        <button className="primary-btn" onClick={openCreateModal}>NUEVO PROCEDIMIENTO</button>
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((procedure) => (
              <tr key={`${procedure.title}-${procedure.version}`}>
                <td>{procedure.title}</td>
                <td>{procedure.area}</td>
                <td>{procedure.version}</td>
                <td>{procedure.updated}</td>
                <td><span className="status-pill">{procedure.status}</span></td>
                <td className="action-td">
                  <button type="button" className="inline-btn" onClick={() => openEditModal(procedure)}>Editar</button>
                  <button type="button" className="inline-btn danger" onClick={() => removeProcedure(procedure.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen ? (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h2>{editingId ? 'Editar procedimiento' : 'Nuevo procedimiento'}</h2>
            <form className="modal-form" onSubmit={submitProcedure}>
              <label>
                Título
                <input name="title" value={form.title} onChange={handleChange} required />
              </label>
              <label>
                Área
                <input name="area" value={form.area} onChange={handleChange} required />
              </label>
              <label>
                Versión
                <input name="version" value={form.version} onChange={handleChange} required />
              </label>
              <label>
                Estado
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="vigente">Vigente</option>
                  <option value="revision">Revisión</option>
                  <option value="aprobado">Aprobado</option>
                  <option value="historico">Histórico</option>
                </select>
              </label>
              <label>
                Observaciones
                <textarea name="revision_notes" value={form.revision_notes} onChange={handleChange} rows="4" />
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

export default ProcedimientosPage
