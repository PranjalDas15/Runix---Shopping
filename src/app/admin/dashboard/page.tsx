'use client'

import { sellerSignOut, signOut } from '@/app/login/actions';
import { useAppDispatch } from '@/lib/hooks'
import { redirect } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';

const page = () => {
  const dispatch = useDispatch();
  const handleSignout = async () => {
      const success = await sellerSignOut(dispatch);
      if (success) {
        redirect("/login");
      }
    };
  return (
    <div>
      <button onClick={()=>handleSignout()}>Logout</button>
    </div>
  )
}

export default page