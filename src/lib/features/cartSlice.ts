import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedProducts {
  productId: string;
  quantity: number;
  price: number;
}

interface addressInfo {
    name: string;
    address: string;
}

interface CartState {
  selectedProducts: SelectedProducts[];
  addressInfo: addressInfo | null;
  paymentMethod: string | null;
  totalPrice: number | null;
  loading: boolean;
  error: string | null;
}


const initialState: CartState = {
  selectedProducts: [],
  addressInfo: null,
  paymentMethod: null,
  totalPrice: null,
  loading: false,
  error: ""
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        setSelectedProducts(state, action: PayloadAction<SelectedProducts[]>) {
            state.selectedProducts = action.payload;
        },
        setAddressInfo(state, action: PayloadAction<addressInfo>) {
            state.addressInfo = action.payload;
        },
        setPaymentMethod(state, action: PayloadAction<string>) {
            state.paymentMethod = action.payload;
        },
        setTotalPrice(state, action: PayloadAction<number>) {
            state.totalPrice = action.payload;
        },
        clearSelectedProducts(state) {
            state.selectedProducts = [];
            state.addressInfo = null;
            state.error = null;
        }
    }
})

export const { setSelectedProducts, setAddressInfo, setPaymentMethod, setTotalPrice, clearSelectedProducts} = cartSlice.actions;
export default cartSlice.reducer;
