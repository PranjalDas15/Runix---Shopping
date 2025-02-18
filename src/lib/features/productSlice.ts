import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
    genderValue: string;
    categoryValue: string;
    searchValue: string;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    genderValue: "",
    categoryValue: "",
    searchValue: "",
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
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        clearProducts(state) {
            state.error = null;
        }
    }
});

export const { setGenderValue, setCategoryValue, setSearchValue ,clearProducts, setError, setLoading } = productSlice.actions;
export default productSlice.reducer;