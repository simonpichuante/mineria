import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { navItems } from './data/platformData'
import { doLogout, getCurrentSessionUser, supabase } from './lib/mineriaService'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProcedimientosPage from './pages/ProcedimientosPage'
import ChecklistPage from './pages/ChecklistPage'
import SeguridadPage from './pages/SeguridadPage'
import CalidadPage from './pages/CalidadPage'
import IncidentesPage from './pages/IncidentesPage'
import ReportesPage from './pages/ReportesPage'
import PerfilPage from './pages/PerfilPage'
import './App.css'

function ProtectedRoute() {
  const [authorized, setAuthorized] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        setAuthorized(true)
        return
      }

      const { data } = await supabase.auth.getSession()
      setAuthorized(Boolean(data.session))
    }

    checkAuth()
  }, [])

  if (authorized === null) {
    return <div className="auth-loading">Validando sesión...</div>
  }

  if (!authorized) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('mineriaCurrentUser') || '{}'))

  useEffect(() => {
    getCurrentSessionUser().then((profile) => {
      if (profile && profile.name) {
        setUser(profile)
        sessionStorage.setItem('mineriaCurrentUser', JSON.stringify(profile))
      }
    })
  }, [])

  const pageNames = {
    '/dashboard': 'Inicio',
    '/procedimientos': 'Procedimientos',
    '/checklists': 'Checklists',
    '/seguridad': 'Seguridad',
    '/calidad': 'Calidad',
    '/incidentes': 'Incidentes',
    '/reportes': 'Reportes',
    '/perfil': 'Perfil',
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">M</div>
          <div>
            <h2>MINERIA+</h2>
            <span>QHSE Control</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="logout-btn"
          onClick={async () => {
            await doLogout()
            sessionStorage.removeItem('mineriaCurrentUser')
            navigate('/')
          }}
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="content-panel">
        <header className="topbar">
          <div>
            <span className="eyebrow">Supervisión operativa</span>
            <h1>{pageNames[location.pathname] ?? 'Tablero'}</h1>
          </div>
          <div className="topbar-right">
            <span className="status-badge">Sistema en línea</span>
            <div className="user-pill">
              <span className="avatar-mini">{(user.name || 'MR').slice(0, 2).toUpperCase()}</span>
              {user.name || 'María Rojas'}
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/procedimientos" element={<ProcedimientosPage />} />
            <Route path="/checklists" element={<ChecklistPage />} />
            <Route path="/seguridad" element={<SeguridadPage />} />
            <Route path="/calidad" element={<CalidadPage />} />
            <Route path="/incidentes" element={<IncidentesPage />} />
            <Route path="/reportes" element={<ReportesPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
