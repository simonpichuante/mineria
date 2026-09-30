import { profileData } from '../data/platformData'

function PerfilPage() {
  return (
    <div className="page-stack">
      <section className="page-title-row">
        <div>
          <span className="eyebrow">Mi perfil</span>
          <h1>Usuario y certificaciones</h1>
        </div>
      </section>

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">MR</div>
          <div>
            <h2>{profileData.name}</h2>
            <p>{profileData.role}</p>
            <small>{profileData.unit}</small>
          </div>
        </div>

        <div className="profile-meta">
          <div>
            <span>Certificaciones</span>
            <ul>
              {profileData.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <span>Acceso</span>
            <ul>
              <li>Permisos de auditoría</li>
              <li>Validación de trazabilidad</li>
              <li>Ingreso en línea con firma digital</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPage
