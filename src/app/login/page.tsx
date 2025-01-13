"use client";
/* eslint-disable */

import { redirect } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { signIn, signUp } from "./actions";
import { fetchUser } from "@/lib/actions/fetchUser";
import { useAppDispatch } from "@/lib/hooks";
import toast from "react-hot-toast";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { fetchOrder } from "@/lib/actions/orderActions";

const page = () => {
  const dispatch = useAppDispatch();
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role] = useState("Customer");
  const [passHidden, setPassHidden] = useState<boolean>(true);

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
    const success = await signIn(email, password);
    if (success) {
      await dispatch(fetchUser());
      await dispatch(fetchOrder());
      redirect("/");
    }
  };

  return (
    <div className="h-screen w-full bg-white flex justify-center items-center px-10 py-10 border">
      <div className="min-w-[70vw] h-[750px] md:h-[450px] bg-orange-50 flex flex-col md:flex-row gap-0 md:gap-10 rounded-xl shadow-lg overflow-hidden">
        <div className="h-2/3 md:h-full w-full md:w-2/3 overflow-hidden">
          <Image
            alt=""
            src={"/hero2.jpg"}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        {isSignIn ? (
          <div className="w-full h-full flex flex-col items-center md:items-start justify-center gap-4">
            <h1 className="font-semibold text-3xl md:text-[35px] py-3">
              Login
            </h1>
            <div className="w-2/3 flex flex-col items-center md:items-start justify-center">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full h-[40px] px-2 py-1 border-2 border-black rounded-xl"
              />
            </div>
            <div className="w-2/3 relative flex flex-col items-center md:items-start justify-center">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                type={passHidden ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full h-[40px] pl-2 pr-10 py-1 border-2 border-black rounded-xl"
              />
              <button
                onClick={() => setPassHidden(!passHidden)}
                className="absolute bottom-2 right-2"
              >
                {!passHidden ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <button
              type="submit"
              onClick={() => handleSignIn(email, password)}
              className="w-2/3 bg-orange-400 py-2 rounded-xl text-lg hover:bg-white border-2 border-orange-400 custom-transition"
            >
              Login
            </button>
            <p>
              Not yet Registered?{" "}
              <span
                onClick={() => {
                  setIsSignIn(!isSignIn);
                  if (passHidden === false) {
                    setPassHidden(!passHidden);
                  }
                }}
                className="hover:text-orange-400 cursor-pointer underline underline-offset-1"
              >
                Register
              </span>
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center gap-4">
            <h1 className="font-semibold text-3xl md:text-[35px] py-3">
              Register
            </h1>
            <div className="w-2/3 flex flex-col justify-center">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full h-[40px] px-2 py-1 border-2 border-black rounded-xl"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-center">
              <label htmlFor="phone" className="block">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="w-full h-[40px] px-2 py-1 border-2 border-black rounded-xl"
              />
            </div>
            <div className="w-2/3 relative flex flex-col justify-center">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                type={passHidden ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full h-[40px] pl-2 pr-10 py-1 border-2 border-black rounded-xl"
              />
              <button
                onClick={() => setPassHidden(!passHidden)}
                className="absolute bottom-2 right-2"
              >
                {!passHidden ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <button
              type="submit"
              onClick={() => {
                handleSignUp(email, phone, password, role);
              }}
              className="w-2/3 bg-orange-400 py-2 rounded-xl text-lg hover:bg-white border-2 border-orange-400 custom-transition"
            >
              Register
            </button>
            <p>
              Already Registered?{" "}
              <span
                onClick={() => {
                  setIsSignIn(!isSignIn);
                  if (passHidden === false) {
                    setPassHidden(!passHidden);
                  }
                }}
                className="hover:text-orange-400 cursor-pointer underline underline-offset-1"
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
