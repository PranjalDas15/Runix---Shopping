"use client";

import Form from "@/components/adminComponents/AddProducts/Form";
import SizeAndQuantity from "@/components/adminComponents/AddProducts/SizeAndQuantity";
import productSchema from "@/schemas/productSchema";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { Product } from "@/types/Product";
import Image from "next/image";

const Page = () => {
  const [isNext, setIsNext] = useState<boolean>(false);
  const [formState, setFormState] = useState<Product>({
    _id: '',
    productBrand: "",
    productName: "",
    productDesc: "",
    productImage: [],
    gender: "Select a gender",
    category: "Select a category",
    price: 0,
    discountPercent: 0,
    size: "",
    quantity: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);

  const [errors, setErrors] = useState<{ [key in keyof Product]?: string }>({});
  
  const removeProduct = (size: string) => {
    setProducts(products.filter((p) => p.size !== size));
  };

  const handleNext = () => {
    try {
      
      productSchema.parse(formState);
      setErrors({});
      if (formState.productImage.length === 0) {
        setErrors({ ...errors, productImage: "Need at least one image." });
        return;
      }
      
      setIsNext((prev)=>!prev);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key in keyof Product]?: string } = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof Product;
          fieldErrors[fieldName] = err.message;
          console.log(errors)
        });
        setErrors(fieldErrors);
        if(formState.productImage.length === 0){
          setErrors({ ...errors, productImage: "Need atleast one image." })
        }
      }
    }
  };

  return (
    <div className="p-3 w-full h-full flex flex-col gap-2">
      <div className="h-full w-full border bg-white xl:pt-5 p-3 rounded-xl">
        {isNext ? (
          <SizeAndQuantity
            formState={formState}
            setFormState={setFormState}
            products={products}
            setProducts={setProducts}
            size={size}
            setSize={setSize}
            quantity={quantity ?? 0}
            setQuantity={setQuantity}
            price={price ?? 0}
            isNext={isNext}
            setIsNext={setIsNext}
            setPrice={setPrice}
            discount={discount ?? 0}
            setDiscount={setDiscount}
          />
        ) : (
          <Form formState={formState} setFormState={setFormState} errors={errors} />
        )}
        <button
          onClick={(e) => {
            handleNext();
          }}
          className="px-3 py-2 flex items-center text-orange-400 group"
        >
          <div className="group-hover:translate-x-2 custom-transition">
            {isNext ? <ChevronLeft size={30} /> : <ChevronRight size={30} />}
          </div>
          <p className="text-gray-900 text-lg group-hover:translate-x-2 group-hover:opacity-0 custom-transition">
            {isNext ? "Back" : "Next"}
          </p>
        </button>
      </div>

      <div className={`w-full h-full flex-col gap-2 ${!isNext ? 'hidden':'flex'}`}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              className="bg-orange-50 rounded-xl p-2 grid grid-cols-4 gap-2 relative cursor-pointer hover:bg-slate-100 custom-transition"
              key={index}
            >
              <div className="row-span-2 border w-full h-2w-full overflow-hidden rounded-lg">
                <Image
                  src={product.productImage[0]}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 row-span-2  flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">
                    {product.productBrand}
                  </p>
                  <p className="text-[10px] px-2 rounded-full border border-orange-400">
                    {product.category}
                  </p>
                  <p className="text-[10px] bg-orange-400 text-white rounded-full px-1 font-semibold">
                    {product.size}
                  </p>
                  <p className="text-[10px] font-semibold">{product.gender}</p>
                </div>
                <p className="text-sm font-light text-gray-700">
                  {product.productName}
                </p>
                <p className="text-gray-500 text-[12px] rounded-lg h-full p-1 bg-white">
                  {product.productDesc.slice(0, 250)}
                  {product.productDesc.length > 20 && "..."}
                </p>
              </div>
              <div className="flex flex-col justify-between gap-0 text-sm row-span-2">
                <p className="text-sm text-gray-500">x{product.quantity}</p>
                <div>
                  <p className="text-orange-400 text-sm">
                    {product.discountPercent}% OFF
                  </p>
                  <p className="font-bold text-xl">₹{product.price}</p>
                </div>
              </div>

              <button
                className="absolute top-2 right-2 hover:text-red-500 hover:rotate-90 custom-transition"
                onClick={() => removeProduct(product.size)}
              >
                <X />
              </button>
            </div>
          ))
        ) : (
          <div className="w-full h-full bg-slate-50 rounded-xl flex justify-center items-center">
            <p className="text-xl font-semibold text-gray-500">
              No product added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
