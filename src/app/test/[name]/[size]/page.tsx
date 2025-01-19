'use client'

import { useAppSelector } from '@/lib/hooks';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const params = useParams();
    const {products, loading} = useAppSelector((state)=>state.products)

    const product = products.find((product) => product.productName.replace(/\s+/g, '') === params.name && product.size === params.size)

  return (
    <div className='pt-[70px]'>
      {product?.productName}
      {params.name}
    </div>
  )
}

export default page