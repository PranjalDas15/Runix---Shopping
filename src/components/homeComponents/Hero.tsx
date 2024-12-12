import { advertise1, banners, categories, images } from '@/lib/assets'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Button from '../ui/Button'

const Hero = () => {

useEffect(()=>{
  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        entry.target.classList.add('hero');
      } else {
        entry.target.classList.remove('hero')
      }
    })
  })
  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        entry.target.classList.add('hero2');
      } else {
        entry.target.classList.remove('hero2')
      }
    })
  })

  const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        entry.target.classList.add('hero3');
      } else {
        entry.target.classList.remove('hero3')
      }
    })
  })

  const observer4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        entry.target.classList.add('hero4');
      } else {
        entry.target.classList.remove('hero4')
      }
    })
  })

  const hiddenElements1 = document.querySelectorAll('.hero_no');
  const hiddenElements2 = document.querySelectorAll('.hero_no2');
  const hiddenElements3 = document.querySelectorAll('.hero_no3');
  const hiddenElements4 = document.querySelectorAll('.hero_no4');

  hiddenElements1.forEach((el) => observer1.observe(el))
  hiddenElements2.forEach((el) => observer2.observe(el))
  hiddenElements3.forEach((el) => observer3.observe(el))
  hiddenElements4.forEach((el) => observer4.observe(el))

  
return () => {
  hiddenElements1.forEach((el) => observer1.observe(el));
  hiddenElements2.forEach((el) => observer2.observe(el));
  hiddenElements3.forEach((el) => observer3.observe(el));
  hiddenElements4.forEach((el) => observer4.observe(el));
}
}, [])

  return (
      <div className='relative flex flex-col justify-center items-center w-full h-[100vh] snap-center bg-fixed bg-[url("/banner2.jpg")] bg-cover bg-no-repeat bg-center'>
        <div className='h-[60%] flex flex-col items-center justify-center'>
          <span className='flex items-center justify-center w-full text-wrap'>  
            <p className='hero_no2 font-black text-[5rem] md:text-[10rem] text-transparent'>SALE</p>
          </span>
          <span className='flex items-center justify-center w-full text-wrap'>
            <p className='hero_no font-black text-[5rem] md:text-[10rem] text-white'>SALE</p>
          </span>
          <span className='flex items-center justify-center w-full text-wrap'>
            <p className='hero_no3 font-black text-[5rem] md:text-[10rem] text-transparent'>SALE</p>
          </span>
        </div>
        <div className='h-[40%] w-full text-2xl text-center text-white py-5'>
          <p className='hero_no4 pt-2'>Get your favourite shoes for upto <span className='font-bold'>70% off</span> !</p>
          <p className='hero_no4 pt-2'>Grab them before they are gone !!</p>
          <div className='w-full flex justify-center hero_no4 pt-5'>
            <Button label='Explore' extras={'scale-125 -translate-x-2'}/>
          </div>
        </div>
      </div>
  )
}

export default Hero