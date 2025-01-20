import { z } from "zod";

const productSchema = z.object({
  productImage: z.array(z.string().url("Invalid Url")),
  productBrand: z.string().min(1, "Product brand is requied."),
  productName: z.string().min(1, "Product name is requied."),
  productDesc: z.string().min(1, "Product description is requied."),
  gender: z.string().min(1, "Gender is requied."),
  category: z.string().min(1, "Category is requied."),
});

export const quantitySchema = z.number().nonnegative();
export const priceSchema = z
  .number()
  .min(100)
  .nonnegative("Price is not valid.");
export const discountPercent = z
  .number()
  .min(1, "Discount must be atleast 0.")
  .max(99, "Discount cannot exceed 99%");

export default productSchema;
