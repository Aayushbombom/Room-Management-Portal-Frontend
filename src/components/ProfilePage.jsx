import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { userContext } from '@/pages/User';
import userImage from '../assets/user-image.png';
import editIcon from '../assets/editicon.svg';
const ProfilePage = () => {
  const userDetails = useContext(userContext);
  console.log(userDetails);
  const edit = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
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