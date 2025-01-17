import { categoriesMale, customerPolicies, keepInTouch } from '@/lib/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-full py-5 px-3 text-white bg-orange-400 snap-start'>
      <div className='w-full grid grid-cols-2 md:grid-cols-3 justify-items-center gap-4 md:gap-0'>
        <div className=''>
          <h1 className='text-lg font-semibold'>Shopping</h1>
          {categoriesMale.map((category, index)=>(
            <div key={index} className='hover:underline'>
              <Link href={''}>{category.type}</Link>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-3'>
          <div>
            <h1 className='text-lg font-semibold'>Customer Policies</h1>
            {customerPolicies.map((policy, index)=>(
              <div key={index} className='hover:underline'>
                <Link href={''}>{policy.type}</Link>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-lg font-semibold'>Keep in Touch</h1>
            <div className='flex gap-2'>
            {keepInTouch.map((kit, index)=>(
                <a href={kit.name} key={index}>
                  <Image alt='logo' src={kit.logo} width={25} height={25}/>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3 items-center col-span-2 md:col-span-1'>
          <Image src={"/Logotextfullwhite.svg"} alt='' height={150} width={150} className='object-contain'/>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <Image alt='' src={"/guarantee.svg"} width={50} height={50}/>
              <p className='font-semibold text-xl md:text-2xl'>100% original products on Runix</p>
            </div>
            <div className='flex gap-2 items-center'>
              <Image alt='' src={"/return.svg"} width={50} height={50}/>
              <p className='font-semibold text-xl md:text-2xl'>15 days return policy</p>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t-2 mt-5 py-2'>
          <p className='text-center'>© 2024 Runics All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer