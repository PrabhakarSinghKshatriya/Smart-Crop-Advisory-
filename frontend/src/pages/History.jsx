import React, { useEffect, useState } from 'react'
import { history } from '../services/api'

export default function History(){
  const [rows, setRows] = useState([])
  useEffect(()=>{(async()=>{ setRows(await history()) })()}, [])
  return (
    <div style={{maxWidth:900,margin:'20px auto',fontFamily:'system-ui'}}>
      <h2>Your History</h2>
      {!localStorage.getItem('token') && <p>Login to see your history.</p>}
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr><th style={{borderBottom:'1px solid #ddd',textAlign:'left'}}>When</th><th style={{borderBottom:'1px solid #ddd',textAlign:'left'}}>Type</th><th style={{borderBottom:'1px solid #ddd',textAlign:'left'}}>Payload</th><th style={{borderBottom:'1px solid #ddd',textAlign:'left'}}>Result</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}>
              <td style={{borderBottom:'1px solid #eee',padding:'6px 4px'}}>{r.created_at}</td>
              <td style={{borderBottom:'1px solid #eee'}}>{r.type}</td>
              <td style={{borderBottom:'1px solid #eee',fontSize:12,wordBreak:'break-word'}}>{r.payload}</td>
              <td style={{borderBottom:'1px solid #eee',fontSize:12,wordBreak:'break-word'}}>{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}