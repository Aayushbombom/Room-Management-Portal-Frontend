import React, { useContext } from 'react'
import { userContext } from '@/pages/User';
import userImage from '../assets/user-image.png';
import editIcon from '../assets/editicon.svg';
import UserHistory from './Admin/UserHistory';
import { Button } from './ui/button';
const ProfilePage = () => {
  const userDetails = useContext(userContext);
  return (
    <>
    
      <div className="mx-auto my-20 text-center max-w-md space-y-10">
        <div className="mx-auto rounded-full max-w-40 overflow-clip">
           <img src= {userImage} className="rounded-full border-2 border-grey-400"/>
        </div>
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-10">User Details</h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{userDetails.name}</h4>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{userDetails.email}</h4>
        </div>
        <UserHistory userID={userDetails.id} className="">
            <Button>View Booking History</Button>
        </UserHistory>
      </div>
    </>
    
  )
}

export default ProfilePage