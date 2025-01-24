"use client";

import Shop from "@/components/shopComponents/Shop";
import { useAppSelector } from "@/lib/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Page = () => {
  const param = useParams();
  const searchParam = useSearchParams();
  const router = useRouter();

  const { products } = useAppSelector((state) => state.products);
  const sellerProducts = products.filter((p) => p.seller.name === param.seller);

  const pageQuery = searchParam.get("page");
  const [currentPage, setCurrentPage] = useState<number | null>(
    pageQuery ? Number(pageQuery) : null
  );
  const itemsPerPage = 15;
  const length = sellerProducts.length;
  const totalPages = Math.ceil(length / itemsPerPage);

  useEffect(() => {
    if (products.length > 0) {
      if (!pageQuery || isNaN(Number(pageQuery)) || Number(pageQuery) < 1) {
        router.replace("?page=1");
        setCurrentPage(1);
      } else if (Number(pageQuery) > totalPages) {
        router.replace("?page=1");
        setCurrentPage(1);
      } else {
        setCurrentPage(Number(pageQuery));
      }
    }
  }, [pageQuery, totalPages, router, products.length]);

  if (currentPage === null) {
    return null;
  }

  const currentProducts = sellerProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {currentProducts.length > 0 ? (
        <div>
          <Shop value={currentProducts} />
          <div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
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

export default Page;
