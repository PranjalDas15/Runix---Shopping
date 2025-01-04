import StoreProvider from "@/app/storeProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-500 text-white p-4">
          <h1>My App</h1>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="bg-blue-500 text-white p-4 text-center">
          &copy; 2023 My App
        </footer>
      </div>
    </StoreProvider>
  );
}
