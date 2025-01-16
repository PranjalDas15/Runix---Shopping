import { addToCart, updateCart } from "../actions/cartActions";
import { addToWishlist, deleteFromWishlist } from "../actions/wishlistActions";
import { removeFromUserCart, removeFromUserWishlist, updateUserCart, updateUserWishlist } from "../features/userSlice";

export const handleAddtoCart = async (pid: string, quantity: number, dispatch: any) => {
  try {
    const updatedCart = await addToCart({
      productId: pid,
      productQuantity: quantity,
    });
    if (updatedCart) {
      dispatch(updateUserCart(updatedCart));
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleRemoveFromCart = async (pid: string, quantity: number, dispatch: any) => {
  try {
    const updatedCart = await updateCart({
      productId: pid,
      productQuantity: quantity,
    });
    if (updatedCart) {
      dispatch(removeFromUserCart(updatedCart));
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleAddtoWishlist = async (pid:string, dispatch: any) => {
    try {
        const updatedWishlist = await addToWishlist(pid);
        if(updatedWishlist) {
            dispatch(updateUserWishlist(updatedWishlist));
        }
    } catch (error) {
        console.log(error)
    }
}

export const handleRemoveFromWishlist = async (pid:string, dispatch: any) => {
    try {
        const updatedWishlist = await deleteFromWishlist(pid);
        if(updatedWishlist) {
            dispatch(removeFromUserWishlist(updatedWishlist));
        }
    } catch (error) {
        console.log(error)
    }
}
