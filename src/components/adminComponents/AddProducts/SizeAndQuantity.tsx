import { addProduct } from "@/app/admin/add_product/formAction";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import productSchema from "@/schemas/productSchema";
import { Product } from "@/types/Product";
import { LoaderCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
  formState: Product;
  setFormState?: React.Dispatch<React.SetStateAction<Product>>;
  products: Product[];
  size: string;
  quantity: number;
  setProducts: any;
  setSize: any;
  setQuantity: any;
}

const SizeAndQuantity: React.FC<Props> = ({
  formState,
  setFormState,
  size,
  quantity,
  products,
  setSize,
  setQuantity,
  setProducts,
}) => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const handleNewSize = (size: string, quantity: number) => {
    try {
      if (user) {
        const newProduct = {
          ...formState,
          size: size,
          quantity: quantity
        };
        productSchema.parse(newProduct);
        if (products.find((product) => product.size === newProduct.size)) {
          return toast.error("Item Already added.");
        }
        setProducts([...products, newProduct]);
        setQuantity("");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };
  const [loading, setLoading] = useState(false);

  const removeProduct = (size: string) => {
    setProducts(products.filter((p) => p.size !== size));
  };

  const handleAddProduct = async (products: Product[]) => {
    setLoading(true);
    if (!loading && products.length > 0) {
      await addProduct(products);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex gap-2 bg-white overflow-hidden rounded-xl w-full h-[300px]">
        <div className="w-20 flex flex-col gap-2">
          {["S", "M", "L", "XL"].map((s, index) => (
            <div key={index} className="w-full h-full">
              <input
                checked={size === s}
                disabled={!!products.find((p) => p.size === s)}
                type="radio"
                value={s}
                id={s}
                name="size"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const temp = e.target.value;
                  setSize(temp);
                }}
                className="peer hidden"
              />
              <label
                htmlFor={s}
                className={`w-full h-full flex items-center justify-center py-5  ${
                  !!products.find((p) => p.size === s)
                    ? "hover:none opacity-60 cursor-not-allowed bg-orange-100"
                    : "hover:bg-orange-200 bg-slate-50 cursor-pointer peer-checked:bg-orange-400"
                }`}
              >
                <p>{s}</p>
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between p-3 w-full">
          <div className="flex flex-col gap-2">
            {size && (
              <p>
                <span className="font-semibold">Selected Size:</span> {size}
              </p>
            )}
            <label htmlFor="quantity" className="font-semibold">
              Quantity
            </label>
            <input
              disabled={size === ""}
              type="text"
              id="quantity"
              value={quantity || ""}
              name="quantity"
              className="p-2 border border-orange-400"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(Number(e.target.value))
              }
            />
            <button
              disabled={
                size === "" ||
                quantity === null ||
                quantity <= 0 ||
                typeof quantity !== "number" ||
                isNaN(quantity)
              }
              className={`px-3 py-2 border border-orange-400   ${
                size === "" ||
                quantity === null ||
                quantity <= 0 ||
                typeof quantity !== "number" ||
                isNaN(quantity)
                  ? "cursor-not-allowed hover:none"
                  : "cursor-pointer hover:bg-orange-400 hover:text-white"
              }`}
              onClick={() => {
                if (quantity !== null) {
                  handleNewSize(size, quantity);
                }
              }}
            >
              Add
            </button>
          </div>
          <button
            disabled={products.length === 0 && loading}
            onClick={() => handleAddProduct(products)}
            className={`p-3 bg-orange-400 text-white font-semibold ${
              products.length > 0 && !loading
                ? "cursor-pointer  hover:bg-orange-500"
                : "hover:none cursor-not-allowed"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
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

export default SizeAndQuantity;
