import { useRouter } from 'next/navigation'
import React from 'react'

const OrderSuccess = () => {
    const router = useRouter();
  return (
    <div className='w-full min-h-[70vh] flex justify-center'>
        <div className='border w-screen md:w-[60vw] px-2 py-3 flex flex-col items-center justify-center gap-10'>
            <h1 className='text-center text-wrap text-[30px] md:text-[50px] font-bold'>Order have been placed.</h1>
            <div className='flex items-center justify-center'>
            <button className='border border-orange-400 py-3 px-2 hover:bg-orange-400 hover:text-white custom-transition' onClick={()=>router.push('/shop')}>
                Explore Shop
            </button>
            </div>
        </div>
    </div>
  )
}

export default OrderSuccess