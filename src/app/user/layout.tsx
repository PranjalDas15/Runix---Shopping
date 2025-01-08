'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
      const {user, loading} = useAppSelector((state)=>state.user);
      const dispatch = useAppDispatch();
    
      useEffect(()=> {
        if(!user && !loading) {
         
          redirect('/login')
        }
      }, [user, loading])
  return (
    <div>{children}</div>
    
  )
}

export default layout