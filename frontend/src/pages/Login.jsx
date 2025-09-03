import React, { useState } from 'react'
import { login } from '../services/api'

export default function Login(){
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('test123')
  const [msg, setMsg] = useState('')

  return (
    <div style={{maxWidth:420,margin:'40px auto',fontFamily:'system-ui'}}>
      <h2>Login</h2>
      <form onSubmit={async e=>{e.preventDefault(); const res=await login(email,password); if(res.token){localStorage.setItem('token',res.token); setMsg('Logged in!')} else {setMsg(res.detail || 'Failed')}}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block',width:'100%',marginBottom:8}}/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:'block',width:'100%',marginBottom:8}}/>
        <button>Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}