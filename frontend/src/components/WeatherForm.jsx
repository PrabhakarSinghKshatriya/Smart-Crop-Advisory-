import React, { useState } from 'react'
export default function WeatherForm({ onSubmit }){
  const [lat, setLat] = useState('26.7606')
  const [lon, setLon] = useState('83.3732')
  return (
    <form onSubmit={e=>{e.preventDefault(); onSubmit(parseFloat(lat), parseFloat(lon))}}>
      <input value={lat} onChange={e=>setLat(e.target.value)} placeholder="Latitude"/>
      <input value={lon} onChange={e=>setLon(e.target.value)} placeholder="Longitude" style={{marginLeft:8}}/>
      <button style={{marginLeft:8}}>Get Weather</button>
    </form>
  )
}