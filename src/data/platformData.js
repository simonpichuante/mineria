export const navItems = [
  { label: 'Inicio', path: '/dashboard', icon: '▣' },
  { label: 'Procedimientos', path: '/procedimientos', icon: '📘' },
  { label: 'Checklists', path: '/checklists', icon: '✅' },
  { label: 'Seguridad', path: '/seguridad', icon: '🛡️' },
  { label: 'Calidad', path: '/calidad', icon: '📐' },
  { label: 'Incidentes', path: '/incidentes', icon: '⚠️' },
  { label: 'Reportes', path: '/reportes', icon: '📊' },
  { label: 'Perfil', path: '/perfil', icon: '👤' },
]

export const dashboardMetrics = [
  { label: 'Procedimientos vigentes', value: '186', trend: '+12% vs mes anterior', tone: 'ok' },
  { label: 'Checklists ejecutados', value: '94%', trend: '22 pendientes', tone: 'warn' },
  { label: 'Hallazgos de seguridad', value: '07', trend: '3 cerrados hoy', tone: 'danger' },
  { label: 'Aprobación de calidad', value: '98.4%', trend: 'Sin desviaciones críticas', tone: 'ok' },
]

export const procedures = [
  { title: 'Apertura de zona de extracción', area: 'Frente 2 - Norte', version: 'V.18', updated: 'Hace 2 días', status: 'Vigente' },
  { title: 'Manejo de explosivos y carga', area: 'Pique principal', version: 'V.10', updated: 'Hace 5 días', status: 'Revisión' },
  { title: 'Inspección de equipos críticos', area: 'Arenado y transporte', version: 'V.21', updated: 'Hoy', status: 'Vigente' },
  { title: 'Control de acceso y bloqueo', area: 'Taller de mantenimiento', version: 'V.07', updated: 'Hace 1 día', status: 'Aprobado' },
]

export const checklists = [
  { name: 'Inspección de taladros', shift: 'Turno día', progress: 90, owner: 'J. Muñoz' },
  { name: 'PPE y condiciones de trabajo', shift: 'Turno tarde', progress: 100, owner: 'R. Paredes' },
  { name: 'Prestart en carguío', shift: 'Turno noche', progress: 75, owner: 'S. Vega' },
  { name: 'Control de polvo y ventilación', shift: 'Turno día', progress: 60, owner: 'C. Ortiz' },
]

export const safetyAlerts = [
  { title: 'Riesgo de caída en talud', impact: 'Alta', location: 'Frente 4', owner: 'Seguridad' },
  { title: 'Señaletización deficiente', impact: 'Media', location: 'Calle de tránsito', owner: 'Operaciones' },
  { title: 'Fuga de lubricante', impact: 'Media', location: 'Taller M-2', owner: 'Mantenimiento' },
]

export const qualitySignals = [
  { item: 'Granulometría de mineral', value: '4.8 mm', status: 'Dentro de rango' },
  { item: 'Humedad residual', value: '12.3%', status: 'Alerta leve' },
  { item: 'Porcentaje de rechazo', value: '0.7%', status: 'Excelente' },
  { item: 'Densidad de pulpa', value: '1.76 g/cm³', status: 'Estable' },
]

export const incidentHistory = [
  { id: 'INC-2048', area: 'Frente 1', type: 'Casi accidente', severity: 'Media', status: 'Cerrado' },
  { id: 'INC-2051', area: 'Arenado', type: 'Falla mecánica', severity: 'Alta', status: 'En seguimiento' },
  { id: 'INC-2054', area: 'Taller', type: 'Lesión menor', severity: 'Baja', status: 'Investigación' },
  { id: 'INC-2057', area: 'Pique', type: 'Incidente de calidad', severity: 'Media', status: 'Abierto' },
]

export const reports = [
  { title: 'Efectividad de seguridad', value: '91%', note: 'vs 88% del mes anterior' },
  { title: 'Cumplimiento de procedimientos', value: '96%', note: 'en 27 áreas revisadas' },
  { title: 'Incidentes por semana', value: '03', note: '2 cerrados en 48 horas' },
  { title: 'Desviaciones de calidad', value: '05', note: 'ninguna crítica' },
]

export const profileData = {
  name: 'María José Rojas',
  role: 'Supervisora de Seguridad y Calidad',
  unit: 'División El Teniente / Rancagua',
  certifications: ['SST', 'Control de calidad minero', 'Liderazgo operacional', 'Auditoría interna'],
}
