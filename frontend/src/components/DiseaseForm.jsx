import React, { useState } from 'react'
export default function DiseaseForm({ onSubmit }){
  const [file, setFile] = useState(null)
  return (
    <form onSubmit={e=>{e.preventDefault(); if(file) onSubmit(file)}}>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
      <button style={{marginLeft:8}}>Analyze</button>
    </form>
  )
}