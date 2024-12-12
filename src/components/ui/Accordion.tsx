import React, { useState } from 'react'
import Arrow from './Arrow';
import Link from 'next/link';

interface Items {
    type: string,
}


interface Props {
    items: Items[],
    label : string,
    link: string
    isOpen: boolean,
    toggleMenu: () => void
    onClick: () => void
}


const Accordion: React.FC<Props> = ({ items, label, link, isOpen, toggleMenu, onClick }) => {

  return (
    <div className='w-full text-black'>
        <div className="flex items-center justify-center gap-3" onClick={toggleMenu}>
            <p className="font-semibold text-lg py-5">{label}</p>
            <span
              className={`custom-transition ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
            >
              <Arrow />
            </span>
          </div>
          <div
            className={`flex flex-col gap-2 justify-center items-center custom-transition overflow-hidden px-20 ${
              isOpen ? "h-[350px]" : "h-[0px]"
            }`}
          >
            {items.slice(1).map((item, index) => (
              <Link key={index} href={`/shop/${link}/${item.type}`} onClick={onClick} className='py-2 w-full flex items-center justify-center text-lg active:text-orange-400'>
                {item.type}
              </Link>
            ))}
          </div>
    </div>
  )
}

export default Accordion