"use client";

import { categories } from "@/lib/assets";
import { Product } from "@/types/Product";
import { Plus, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface Props {
  formState: Product;
  setFormState: React.Dispatch<React.SetStateAction<Product>>;
  errors: any;
}

const Form: React.FC<Props> = ({ formState, setFormState, errors }) => {
  const newCategories = [
    { type: "Select a category", value: "Select a category" },
    ...categories,
  ]
    .filter((category) => category.type !== "All")
    .flat();

  const handleRemoveImage = (image: string)=> {
    setFormState({
      ...formState,
      productImage: formState.productImage.filter((i) => i !== image),
    });
  }

  return (
    <div className="">
      <form className="grid grid-cols-1 px-2 py-3 gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Product Image</p>
            </div>
            <div className="flex flex-col gap-2">
              <CldUploadWidget
                onSuccess={(secure_url) => {
                  //@ts-ignore
                  const url = secure_url.info.secure_url;
                  setFormState((prevState) => ({
                    ...prevState,

                    productImage: [...prevState.productImage, url],
                  }));
                }}
                signatureEndpoint="/api/signing-image"
              >
                {({ open }) => {
                  return (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      className="w-60 h-36 border border-dashed border-gray-400 rounded-xl flex justify-center items-center hover:bg-orange-50 cursor-pointer bg-white"
                    >
                      <Plus className="text-gray-400" size={40} />
                    </button>
                  );
                }}
              </CldUploadWidget>
              {formState.productImage.length > 0 && (
                <div className="font-semibold flex flex-col gap-2">
                  <p>Images</p>
                  <div className="flex gap-2">
                    {formState.productImage.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 overflow-hidden rounded-lg cursor-pointer group"
                      >
                        <Image
                          src={image}
                          alt={image}
                          className="w-full h-full object-cover group-hover:opacity-80 custom-transition"
                          height={200}
                          width={200}
                        />
                        <div 
                          onClick={()=>handleRemoveImage(image)}
                          className="absolute top-1 right-1 bg-white hover:bg-orange-400 hover:text-white text-black rounded-full opacity-0 group-hover:opacity-100 custom-transition">
                          <X size={15} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-red-400">{errors.productImage}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="productBrand" className="font-semibold">
                Brand
              </label>
              <input
                type="text"
                id="productBrand"
                name="productBrand"
                value={formState.productBrand}
                className="p-2 border border-orange-400 rounded-md"
                onChange={(e: any) =>
                  setFormState({ ...formState, productBrand: e.target.value })
                }
              />
              <p className="text-sm text-red-400">{errors.productBrand}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="productName" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                id="productName"
                value={formState.productName}
                name="productName"
                className="p-2 border border-orange-400  rounded-md"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormState({ ...formState, productName: e.target.value })
                }
              />
              <p className="text-sm text-red-400">{errors.productName}</p>
            </div>
            <div className="flex flex-col xl:flex-row gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="gender" className="font-semibold">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={formState.gender}
                  onChange={(e) =>
                    setFormState({ ...formState, gender: e.target.value })
                  }
                  className="p-[11px] border border-orange-400 rounded-md"
                >
                  {["Select a gender", "Male", "Female"].map(
                    (gender: string, index) => (
                      <option
                        value={gender}
                        id={gender}
                        key={index}
                        disabled={gender === "Select a gender"}
                      >
                        {gender}
                      </option>
                    )
                  )}
                </select>
                <p className="text-sm text-red-400">{errors.gender}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="font-semibold">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formState.category}
                  onChange={(e) =>
                    setFormState({ ...formState, category: e.target.value })
                  }
                  className="p-[11px] border border-orange-400 rounded-md"
                >
                  {newCategories.map((category, index) => (
                    <option
                      key={index}
                      value={category.value}
                      id={category.value}
                      disabled={category.value === "Select a category"}
                    >
                      {category.value}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-400">{errors.category}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="productDesc" className="font-semibold">
              Description
            </label>
            <textarea
              id="productDesc"
              value={formState.productDesc}
              name="productDesc"
              className="p-2 border border-orange-400  rounded-md"
              rows={4}
              cols={4}
              onChange={(e: any) =>
                setFormState({ ...formState, productDesc: e.target.value })
              }
            ></textarea>
            <p className="text-sm text-red-400">{errors.productDesc}</p>
          </div>
          <div className="flex flex-col xl:flex-row gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="font-semibold">
                Price
              </label>
              <input
                type="text"
                id="price"
                value={formState.price || ""}
                name="price"
                className="p-2 border border-orange-400 rounded-md"
                onChange={(e: any) =>
                  setFormState({ ...formState, price: Number(e.target.value) })
                }
              />
              <p className="text-sm text-red-400">{errors.price}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discountPercent" className="font-semibold">
                Discount
              </label>
              <input
                type="text"
                value={formState.discountPercent || ""}
                id="discountPercent"
                name="discountPercent"
                className="p-2 border border-orange-400 rounded-md"
                onChange={(e: any) =>
                  setFormState({
                    ...formState,
                    discountPercent: Number(e.target.value),
                  })
                }
              />
              <p className="text-sm text-red-400">{errors.discountPercent}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
