"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import store, { AppStore } from "@/lib/store";
import { fetchSeller, fetchUser } from "@/lib/actions/fetchUser";
import { fetchProducts } from "@/lib/actions/fetchProducts";
import { fetchOrder } from "@/lib/actions/orderActions";

export default function StoreProvider({ children }: {children: React.ReactNode;}) {
 const storeRef = useRef<AppStore>()
 if (!storeRef.current) {
  storeRef.current = store()
  storeRef.current.dispatch(fetchUser());
  storeRef.current.dispatch(fetchSeller());
  storeRef.current.dispatch(fetchOrder());
 }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
