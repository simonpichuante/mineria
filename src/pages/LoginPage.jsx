import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-panel left-panel">
        <span className="eyebrow">División El Teniente</span>
        <h1>Plataforma de procedimientos y seguridad minera</h1>
        <p>
          Acceso digital para procedimientos operativos, control de calidad, seguridad y
          cumplimiento en campo.
        </p>

        <div className="feature-list">
          <div>
            <strong>100%</strong>
            <span>Digitalización de procedimientos</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Disponibilidad en tablet y móvil</span>
          </div>
          <div>
            <strong>Zero</strong>
            <span>Documentación física obsoleta</span>
          </div>
        </div>
      </div>

      <div className="login-panel form-panel">
        <div className="brand-block">
          <div className="brand-mark">M</div>
          <div>
            <h2>MINERIA+</h2>
            <span>QHSE Control</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Usuario
            <input type="text" defaultValue="mrojas" />
          </label>
          <label>
            Contraseña
            <input type="password" defaultValue="********" />
          </label>

          <div className="row-between">
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              Mantener sesión activa
            </label>
            <a href="#">¿Olvidaste tu clave?</a>
          </div>

          <button type="submit">Ingresar al tablero</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
