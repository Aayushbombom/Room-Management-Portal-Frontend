import React, { useContext } from 'react'
import { userContext } from '@/pages/User';
import userImage from '../assets/user-image.png';
import editIcon from '../assets/editicon.svg';
const ProfilePage = () => {
  const userDetails = useContext(userContext);
  console.log(userDetails);
  return (
    <>
    
      <div className="mx-auto my-20 text-center max-w-md">
        <div className="mx-auto rounded-full max-w-40 overflow-clip">
           <img src= {userImage} className="rounded-full border-2 border-grey-400"/>
        </div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-10">User Details</h2>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{userDetails.name}</h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{userDetails.email}</h4>
      </div>
    </>
    
  )
}

export default ProfilePage