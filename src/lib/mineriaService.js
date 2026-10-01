import { supabase } from './supabase'
export { supabase }
import {
  procedures as fallbackProcedures,
  checklists as fallbackChecklists,
  safetyAlerts as fallbackSafetyAlerts,
  qualitySignals as fallbackQualitySignals,
  incidentHistory as fallbackIncidents,
  reports as fallbackReports,
  profileData as fallbackProfile,
} from '../data/platformData'

const toTitleCase = (value) => {
  if (!value) return ''
  return value
    .toString()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

const normalizeProcedure = (item) => ({
  id: item.id,
  title: item.title,
  area: item.area,
  version: item.version || 'V.01',
  updated: item.last_updated ? new Date(item.last_updated).toLocaleDateString('es-CL') : 'Hoy',
  status: item.status === 'vigente' ? 'Vigente' : item.status === 'revision' ? 'Revisión' : item.status === 'aprobado' ? 'Aprobado' : toTitleCase(item.status),
})

const normalizeChecklist = (item) => ({
  id: item.id,
  name: item.name,
  shift: item.shift,
  progress: item.progress_percent ?? item.progress ?? 0,
  owner: item.owner_user_id ? 'Responsable asignado' : 'Sin responsable',
})

const normalizeAlert = (item) => ({
  id: item.id,
  title: item.title,
  impact: item.impact === 'alta' ? 'Alta' : item.impact === 'media' ? 'Media' : item.impact === 'baja' ? 'Baja' : toTitleCase(item.impact),
  location: item.location,
  owner: item.owner || 'Seguridad',
})

const normalizeQuality = (item) => ({
  item: item.metric_name,
  value: `${item.metric_value} ${item.metric_unit || ''}`.trim(),
  status: item.status ? toTitleCase(item.status) : 'Estable',
})

const normalizeIncident = (item) => ({
  id: item.incident_code,
  area: item.area,
  type: item.incident_type,
  severity: item.severity ? toTitleCase(item.severity) : 'Media',
  status: item.status === 'en_seguimiento' ? 'En seguimiento' : item.status === 'investigacion' ? 'Investigación' : item.status === 'cerrado' ? 'Cerrado' : 'Abierto',
})

const normalizeReport = (item) => ({
  title: item.title,
  value: item.value,
  note: item.notes || 'Sin detalle',
})

const normalizeProfile = (item) => ({
  name: item.full_name || fallbackProfile.name,
  role: item.role_id ? 'Supervisor de Seguridad y Calidad' : fallbackProfile.role,
  unit: item.unit || fallbackProfile.unit,
  certifications: Array.isArray(item.certifications) ? item.certifications : fallbackProfile.certifications,
  email: item.email || '',
})

export async function fetchProcedures() {
  if (!supabase) return fallbackProcedures

  const { data, error } = await supabase.from('procedures').select('*').order('last_updated', { ascending: false })
  if (error) {
    console.error('Error fetching procedures:', error)
    return fallbackProcedures
  }

  return (data || []).map(normalizeProcedure)
}

export async function createProcedure(payload) {
  if (!supabase) return null

  const { data, error } = await supabase.from('procedures').insert(payload).select().single()
  if (error) {
    console.error('Error creating procedure:', error)
    return null
  }

  return normalizeProcedure(data)
}

export async function updateProcedure(id, payload) {
  if (!supabase) return null

  const { data, error } = await supabase.from('procedures').update(payload).eq('id', id).select().single()
  if (error) {
    console.error('Error updating procedure:', error)
    return null
  }

  return normalizeProcedure(data)
}

export async function deleteProcedure(id) {
  if (!supabase) return false

  const { error } = await supabase.from('procedures').delete().eq('id', id)
  if (error) {
    console.error('Error deleting procedure:', error)
    return false
  }

  return true
}

export async function fetchChecklists() {
  if (!supabase) return fallbackChecklists

  const { data, error } = await supabase.from('checklists').select('*').order('updated_at', { ascending: false })
  if (error) {
    console.error('Error fetching checklists:', error)
    return fallbackChecklists
  }

  return (data || []).map(normalizeChecklist)
}

export async function createChecklist(payload) {
  if (!supabase) return null

  const { data, error } = await supabase.from('checklists').insert(payload).select().single()
  if (error) {
    console.error('Error creating checklist:', error)
    return null
  }

  return normalizeChecklist(data)
}

export async function fetchSafetyAlerts() {
  if (!supabase) return fallbackSafetyAlerts

  const { data, error } = await supabase.from('safety_alerts').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching safety alerts:', error)
    return fallbackSafetyAlerts
  }

  return (data || []).map(normalizeAlert)
}

