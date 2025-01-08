import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedProduct {
  productId: any;
  price: number;
  quantity: number;
}
interface OrderState {
  order: SelectedProduct[];
  totalPrice: number;
  loading: boolean;
  error: null | string;
}

const initialState: OrderState = {
  order: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<SelectedProduct[]>) {
        state.order = action.payload;
    },
    setTotalPrice(state, action: PayloadAction<number>) {
        state.totalPrice = action.payload;
    },
    clearOrder(state) {
      state.order = [];
      state.totalPrice = 0;
    },
  },
});

export const { setOrder, setTotalPrice, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
