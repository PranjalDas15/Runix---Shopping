import React, { useState } from "react";
import Arrow from "./Arrow";
import { categories, categoriesFemale, categoriesMale } from "@/lib/assets";
import Link from "next/link";
import Accordion from "./Accordion";
import { LogOut } from "lucide-react";
import { useProductContext } from "@/Context/productContext";
import { useUser } from "@/Context/userContext";

const MobileMenu = () => {
  const { menuHidden, setMenuHidden } = useProductContext();
  const { signout } = useUser();

  const [accordionValue, setAccordionValue ] = useState<string | null>(null);
  const toggleMenu = (openAccordion: string) => {
    setAccordionValue(accordionValue === openAccordion ? null : openAccordion);
  };

  return (
    <div className="w-full mt-[100px] overflow-hidden">
      <ul className="w-full flex flex-col gap-5 justify-center items-center">
        <li className="border w-full">
          <Accordion 
            label="MEN" 
            link="Male" 
            items={categories}
            isOpen={ accordionValue === 'MEN'}
            toggleMenu={()=> toggleMenu('MEN')}
            onClick={()=>setMenuHidden(!menuHidden)}
            />
        </li>
        <li className="border w-full">
          <Accordion 
            label="WOMEN" 
            link="Female" 
            items={categories}
            isOpen={ accordionValue === 'WOMEN'}
            toggleMenu={()=> toggleMenu('WOMEN')}
            onClick={()=>setMenuHidden(!menuHidden)}
            />
        </li>
        <li onClick={()=>{signout(); setMenuHidden(!menuHidden)}} className="flex items-center justify-center gap-3 border w-full cursor-pointer">
          <p className="font-semibold text-lg py-5 text-black">LOGIN</p>
          <LogOut/>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
