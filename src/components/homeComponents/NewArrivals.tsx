import { fetchProducts } from "@/lib/actions/fetchProducts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import React, { useEffect } from "react";
import Loading from "../Loading";
import Footer from "../Footer";

const NewArrivals = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = e.currentTarget;
    ;
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-[100vh] snap-center flex flex-col">
      <div className="">
        <h1 className="text-4xl font-bold text-center mt-20 mb-5">
            New Arrivals
        </h1>
        <div className="flex overflow-x-auto snap-x snap-mandatory py-2 px-3">
          {products.length > 0 ? (
            <div className="flex md:gri md:flex-none grid-cols-8 gap-3 px-2">
              {products
                .map((product: any, index) => (
                  <div key={index} className="snap-start  h-[250px] w-[200px] border">
                    <div className="">{product.productName}</div>
                  </div>
                ))
                .slice(0, 10)}
            </div>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default NewArrivals;
