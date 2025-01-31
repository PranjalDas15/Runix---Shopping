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

export const discountedPrice = (price: number, discountPercent: number) => {
  const discountAmount = (price * discountPercent) / 100;
  return parseInt((price - discountAmount).toString(), 10);
};


export const dateToString = (date: string) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = parsedDate.toLocaleDateString("default", { month: "short" });
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes} ,${day} ${month} ${year}`;
};

export const expectedDelivery = (date: string) => {
  const parsedDate = new Date(date);

  parsedDate.setDate(parsedDate.getDate() + 14);
  const formattedDate = dateToString(parsedDate.toDateString());

  return formattedDate.split(" ,")[1];
};