import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './pages/App'
import Login from './pages/Login'
import Signup from './pages/Signup'
import History from './pages/History'

function Shell(){
  return (
    <BrowserRouter>
      <nav style={{display:'flex',gap:12,padding:12,borderBottom:'1px solid #ddd'}}>
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Shell/>)