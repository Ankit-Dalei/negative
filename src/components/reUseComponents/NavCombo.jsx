import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from "react-router";

const NavCombo = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default NavCombo
