
import { CartItem, User, WishlistItem } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/fetchUser";
import { addToWishlist, deleteFromWishlist } from "../actions/wishlistActions";
import { addToCart, updateCart } from "../actions/cartActions";

interface SelectedProduct {
    id: string;
    price: number;
    quantity: number;
    total?: number;
  }

interface UserState {
    user: User | null;
    loading: boolean;
    error: null | string;
    selectedProducts: SelectedProduct | null;
};



const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    selectedProducts: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        // updateUser(state, action: PayloadAction<User>) {
        //     state.user = action.payload;
        // },
        setSelectedProducts(state, action: PayloadAction<SelectedProduct[]>) {
            // @ts-ignore
            state.selectedProducts = action.payload;
            

        }
        ,
        clearUser(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.selectedProducts = null
        }
    },
    extraReducers: (builder) =>{
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

            // update wihslist

            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
                state.loading = false;
                if (state.user) {
                    state.user.wishlist = action.payload;
                }
                state.error = null;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            // remove from wishlist

            .addCase(deleteFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFromWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
                state.loading = false;
                if (state.user) {
                    state.user.wishlist = action.payload;
                }
                state.error = null;
            })
            .addCase(deleteFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            // add to cart

            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem[] | undefined>) => {
                state.loading = false;
                if (state.user && action.payload) {
                    state.user.cart = action.payload;
                }
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            // update cart

            .addCase(updateCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action: PayloadAction<CartItem[] | undefined>) => {
                state.loading = false;
                if (state.user && action.payload) {
                    state.user.cart = action.payload;
                }
                state.error = null;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    }
})

export const { clearUser, setSelectedProducts } = userSlice.actions;
export default userSlice.reducer;