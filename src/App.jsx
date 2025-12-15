import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Pages/Home'
import About from './Components/Pages/About'
import Crafts from './Components/Pages/Crafts'
import FindCraft from './Components/Pages/FindCraft'
import Register from './Components/Register'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppContent() {

   const location = useLocation();
  const isHome = location.pathname === "/"; 

  return (
    <>
      <Navbar isHome={isHome} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/crafts" element={<Crafts />} />
        <Route path="/findcraft" element={<FindCraft />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

      </Routes>
 

    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
