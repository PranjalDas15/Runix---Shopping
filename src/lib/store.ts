import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/lib/features/productSlice";
import userReducer from "@/lib/features/userSlice";
import OrderReducer from "@/lib/features/orderSlice";
import cartReducer from "@/lib/features/cartSlice";

export const store = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      user: userReducer,
      order: OrderReducer,
      cart: cartReducer
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
