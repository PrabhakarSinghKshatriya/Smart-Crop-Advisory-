import React, { useState } from 'react'
export default function CropForm({ onSubmit }){
  const [soil_type, setSoil] = useState('alluvial')
  const [season, setSeason] = useState('kharif')
  const [temperature_c, setTemp] = useState('')
  const [rainfall_mm, setRain] = useState('')
  const [state, setState] = useState('Uttar Pradesh')
  return (
    <form onSubmit={e=>{e.preventDefault(); onSubmit({ soil_type, season, temperature_c: temperature_c? parseFloat(temperature_c):null, rainfall_mm: rainfall_mm? parseFloat(rainfall_mm):null, state })}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
        <label>Soil Type
          <select value={soil_type} onChange={e=>setSoil(e.target.value)}>
            <option value="alluvial">Alluvial</option><option value="black">Black</option><option value="red">Red</option><option value="laterite">Laterite</option><option value="sandy">Sandy</option>
          </select>
        </label>
        <label>Season
          <select value={season} onChange={e=>setSeason(e.target.value)}><option value="kharif">Kharif</option><option value="rabi">Rabi</option></select>
        </label>
        <label>Temperature (°C)
          <input type="number" step="0.1" value={temperature_c} onChange={e=>setTemp(e.target.value)} placeholder="e.g. 28"/>
        </label>
        <label>Rainfall (mm)
          <input type="number" step="0.1" value={rainfall_mm} onChange={e=>setRain(e.target.value)} placeholder="e.g. 120"/>
        </label>
        <label>State (optional)
          <input value={state} onChange={e=>setState(e.target.value)} />
        </label>
      </div>
      <button style={{marginTop:12}}>Get Recommendations</button>
    </form>
  )
}