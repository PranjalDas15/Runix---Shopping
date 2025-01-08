'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { redirect } from 'next/navigation';

const page = () => {
  const {user} = useAppSelector((state)=>state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(()=> {
    if(!user) {
      redirect('/login')
    }
  }, [dispatch])
  return (
    <div>
  <h3>Your Wishlist</h3>
</div>

  )
}

export default page