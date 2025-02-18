import { addProduct } from "@/app/admin/addproducts/formAction";
import { fetchProducts } from "@/lib/actions/fetchProducts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import productSchema, {
  discountPercent,
  quantitySchema,
} from "@/schemas/productSchema";
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
  price: number;
  discount: number;
  isNext: boolean;
  setIsNext: any;
  setProducts: any;
  setSize: any;
  setPrice: any;
  setDiscount: any;
  setQuantity: any;
}

const SizeAndQuantity: React.FC<Props> = ({
  formState,
  setFormState,
  size,
  quantity,
  price,
  discount,
  products,
  setSize,
  setQuantity,
  setPrice,
  setDiscount,
  setProducts,
  isNext,
  setIsNext
}) => {
  const dispatch = useAppDispatch();
  const initialFormState: Product = {
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
  };

  const handleNewSize = () => {
    try {
      const newProduct = {
        ...formState,
        size: size,
        quantity: quantity,
        price: price,
        discountPercent: discount,
      };
      productSchema.parse(newProduct);
      if (products.find((product) => product.size === newProduct.size)) {
        return toast.error("Item Already added.");
      }
      setProducts([...products, newProduct]);
      setQuantity("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (products: Product[]) => {
    setLoading(true);
    if (!loading && products.length > 0) {
      await addProduct(products);
    }
    setProducts([]);
    setIsNext(!isNext)
    setFormState && setFormState(initialFormState);
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex gap-2 bg-white overflow-hidden rounded-xl w-full">
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
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-col gap-2">
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
            </div>

            <div className="flex flex-col xl:flex-row gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="price" className="font-semibold">
                  Price
                </label>
                <input
                  disabled={size === ""}
                  type="text"
                  id="price"
                  value={price || ""}
                  name="price"
                  className="p-2 border border-orange-400 rounded-md"
                  onChange={(e: any) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discountPercent" className="font-semibold">
                  Discount
                </label>
                <input
                  disabled={size === ""}
                  type="text"
                  value={discount || ""}
                  id="discountPercent"
                  name="discountPercent"
                  className="p-2 border border-orange-400 rounded-md"
                  onChange={(e: any) => setDiscount(Number(e.target.value))}
                />
              </div>
            </div>
            <button
              disabled={
                size === "" ||
                quantity === null ||
                price === null ||
                discount === null ||
                price <= 0 ||
                discount <= 0 ||
                quantity <= 0 ||
                typeof quantity !== "number" ||
                isNaN(quantity)
              }
              className={`px-3 py-2 border border-orange-400   ${
                size === "" ||
                quantity === null ||
                price === null ||
                discount === null ||
                quantity <= 0 ||
                price <= 0 ||
                discount <= 0 ||
                typeof quantity !== "number" ||
                typeof price !== "number" ||
                typeof discount !== "number" ||
                isNaN(quantity) ||
                isNaN(price) ||
                isNaN(discount)
                  ? "cursor-not-allowed hover:none"
                  : "cursor-pointer hover:bg-orange-400 hover:text-white"
              }`}
              onClick={() => {
                if (quantity !== null) {
                  handleNewSize();
                } else {
                  toast.error("Empty fields.");
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
    </div>
  );
};

export default SizeAndQuantity;
