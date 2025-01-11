import React, { useState } from "react";
import { categories } from "@/lib/assets";
import Accordion from "./Accordion";
import { LogOut, X } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  signOut: () => void;
  menuHidden: boolean;
  setMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}
const MobileMenu: React.FC<Props> = ({
  signOut,
  menuHidden,
  setMenuHidden,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [accordionValue, setAccordionValue] = useState<string | null>(null);
  const toggleMenu = (openAccordion: string) => {
    setAccordionValue(accordionValue === openAccordion ? null : openAccordion);
  };

  return (
    <div className="w-full mt-[100px] overflow-hidden">
      <ul className="relative w-full flex flex-col gap-5 justify-center items-center">
        <li className="border w-full">
          <Accordion
            label="MEN"
            link="Male"
            items={categories}
            isOpen={accordionValue === "MEN"}
            toggleMenu={() => toggleMenu("MEN")}
            onClick={() => setMenuHidden(!menuHidden)}
          />
        </li>
        <li className="border w-full">
          <Accordion
            label="WOMEN"
            link="Female"
            items={categories}
            isOpen={accordionValue === "WOMEN"}
            toggleMenu={() => toggleMenu("WOMEN")}
            onClick={() => setMenuHidden(!menuHidden)}
          />
        </li>
        {user ? (
          <li className="w-full">
            <button onClick={()=>{setMenuHidden(!menuHidden); redirect('/user')}} className="border w-full text-black font-semibold text-lg py-5 focus:bg-orange-50">Profile</button>
            <button onClick={()=>{setMenuHidden(!menuHidden); redirect('/user/order')}} className="border w-full text-black font-semibold text-lg py-5 focus:bg-orange-50">Orders</button>
            <button onClick={()=>{signOut() ; setMenuHidden(!menuHidden)}} className="border w-full text-black font-semibold text-lg py-5 focus:bg-orange-50">Logout</button>
          </li>
        ) : (
          <li
            onClick={() => {
              setMenuHidden(!menuHidden);
              {
                user ? signOut() : router.push("/login");
              }
            }}
            className="flex items-center justify-center gap-3 border w-full cursor-pointer"
          >
            <p className="font-semibold text-lg py-5 text-black">
              {user ? "LOGOUT" : "LOGIN"}
            </p>
            <LogOut />
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
