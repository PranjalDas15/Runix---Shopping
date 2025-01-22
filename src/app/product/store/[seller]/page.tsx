"use client";

import Shop from "@/components/shopComponents/Shop";
import { useAppSelector } from "@/lib/hooks";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const param = useParams();
  const pathname = usePathname();
  const { products } = useAppSelector((state) => state.products);
  const sellerProducts = products.filter((p) => p.seller.name === param.seller);
  
  const [array, setArray] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const length = sellerProducts.length;
    const pages = Math.ceil(length / itemsPerPage);
    const tempArray = Array.from({ length: pages }, (_, i) => i + 1);
    setArray(tempArray);
  }, [products, param.seller]);

  // Get the products for the current page
  const currentProducts = sellerProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handler to change the page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    return `${pathname}?${param}`
  };

  return (
    <div>
      {currentProducts.length > 0 ? (
        <div>
          <Shop value={currentProducts} />
          <div className="pagination-controls">
            {array.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-button ${currentPage === page ? "active" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>No products from this Seller.</p>
        </div>
      )}
    </div>
  );
};

export default page;
