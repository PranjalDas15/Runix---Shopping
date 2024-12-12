'use client'

import Shop from '@/components/shopComponents/Shop';
import { useProductContext } from '@/Context/productContext';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

interface Props {
    value: any;
}

interface Product {
    _id: any,
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

  interface Props {
    params: Promise<{gender: string, category: string}>;
}

const page = ({params}: Props) => {
  
    const pathname = usePathname();
    const param = use(params);
    const pathParts = pathname?.split('/').filter(Boolean);
    console.log(pathParts)

    const { products, genderValue } = useProductContext();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const fetchProduct = () => {
            const filtered = products.filter((p) => p.gender === genderValue);
            setFilteredProducts(filtered)
          };
        fetchProduct();
    }, [products, genderValue]);


  return (
    <div className='bg-white pb-10 w-full h-full'>
      <div className='flex gap-1 text-[12px] pb-2'>
        <Link href={`/`} className='text-orange-400'>Home</Link> {'/'}
        <p>{param.gender}</p>
      </div>
      <Shop value={filteredProducts} heartButton={true}/>
    </div>
  )
}

export default page