import React, { useState } from 'react'
import CropForm from '../components/CropForm'
import DiseaseForm from '../components/DiseaseForm'
import ChatForm from '../components/ChatForm'
import WeatherForm from '../components/WeatherForm'
import { recommendCrops, detectDisease, askBot, weather } from '../services/api'

export default function App(){
  const [cropOut, setCropOut] = useState(null)
  const [diseaseOut, setDiseaseOut] = useState(null)
  const [botOut, setBotOut] = useState(null)
  const [wx, setWx] = useState(null)

  return (
    <div style={{fontFamily:'system-ui',padding:16,maxWidth:1000,margin:'0 auto'}}>
      <h1>🌾 Smart Crop Advisory </h1>
      <section style={{border:'1px solid #ddd',padding:16,borderRadius:12,marginBottom:16}}>
        <h2>1) Crop Recommendation</h2>
        <CropForm onSubmit={async (data)=> setCropOut(await recommendCrops(data))} />
        {cropOut && (<div style={{marginTop:12}}>
          <h3>Recommendations</h3>
          <ul>{cropOut.recommendations.map((c,i)=><li key={i}>{c}</li>)}</ul>
          <h3>Fertilizers</h3>
          <ul>{Object.entries(cropOut.fertilizers).map(([k,v])=> <li key={k}><b>{k}:</b> {v.join(', ')}</li>)}</ul>
        </div>)}
      </section>

      <section style={{border:'1px solid #ddd',padding:16,borderRadius:12,marginBottom:16}}>
        <h2>2) Disease Detection</h2>
        <DiseaseForm onSubmit={async (file)=> setDiseaseOut(await detectDisease(file))} />
        {diseaseOut && (<div style={{marginTop:12}}>
          <h3>Result: {diseaseOut.label}</h3>
          <pre style={{background:'#f7f7f7',padding:8,borderRadius:8}}>{JSON.stringify(diseaseOut.metrics, null, 2)}</pre>
          <ul>{diseaseOut.advice.map((a,i)=><li key={i}>{a}</li>)}</ul>
        </div>)}
      </section>

      <section style={{border:'1px solid #ddd',padding:16,borderRadius:12,marginBottom:16}}>
        <h2>3) Weather (lat/lon)</h2>
        <WeatherForm onSubmit={async (lat,lon)=> setWx(await weather(lat,lon))} />
        {wx && (<div style={{marginTop:12}}><pre style={{background:'#f7f7f7',padding:8,borderRadius:8}}>{JSON.stringify(wx, null, 2)}</pre></div>)}
      </section>

      <section style={{border:'1px solid #ddd',padding:16,borderRadius:12}}>
        <h2>4) FarmerBoot (Hindi/English)</h2>
        <ChatForm onSubmit={async (text)=> setBotOut((await askBot(text)).answer)} />
        {botOut && <p style={{marginTop:12,fontWeight:600}}>{botOut}</p>}
      </section>
    </div>
  )
}