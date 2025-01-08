import { setCategoryValue } from '@/lib/features/productSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Value {
    type: string;
    value: string;
    image: StaticImageData;
}

interface Props {
    value: Value[];
    gender: string;
}

const CategoryMenu:React.FC<Props> = ({value, gender}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { categoryValue } = useAppSelector((state:RootState) => state.products); 
  return (
    <div className='w-full bg-white grid grid-cols-5 gap-2 px-5 py-3 justify-items-center justify-center overflow-hidden'>
        {value.map((v, index)=>(
            <button key={index} onClick={()=>{router.push(`/shop?gender=${gender.toLowerCase()}`); dispatch(setCategoryValue(v.value.toLowerCase()))}} className='relative w-full h-[100px] peer overflow-hidden flex items-center justify-center text-xl'>
                <p className='absolute top-0 w-full h-full flex items-center justify-center text-xl font-semibold text-white custom-transition bg-[rgba(0,0,0,0.5)] hover:bg-transparent'>{v.type}</p>
                <Image alt='' src={v.image} className='w-full h-full object-cover'/>
            </button>
        ))}
    </div>
  )
}

export default CategoryMenu