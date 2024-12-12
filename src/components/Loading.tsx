import { images } from '@/lib/assets'
import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen text-center flex flex-col items-center justify-center bg-black'>
        <div className='w-1/2 md:w-1/6'>
          <Image alt='' src={images.logowhite}/>
        </div>
        <div className='w-full flex flex-col items-center justify-center'>
          {/* <Loader2Icon className='animate-spin'/> */}
          <div className='text-[100px] text-white'>
            <span className='dot text-orange-400'>.</span>
            <span className='dot'>.</span>
            <span className='dot'>.</span>
          </div>
        </div>

        
    </div>
  )
}

export default Loading