import { createSlice } from "@reduxjs/toolkit";

interface WishlistState {
    wishlist: any;
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    wishlist: [],
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers:{
        setWishlist(state, action) {
            state.wishlist = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
})

export const { setWishlist, setError, setLoading } = wishlistSlice.actions;
export default wishlistSlice.reducer;   