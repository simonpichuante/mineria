import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doLogin } from '../lib/mineriaService'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('maria.rojas@mineria.cl')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const result = await doLogin(email.trim(), password)

    if (result.ok && result.user) {
      sessionStorage.setItem('mineriaCurrentUser', JSON.stringify(result.user))
      navigate('/dashboard')
      return
    }

    setError(result.error || 'No se pudo iniciar sesión.')
    setLoading(false)
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
            Correo institucional
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@mineria.cl" />
          </label>
          <label>
            Contraseña
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </label>

          <div className="row-between">
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              Mantener sesión activa
            </label>
            <a href="#">¿Olvidaste tu clave?</a>
          </div>

          {error ? <div className="error-banner">{error}</div> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Validando...' : 'Ingresar al tablero'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
