import Navbar from '@/components/Navbar'
import React, { createContext } from 'react'
import { Outlet, redirect, useLoaderData } from 'react-router-dom'

export const userContext = createContext();
const User = () => {

    const NavItems = ["Dashboard", "Book", "Profile", "SignOut"];
    const NavRefs = ["user", "user/book" , "user/profile", ""];
    const userDetails = useLoaderData();
    
  return (
    <>
        <Navbar NavItems={NavItems} NavRefs={NavRefs} />
        <userContext.Provider value={userDetails}>
          <Outlet/>
        </userContext.Provider>
    </>
  )
}

export default User

export const userLoader = async () => {

   try{
      const res = await fetch(`http://localhost:5000/api/user`,{
        headers: {"content-type": "application/json"},
        credentials: 'include',
      });

      return res.json();
   }
   catch(e){
      return redirect('/');
   }

   return null;
}