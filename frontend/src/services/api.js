const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

function authHeaders() {
  const t = localStorage.getItem('token')
  return t ? { Authorization: `Bearer ${t}` } : {}
}

export async function signup(email, password){
  const r = await fetch(`${BASE}/auth/signup`, {method:'POST',headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})})
  return r.json()
}
export async function login(email, password){
  const r = await fetch(`${BASE}/auth/login`, {method:'POST',headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})})
  return r.json()
}
export async function recommendCrops(payload){
  const r = await fetch(`${BASE}/recommend-crops`, {method:'POST',headers:{'Content-Type':'application/json', ...authHeaders()}, body:JSON.stringify(payload)})
  return r.json()
}
export async function detectDisease(file){
  const form = new FormData()
  form.append('file', file)
  const r = await fetch(`${BASE}/detect-disease`, {method:'POST', headers:{...authHeaders()}, body:form})
  return r.json()
}
export async function askBot(text){
  const r = await fetch(`${BASE}/ask-bot`, {method:'POST', headers:{'Content-Type':'application/json', ...authHeaders()}, body:JSON.stringify({text})})
  return r.json()
}
export async function weather(lat, lon){
  const r = await fetch(`${BASE}/weather`, {method:'POST', headers:{'Content-Type':'application/json', ...authHeaders()}, body:JSON.stringify({lat,lon})})
  return r.json()
}
export async function history(){
  const r = await fetch(`${BASE}/history`, {headers:{...authHeaders()}})
  return r.json()
}