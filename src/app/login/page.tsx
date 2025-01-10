"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { images } from "@/lib/assets";
import { signIn, signUp } from "./actions";
import { fetchUser } from "@/lib/actions/fetchUser";
import { useAppDispatch } from "@/lib/hooks";

const page = () => {
  const dispatch = useAppDispatch();
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role] = useState("Customer");

  const handleSignUp = async (
    email: string,
    phone: string,
    password: string,
    role: string
  ) => {
    const success = await signUp(email, phone, password, role);
    if (success) {
      setIsSignIn(true);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
    dispatch(fetchUser());
    redirect("/");
  };

  return (
    <div className="min-h-[70vh] w-full bg-white flex justify-center items-center px-10 py-10">
      {isSignIn ? (
        <div className="min-w-[70vw] h-[650px] md:h-[400px] flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden">
          <div className="h-2/3 md:h-full w-full md:w-2/3 overflow-hidden">
            <Image
              alt=""
              src={images.hero2}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full bg-orange-50 flex flex-col items-center justify-center gap-4">
            <h1 className="font-semibold text-2xl py-3">Login</h1>
            <div className="w-full flex flex-col items-center justify-center">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full"
              />
            </div>
            <button
              type="submit"
              onClick={() => handleSignIn(email, password)}
              className="w-2/3 md:w-1/2 bg-orange-400 py-2 rounded-full text-lg hover:bg-white border-2 border-orange-400 custom-transition"
            >
              Login
            </button>
            <p>
              Not yet Registered?{" "}
              <span
                onClick={() => setIsSignIn(!isSignIn)}
                className="hover:text-orange-400 cursor-pointer underline underline-offset-1"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="min-w-[70vw] h-[650px] md:h-[400px] flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden">
          <div className="h-2/3 md:h-full w-full md:w-2/3 overflow-hidden">
            <Image
              alt=""
              src={images.hero2}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full bg-orange-50 flex flex-col items-center justify-center gap-4">
            <h1 className="font-semibold text-2xl py-3">Register</h1>
            <div className="w-full flex flex-col items-center justify-center">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <label htmlFor="phone" className="block">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-2/3 md:w-1/2 h-[40px] px-2 py-1 border-2 border-black rounded-full"
              />
            </div>
            <button
              type="submit"
              onClick={() => {
                handleSignUp(email, phone, password, role);
              }}
              className="w-2/3 md:w-1/2 bg-orange-400 py-2 rounded-full text-lg hover:bg-white border-2 border-orange-400 custom-transition"
            >
              Register
            </button>
            <p>
              Already Registered?{" "}
              <span
                onClick={() => setIsSignIn(!isSignIn)}
                className="hover:text-orange-400 cursor-pointer underline underline-offset-1"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
