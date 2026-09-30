import { BrowserRouter, NavLink, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { navItems } from './data/platformData'
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

function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()

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

        <button type="button" className="logout-btn" onClick={() => navigate('/')}>
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
              <span className="avatar-mini">MR</span>
              María Rojas
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
