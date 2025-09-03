import React, { useState } from 'react'
export default function ChatForm({ onSubmit }){
  const [text, setText] = useState('')
  return (
    <form onSubmit={e=>{e.preventDefault(); if(text.trim()) onSubmit(text)}}>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask in Hindi or English..." style={{width:'70%'}} />
      <button style={{marginLeft:8}}>Ask</button>
    </form>
  )
}