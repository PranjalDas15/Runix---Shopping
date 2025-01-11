import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen text-center flex flex-col items-center justify-center backdrop:blur-sm'>
        <div className='w-1/2 md:w-1/12'>
          <Image alt='' width={900} height={900} src={'/Logotextblack.svg'} className='object-cover'/>
        </div>
        <div className='w-full flex flex-col items-center justify-center'>
          {/* <Loader2Icon className='animate-spin'/> */}
          <div className='text-[100px] text-black'>
            <span className='dot text-orange-400'>.</span>
            <span className='dot'>.</span>
            <span className='dot'>.</span>
          </div>
        </div>

        
    </div>
  )
}

export default Loading