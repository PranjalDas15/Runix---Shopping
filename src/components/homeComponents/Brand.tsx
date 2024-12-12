import { advertise1, banners, categories, images } from '@/lib/assets'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const Hero = () => {

useEffect(()=>{
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        entry.target.classList.add('brandLogoAppear');
      } else {
        entry.target.classList.remove('brandLogoAppear')
      }
    })
  })

  const hiddenElements = document.querySelectorAll('.brandLogo');
  hiddenElements.forEach((el) => observer.observe(el))

  
  return (
    hiddenElements.forEach((el) => observer.observe(el))
  )
}, [])

  return (
      <div className='relative w-full h-[100vh] snap-center  bg-fixed  bg-cover bg-no-repeat bg-center'>
        <video src="/herovid.mp4" loop autoPlay muted className="absolute top-0 z-0 w-full h-full object-cover bg-fixed"></video>
        <div className='relative flex flex-col justify-center items-center overflow-hidden h-full w-full'>
          <Image alt='hero' src={images.logowhite} width={500} height={500} className='object-cover w-1/2 md:w-1/3 brandLogo'/>
          <p className='text-xl md:text-[40px] text-white font-bold brandLogo'>Every Run is a Win </p>
        </div>
      </div>
  )
}

export default Hero