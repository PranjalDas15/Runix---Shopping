'use client'

import Loading from "@/components/Loading";
import Arrow from "@/components/ui/Arrow";
import { useSingleProduct } from "@/Context/singleProductContext";
import { useUser } from "@/Context/userContext";
import { ArrowLeft, Check, Heart, ShoppingCart, Smartphone, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


const ProductPage = () => {
  const { addToWishlist, currnetUser, addToCart } = useUser()
  const searchParams = useSearchParams();
  const router = useRouter();
  const { product, loading, error } = useSingleProduct();
  const id = searchParams?.get("id");

  const discountedPrice = (price:number , discount:number) => {
    const discountedAmmount = (price * discount) / 100 ;
    return price - discountedAmmount; 
  }

  const estimateDate = () => {
    const currentDate = new Date().toString().slice(0,10);
    return currentDate;
  }


  useEffect(() => {
    if (!id) return;
  }, [id]);

  return (
    <>
      {loading ? <Loading/> : 
      <div className="w-full bg-white pt-[70px]">
      <button className="mx-4" onClick={()=>router.back()}>
        <ArrowLeft/>
      </button>
      { product ? 
      <div className="w-full h-full p-4 flex flex-col lg:flex-row gap-2">
        <div className="md:w-full flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-visible relative">
          {product.productImage.map((image, index) => (
            <div key={index} className="border border-gray-200 rounded-md overflow-hidden min-w-[90vw] md:min-w-full">
              <Image
                key={index}
                src={image}
                alt={`${product.productName} - ${index + 1}`}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
          
        </div>
        <div className="w-full px-3">
          <div className="py-3 border-b-2">
            <h1 className="text-3xl font-bold pb-2">{product.productName}</h1>
            <p className="text-gray-600 text-xl">{product.productDesc}</p>
          </div>
          <div>
            <div className="flex gap-3 py-3 md:text-2xl">
              <p className="text-gray-800 font-bold">₹{discountedPrice(product.price, product.discountPercent)}</p>
              <p className="text-gray-400">MRP <span className="line-through">₹{product.price}</span></p>
              <p className="text-red-500 font-semibold">( {product.discountPercent}% OFF )</p>
            </div>
            <p className="text-green-600 font-bold">Inclusive of all taxes</p>
          </div>

          <div className="flex flex-col gap-2 pt-5">
            <p className="font-bold text-xl">Select Size</p>
            <div className="flex">
              <p className="border max-w-10 py-2 px-4 flex items-center justify-center cursor-pointer hover:bg-slate-100">{product.size}</p>
            </div>
          </div>
          
          <div className="flex gap-2 py-4 border-b-2">

            <button onClick={()=>addToWishlist(product._id)} disabled={currnetUser?.wishlist && currnetUser.wishlist.some((p)=>p === product._id)} className={`w-full md:max-w-[300px] border py-4 flex items-center justify-center gap-3 bg-orange-400 border-orange-400  group custom-transition ${currnetUser?.wishlist.find((p)=>p) ? 'cursor-not-allowed opacity-80':'md:hover:bg-transparent active:bg-transparent'}`}>
              <Heart size={20} className={`text-white  fill-current custom-transition ${currnetUser?.wishlist.find((p)=>p) ? '':'md:group-hover:text-orange-400'}`}/>
              <p className={`text-sm md:text-xl text-white custom-transition ${currnetUser?.wishlist?.find((p)=>p) ? '':'md:group-hover:text-black'}`}>{currnetUser?.wishlist.find((p)=>p) ? 'Added to Wishlist' : 'Add to Wishlist'}</p>    
            </button>

            <button onClick={()=>addToCart(product._id, 1)} disabled={currnetUser?.cart?.some((p)=>p.product._id === product._id)} className={`w-full md:max-w-[300px] border py-4 flex items-center justify-center gap-3 bg-black border-black  group custom-transition ${currnetUser?.cart.some((p)=>p.product._id === product._id) ? 'cursor-not-allowed opacity-80':'md:hover:bg-transparent active:bg-transparent'}`}>
              <ShoppingCart size={20} className={`text-white  fill-current custom-transition ${currnetUser?.cart.some((p)=>p.product._id === product._id) ? '':'md:group-hover:text-black'}`}/>
              <p className={`text-sm md:text-xl text-white custom-transition ${currnetUser?.cart?.some((p)=>p.product._id === product._id) ? '':'md:group-hover:text-black'}`}>{currnetUser?.cart.some((p)=>p.product._id === product._id) ? 'Added to Cart' : 'Add to Cart'}</p>    
            </button>
          </div>
          <div className="py-3 flex flex-col gap-3 font-semibold">
            <div className="flex gap-2">
              <Truck/>
              <p>Get it by {estimateDate()}</p>
            </div>
            <div className="flex gap-2">
              <Smartphone/>
              <p>Pay on Delivery available</p>
            </div>
            <div className="flex gap-2">
              <Check/>
              <p>Easy 15 days return and exchange available</p>
            </div>
          </div>

          <div className="border-y-2">
            <p className="text-xl font-semibold py-3">Product Details</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore temporibus sit deleniti, voluptatum neque quam vero pariatur et veniam consequatur tenetur doloribus praesentium recusandae blanditiis quidem culpa! A, aliquid nulla aperiam unde magni ex eius dolorem, quasi hic, praesentium labore perferendis temporibus. Placeat, est amet?</p>
          </div>
        </div>
      </div> : <></>}
    </div>}
    </>
  );
};

export default ProductPage;
