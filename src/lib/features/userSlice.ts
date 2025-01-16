import { CartItem, WishlistItem } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/fetchUser";

interface User {
    _id: string | null;
    email: string | null;
    phone: string | null;
    password?:string | null;
    address: string[];
    role: string | null;
    wishlist: WishlistItem[];
    cart: CartItem[];
  }

type Role = "Admin" | "Customer" | "Seller";

interface UserState {
  user: User | null;
  loading: boolean;
  error: null | string;
  role: Role | null;
  newlyAddedtoWishlist: boolean;
  newlyAddedtoCart: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  role: null,
  newlyAddedtoWishlist: false,
  newlyAddedtoCart: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<Role>) {
      state.role = action.payload;
    },
    updateUserCart(state, action: PayloadAction<CartItem[]>) {
      if(state.user){
        state.user.cart = action.payload;
        state.newlyAddedtoCart = true;
      }
    },
    removeFromUserCart(state, action: PayloadAction<CartItem[]>) {
      if(state.user){
        state.user.cart = action.payload;
      }
    },
    updateUserWishlist(state, action : PayloadAction<WishlistItem[]>){
      if(state.user){
        state.user.wishlist = action.payload;
        state.newlyAddedtoWishlist = true;
      }
    },
    removeFromUserWishlist(state, action : PayloadAction<WishlistItem[]>){
      if(state.user){
        state.user.wishlist = action.payload;
      }
    },
    updateUserData(state, action: PayloadAction<{phone: string, address: string[]}>) {
      if(state.user){
        state.user.phone = action.payload.phone;
        state.user.address = action.payload.address;
      }
    },
    resetNewlyAddedtoWishlist(state){
      state.newlyAddedtoWishlist = false
    },
    resetNewlyAddedtoCart(state){
      state.newlyAddedtoCart = false
    }
    ,
    clearUser(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        // @ts-ignore
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
  },
});

export const { clearUser, setRole, updateUserCart, removeFromUserCart, updateUserWishlist, removeFromUserWishlist, updateUserData, resetNewlyAddedtoWishlist, resetNewlyAddedtoCart } = userSlice.actions;
export default userSlice.reducer;
