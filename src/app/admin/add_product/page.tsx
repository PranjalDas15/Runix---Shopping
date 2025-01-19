"use client";

import Form from "@/components/adminComponents/AddProducts/Form";
import SizeAndQuantity from "@/components/adminComponents/AddProducts/SizeAndQuantity";
import { useAppSelector } from "@/lib/hooks";
import productSchema from "@/schemas/productSchema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import User from "@/models/User";
import { Product } from "@/types/Product";

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

  const [errors, setErrors] = useState<{ [key in keyof Product]?: string }>({});

  useEffect(()=>{
    console.log("Products:", products);
    console.log("Form:", formState);
  }, [formState, products])

  const handleNext = () => {
    try {
      if (formState.productImage.length === 0) {
        setErrors({ ...errors, productImage: "Need at least one image." });
        return;
      }
      productSchema.parse(formState);
      setErrors({});
      setIsNext((prev)=>!prev);
    } catch (error) {
      if (error instanceof z.ZodError && formState.productImage.length === 0) {
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
    <div className="p-3 w-full flex flex-col gap-2">
      <h1 className="text-xl md:text-2xl font-semibold py-3">Add Products</h1>
      <div className="md:w-[70vw] md:min-h-[40vh] border bg-white xl:pt-5 p-3 rounded-xl">
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
    </div>
  );
};

export default Page;
