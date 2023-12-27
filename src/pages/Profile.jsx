import React, { useContext } from 'react'
import { Context,server } from '../main';

const Profile = () => {
  const { isAuthenticated , loading , user } = useContext(Context);
  return (
    loading ?<div className='loader'>Loading...</div>:
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}

export default Profile