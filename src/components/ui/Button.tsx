import { ArrowUpRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React, { ReactNode } from 'react'

type Label= {
    children: ReactNode;
    extras?: string;
    onCLickHandler?: () => void;
}
    

const Button:React.FC<Label> = ( {children, extras, onCLickHandler} ) => {
  return (
    <div className='w-[120px] h-[40px]'>
        <button onClick={onCLickHandler} className={`${extras} origin-left w-full h-full relative flex items-center justify-center gap-2 text-xl font-semibold px-3 py-2 text-black bg-white custom-transition overflow-hidden group hover:rounded-3xl`}>
            <ArrowUpRight className='w-full h-full custom-transition group-hover:translate-x-[40px] group-hover:scale-150 group-hover:text-white  group-hover:rotate-45 z-10'/>
            <p className='custom-transition group-hover:translate-x-full group-hover:opacity-0 z-10'>{children}</p> 
          <div className='absolute custom-transition -translate-x-full group-hover:translate-x-0 top-0 left-0 w-full h-full bg-black'></div>
        </button>
    </div>
  )
}

export default Button