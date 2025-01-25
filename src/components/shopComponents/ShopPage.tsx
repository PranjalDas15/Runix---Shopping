"use client";

import React from "react";
import Pagination from "./Pagination";
import { useShopContext } from "../../app/shop/layout";
import Shop from "@/components/shopComponents/Shop";
import { Product } from "@/types/Product";

interface Props {
    productValue: Product[]
}

const ShopPage:React.FC<Props> = ({productValue}) => {
  const { totalPages, currentPage, setCurrentPage, itemsPerPage } = useShopContext();
  if (currentPage === null) {
    return null;
  }
  const currentProducts = productValue.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div>
      <Shop value={currentProducts} heartButton={true} />
      <Pagination
        currentPage={currentPage ?? 1}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ShopPage;
