'use client'

import { useUser } from '@/Context/userContext'
import React from 'react'

const page = () => {

  const {currnetUser} = useUser();
  return (
    <div>
  <h3>Your Wishlist</h3>
  {currnetUser?.wishlist && currnetUser.wishlist.length > 0 ? (
    <ul>
      {currnetUser.wishlist.map((p: any, index) => (
        <li key={index}>
          <p>Product ID: {p.productName}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>Your wishlist is empty.</p>
  )}
</div>

  )
}

export default page