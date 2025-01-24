import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number | null>>;
}

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const pageValue = searchParam.get("page");

  useEffect(() => {
    if (currentPage !== Number(pageValue)) {
      setCurrentPage(Number(pageValue));
    }
  }, [pageValue, router]);

  return (
    <div className="py-10 flex items-center justify-center gap-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          onClick={() => {
            router.push(`?page=${index + 1}`);
            setCurrentPage(index + 1);
          }}
          key={index}
          className={`text-lg font-semibold rounded-full px-2 ${
            pageValue?.toString() === (index + 1).toString()
              ? "bg-orange-400 text-white"
              : "bg-white text-orange-400"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