export async function createSafetyAlert(payload) {
  if (!supabase) return null

  const { data, error } = await supabase.from('safety_alerts').insert(payload).select().single()
  if (error) {
    console.error('Error creating safety alert:', error)
    return null
  }

  return normalizeAlert(data)
}

export async function createSafetyAction(payload) {
  if (!supabase) return null

  const { data, error } = await supabase.from('safety_actions').insert(payload).select().single()
  if (error) {
    console.error('Error creating safety action:', error)
    return null
  }

  return data
}

export async function fetchQualitySignals() {
  if (!supabase) return fallbackQualitySignals

  const { data, error } = await supabase.from('quality_metrics').select('*').order('measured_at', { ascending: false })
  if (error) {
    console.error('Error fetching quality metrics:', error)
    return fallbackQualitySignals
  }

  return (data || []).map(normalizeQuality)
}

export async function createQualitySignal(payload) {
  if (!supabase) return null

  const { data, error } = await supabase.from('quality_metrics').insert(payload).select().single()
  if (error) {
    console.error('Error creating quality signal:', error)
    return null
  }

  return normalizeQuality(data)
}

export async function fetchIncidents() {
  if (!supabase) return fallbackIncidents

  const { data, error } = await supabase.from('incidents').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching incidents:', error)
    return fallbackIncidents
  }

  return (data || []).map(normalizeIncident)
}

export async function createIncident(payload) {
  if (!supabase) return null

  const { data, error } = await supabase.from('incidents').insert(payload).select().single()
  if (error) {
    console.error('Error creating incident:', error)
    return null
  }

  return normalizeIncident(data)
}

export async function fetchReports() {
  if (!supabase) return fallbackReports

  const { data, error } = await supabase.from('reports').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching reports:', error)
    return fallbackReports
  }

  return (data || []).map(normalizeReport)
}

export async function createReport(payload) {
  if (!supabase) return null

  const { data, error } = await supabase.from('reports').insert(payload).select().single()
  if (error) {
    console.error('Error creating report:', error)
    return null
  }

  return normalizeReport(data)
}

export async function fetchProfileByEmail(email) {
  if (!supabase) return fallbackProfile

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle()

  if (error) {
    console.error('Error fetching profile by email:', error)
    return fallbackProfile
  }

  return normalizeProfile(data || {})
}

export async function fetchProfile(username = 'mrojas') {
  if (!supabase) return fallbackProfile

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .maybeSingle()

  if (error) {
    console.error('Error fetching profile:', error)
    return fallbackProfile
  }

  return normalizeProfile(data || {})
}

export async function loginByUsername(username) {
  if (!supabase) return { user: fallbackProfile, ok: true }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .maybeSingle()

  if (error || !data) {
    return { user: null, ok: false }
  }

  return { user: normalizeProfile(data), ok: true }
}

export async function doLogin(email, password) {
  if (!supabase) {
    return { user: fallbackProfile, ok: true }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data.user) {
    return { user: null, ok: false, error: error?.message || 'Credenciales inválidas' }
  }

  const profile = await fetchProfileByEmail(data.user.email)
  return { user: profile, ok: true }
}

export async function doLogout() {
  if (!supabase) return true
  const { error } = await supabase.auth.signOut()
  return !error
}

export async function getCurrentSessionUser() {
  if (!supabase) {
    const cached = JSON.parse(sessionStorage.getItem('mineriaCurrentUser') || 'null')
    return cached || fallbackProfile
  }

  const { data } = await supabase.auth.getUser()
  if (!data.user) {
    const cached = JSON.parse(sessionStorage.getItem('mineriaCurrentUser') || 'null')
    return cached || fallbackProfile
  }

  const profile = await fetchProfileByEmail(data.user.email)
  return profile
}
