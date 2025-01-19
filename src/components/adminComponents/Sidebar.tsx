'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const router = useRouter()
  return (
    <div>
      <button onClick={()=>router.push('/admin/add_product')} className='w-full py-2 border'>Add Product</button>
      <button onClick={()=>router.push('/admin/dashboard')} className='w-full py-2 border'>Dashboard</button>
    </div>
  )
}

export default Sidebar