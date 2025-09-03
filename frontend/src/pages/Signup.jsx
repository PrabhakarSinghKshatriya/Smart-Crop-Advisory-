import React, { useState } from 'react'
import { signup } from '../services/api'

export default function Signup(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  return (
    <div style={{maxWidth:420,margin:'40px auto',fontFamily:'system-ui'}}>
      <h2>Signup</h2>
      <form onSubmit={async e=>{e.preventDefault(); const res=await signup(email,password); setMsg(res.email? 'Registered, please login.' : (res.detail || 'Failed'))}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block',width:'100%',marginBottom:8}}/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:'block',width:'100%',marginBottom:8}}/>
        <button>Create Account</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}