import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import WishlistArea from '../components/WishlistComponents/WishlistArea'

export default function page() {
  return (
    <div>
        <BreadCrumb title="My Wishlist" parent="Home" parent_link="/"/>
        <WishlistArea/>
    </div>
  )
}
