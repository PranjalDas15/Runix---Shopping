"use client";

import React from "react";
import ShopPage from "../../../components/shopComponents/ShopPage";
import { useShopContext } from "../layout";
import { useParams } from "next/navigation";

const page = () => {
  const param = useParams();
  const { filteredProducts } = useShopContext();

  const sellerProducts = filteredProducts.filter(
    (p) => p.seller.name === param.seller
  );

  return (
    <div>
      <ShopPage productValue={sellerProducts} />
    </div>
  );
};

export default page;
