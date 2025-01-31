import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrder, placeOrder } from "../actions/orderActions";
import { OrderItem } from "@/types/Order";

interface Order {
  _id: string | null;
  userId: string | null;
  order: OrderItem[];
  addressInfo: {
    name: string,
    address: string
  };
  totalPrice: number | null;
  orderStatus: string | null;
  paymentMethod: string | null;
  paymentStatus: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state) {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
