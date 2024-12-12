'use client'

import Carousel from '@/components/homeComponents/Carousel';
import Loading from '@/components/Loading';
import Shop from '@/components/shopComponents/Shop';
import { useProductContext } from '@/Context/productContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

interface Props {
    params: Promise<{gender: string, category: string}>;
}

interface Product {
    _id: Object;
    productName: string;
    productDesc: string;
    productImage: string[]; 
    category: string;
    quantity: number;
    price: number;
    size: string;
    discountPercent: number;
    gender: string;
  }

const page = ({params}: Props) => {
    const param = use(params);
    const { products, categoryValue, loading } = useProductContext();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProduct = () => {
            if(param.gender){
                const filterByGender = products.filter((p)=> p.gender === param.gender)
                const filteredByCategory = filterByGender.filter((p) => p.category === categoryValue);
                setFilteredProducts(filteredByCategory)
            }
          };
        fetchProduct();
    }, [products, categoryValue]);


  return (
    <div> 
      {loading ? <Loading/> : 
      <div className='bg-white pb-10 w-full h-full'>
      <div className='flex gap-1 text-[12px] pb-2'>
        <Link href={`/`} className='text-orange-400'>Home</Link> {'/'}
        <Link href={`/shop/${param.gender}`} className='text-orange-400'>{param.gender}</Link> {'/'}
        <p>{param.category}</p>
      </div>
      <Shop value={filteredProducts} heartButton={true}/>
    </div>
    }
    </div>
  )
}

export default page