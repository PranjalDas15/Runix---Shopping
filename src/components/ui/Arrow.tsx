import React from 'react'

const Arrow = () => {
  return (
    <div className='w-[18px] flex justify-center custom-transition'>
      <div className='relative w-full'>
        <div className='absolute -top-[1px] left-[3px] w-[8px] h-[2px] bg-black -rotate-45'></div>
        <div className='absolute -top-[1px] right-[3px] w-[8px] h-[2px] bg-black rotate-45'></div>
      </div>
    </div>
  )
}

export default Arrow