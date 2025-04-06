import React from 'react'
import ProfileEdit from './ProfileEdit'
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((store)=>store.user);
  return (
    user && ( <div className='flex items-center justify-center my-5'>
      <ProfileEdit user = {user}/>
     </div>)
  )
}

export default Profile
