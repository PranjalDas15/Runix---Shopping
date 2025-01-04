"use client";

import { RootState } from "@/lib/store";
import { deleteFromWishlist } from "@/lib/actions/wishlistActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";



const ProductListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );
  const { user } = useAppSelector((state: RootState) => state.user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <div className="border p-3">
        <h2>{user?.email}</h2>
        <p>{user?.phone}</p>
        <div>
          {user?.wishlist && user.wishlist.length > 0 ? (
            <div>
              <h3>Wishlist</h3>
              <ul>
                {user?.wishlist.map((item) => (
                  <li key={item._id}>{item.productName}
                  <button onClick={()=>{dispatch(deleteFromWishlist(item._id))}}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Empty Wishlist</p>
          )}
        </div>
      </div>
      <h1>Product List</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product: any, index) => (
            <li key={index}>{product.productName}</li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductListPage;
