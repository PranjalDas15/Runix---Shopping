import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/lib/features/productSlice';
import userReducer from '@/lib/features/userSlice';
import OrderReducer from '@/lib/features/orderSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        order: OrderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;