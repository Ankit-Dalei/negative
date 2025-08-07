import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from "react-router";

const NavCombo = () => {
  const [auth,setAuth]=useState(false)
  const [role,setRole]=useState('guest')
  useEffect(()=>{
      setAuth(localStorage.getItem('authToken'))
      setRole(localStorage.getItem('role'))
    },[])
  return (
    <>
        <Header role={role} auth={auth}/>
        <Outlet/>
        <Footer role={role} auth={auth}/>
    </>
  )
}

export default NavCombo
