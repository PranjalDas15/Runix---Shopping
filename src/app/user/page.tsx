'use client'

import { useUser } from "@/Context/userContext";
import React, { useEffect } from "react";

const page = () => {
    const { currnetUser } = useUser();

  return <div>

    <p className="font-bold">{currnetUser?.email}</p>
    <p className="font-bold">{currnetUser?._id}</p>


    
  </div>;
};

export default page;
