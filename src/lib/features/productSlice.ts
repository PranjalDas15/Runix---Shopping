import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { fetchProducts } from '../actions/fetchProducts';

interface ProductState {
    products: Product[];
    genderValue: string;
    categoryValue: string;
    searchValue: string;
    // priceValue: [number, number];
    loading: boolean;
    error: string | null;
}


const initialState: ProductState = {
    products: [],
    genderValue: "",
    categoryValue: "",
    searchValue: "",
    // priceValue: [0, 0],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setGenderValue(state, action: PayloadAction<string>) {
            state.genderValue = action.payload;
        },
        setCategoryValue(state, action: PayloadAction<string>) {
            state.categoryValue = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        // setPriceValue(state, action: PayloadAction<string>) {
        //     const prices = action.payload.split('-').map((price) => parseInt(price, 10));
        //     state.priceValue = [prices[0] || 0, prices[1] || 0];
        // },
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        clearProducts(state) {
            state.products = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null; 
        }),
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'An error occurred';
        });
    }
});

export const { setGenderValue, setCategoryValue, setSearchValue ,clearProducts, setProducts, setError, setLoading } = productSlice.actions;
export default productSlice.reducer;