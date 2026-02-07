import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import Shopping_cart from '../components/CartComponents/Shopping_cart'

export default function page() {
  return (
    <div>
        <BreadCrumb title="Shopping Cart" parent="Home" parent_link="/"/>
        <Shopping_cart/>
    </div>
  )
}
