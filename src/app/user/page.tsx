'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { redirect } from 'next/navigation';
import Loading from '@/components/Loading';

const page = () => {
  const {user, loading} = useAppSelector((state)=>state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(()=> {
    if(user && !loading) {
      if(user === undefined || null){
        redirect('/login')
      }
    }
  }, [dispatch])
  return (
    <div>
    <h3>Your Wishlist</h3>
</div>

  )
}

export default page