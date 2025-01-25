"use client"; 
import ShopPage from "../../components/shopComponents/ShopPage";
import { useShopContext } from "./layout";

const page = () => {
  const { filteredProducts } = useShopContext();
  return (
    <div>
      <ShopPage productValue={filteredProducts} />
    </div>
  );
};

export default page;
