"use client";

import Loading from "@/components/Loading";
import { fetchProducts } from "@/lib/actions/fetchProducts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  discountedPrice,
  handleAddtoCart,
  handleAddtoWishlist,
} from "@/lib/utils/utils";
import { Product } from "@/types/Product";
import {
  ArrowLeft,
  Check,
  Heart,
  ShoppingCart,
  Smartphone,
  Store,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { loading, error } = useAppSelector(
    (state) => state.products
  );
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    const fetchAndSetProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    }
    fetchAndSetProducts();
  }, []);

  const estimateDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    const newDate = currentDate.toString().slice(0, 10);
    return newDate;
  };
  const product = products.find(
    (product) =>
      product.productBrand.replace(/\s+/g, "") +
        product.productName.replace(/\s+/g, "") +
        product.size ===
      params?.name
  );

  const alreadyAdded = user?.wishlist?.find((p) => p._id === product?._id);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full bg-white pt-[70px]">
          <button className="mx-4" onClick={() => router.back()}>
            <ArrowLeft />
          </button>
          {product ? (
            <div className="w-full h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="w-full h-[40vh] md:h-[70vh] xl:h-[80vh] overflow-y-auto snap-mandatory snap-y">
                {product.productImage.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${product.productName} - ${index + 1}`}
                    width={900}
                    height={900}
                    className="object-cover w-full h-full snap-center"
                  />
                ))}
              </div>
              <div className="w-full px-3 border">
                <div className="py-3 border-b-2">
                  <h1 className="text-3xl font-bold pb-2">
                    {product.productBrand}
                  </h1>
                  <p className="text-gray-600 text-xl">{product.productName}</p>
                </div>
                <div>
                  <div className="flex gap-3 py-3 md:text-2xl">
                    <p className="text-gray-800 font-bold">
                      ₹{discountedPrice(product.price, product.discountPercent)}
                    </p>
                    <p className="text-gray-400">
                      MRP <span className="line-through">₹{product.price}</span>
                    </p>
                    <p className="text-red-500 font-semibold">
                      ( {product.discountPercent}% OFF )
                    </p>
                  </div>
                  <p className="text-green-600 font-bold">
                    Inclusive of all taxes
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-5">
                  <p className="font-bold text-xl">Select Size</p>
                  <div className="flex gap-2">
                    {products
                      .filter((p) => p.productName === product.productName)
                      .map((p, index) => {
                        const brand = product.productBrand.replace(/\s+/g, "");
                        const name = product.productName.replace(/\s+/g, "");
                        return (
                          <div  key={index}>
                            <Link
                            href={`/product/${brand+name+p.size}`}
                            className={`border max-w-10 py-2 px-4 flex items-center justify-center cursor-pointer  ${
                              p.size === product.size ? "text-white hover:none bg-orange-400" : "hover:bg-slate-100 text-gray-600"
                            }`}
                           
                          >
                            {p.size}
                          </Link>
                          <p className="text-[12px] text-orange-400">{p.quantity <=10 && "Few left"}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="flex gap-2 py-4 border-b-2">
                  <button
                    onClick={() => handleAddtoWishlist(product._id, dispatch)}
                    disabled={!!alreadyAdded}
                    className={`w-full md:max-w-[300px] border py-4 flex items-center justify-center gap-3 bg-orange-400 border-orange-400 group custom-transition ${
                      alreadyAdded
                        ? "cursor-not-allowed opacity-80"
                        : "md:hover:bg-transparent active:bg-transparent"
                    }`}
                  >
                    <Heart
                      size={20}
                      className={`text-white fill-current custom-transition ${
                        alreadyAdded ? "" : "md:group-hover:text-orange-400"
                      }`}
                    />
                    <p
                      className={`text-sm md:text-xl text-white custom-transition ${
                        alreadyAdded ? "" : "md:group-hover:text-black"
                      }`}
                    >
                      {alreadyAdded ? "Added to Wishlist" : "Add to Wishlist"}
                    </p>
                  </button>
                  <button
                    onClick={() => handleAddtoCart(product?._id, 1, dispatch)}
                    disabled={user?.cart?.some(
                      (p) => p.product._id === product._id
                    )}
                    className={`w-full md:max-w-[300px] border py-4 flex items-center justify-center gap-3 bg-black border-black  group custom-transition ${
                      user?.cart.some((p) => p.product._id === product._id)
                        ? "cursor-not-allowed opacity-80"
                        : "md:hover:bg-transparent active:bg-transparent"
                    }`}
                  >
                    <ShoppingCart
                      size={20}
                      className={`text-white  fill-current custom-transition ${
                        user?.cart.some((p) => p.product._id === product._id)
                          ? ""
                          : "md:group-hover:text-black"
                      }`}
                    />
                    <p
                      className={`text-sm md:text-xl text-white custom-transition ${
                        user?.cart?.some((p) => p.product._id === product._id)
                          ? ""
                          : "md:group-hover:text-black"
                      }`}
                    >
                      {user?.cart.some((p) => p.product._id === product._id)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </p>
                  </button>
                </div>
                <div className="py-3 flex flex-col gap-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <Truck />
                    <p>Get it by {estimateDate().toString()}</p>
                  </div>
                  <div className="flex items-center  gap-2">
                    <Smartphone />
                    <p>Pay on Delivery available</p>
                  </div>
                  <div className="flex items-center  gap-2">
                    <Check />
                    <p>Easy 15 days return and exchange available</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Store />
                    <Link href={`/shop/${product.seller.name}`} className="custom-transition hover:text-orange-400">{product.seller.name}</Link>
                  </div>
                </div>
                

                <div className="border-y-2">
                  <p className="text-xl font-semibold py-3">Product Details</p>
                  <p>{product.productDesc}</p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default ProductPage;
