"use client";
import { useActionState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import store from "@/lib/store";
import { fetchProducts } from "@/lib/actions/fetchProducts";
import { fetchUser } from "@/lib/actions/fetchUser";

export default function StoreProvider({ children }: {children: React.ReactNode;}) {
  useEffect(() => {
    store.dispatch(fetchProducts());
    store.dispatch(fetchUser());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
