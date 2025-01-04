import { CartItem, User, WishlistItem } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/fetchUser";
import update from "@/pages/api/user/admin/update";
import { clear } from "console";
import add from "@/pages/api/products/add";
import { addToWishlist, deleteFromWishlist } from "../actions/wishlistActions";

interface UserState {
    user: User | null;
    loading: boolean;
    error: null | string;
};

const initialState: UserState = {
    user: {
        _id: "",
        email: "",
        phone: 0,
        wishlist: [],
        cart: [],
        address: [],
        role: ""
    },
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        updateUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
        removeFromWishlist(state, action: PayloadAction<string>) {
            if(state.user) {
                state.user.wishlist = state.user.wishlist.filter((item: WishlistItem) => item._id !== action.payload);
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            if(state.user) {
                state.user.cart = state.user.cart.filter((item: CartItem) => item.product._id !== action.payload);
            }
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
    }
})

export const { updateUser, clearUser, removeFromWishlist, removeFromCart } = userSlice.actions;
export default userSlice.reducer;