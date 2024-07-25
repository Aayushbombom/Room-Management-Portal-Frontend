import React from 'react'
import './App.css'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'


const App = () => {
  const NavItems = ["Home", "Login", "Signup"];
  const NavRefs = ["", "login" , "signup"];
  return (
    <>
      <Navbar NavItems={NavItems} NavRefs={NavRefs}/>
      <Outlet />
    </>
      
  )
}

export default App