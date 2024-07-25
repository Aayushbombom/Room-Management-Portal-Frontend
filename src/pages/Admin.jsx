import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom';

const Admin = () => {
    const NavItems = ["Rooms", "Users", "SignOut"];
    const NavRefs = ["admin", "admin/userlist" , ""];
  return (
    <>
        <Navbar NavItems={NavItems} NavRefs={NavRefs}/>
        <Outlet />
    </>
  )
}

export default Admin