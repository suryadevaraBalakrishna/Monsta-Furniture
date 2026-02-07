import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import Customerlogin from '../components/LoginRegisterComponents/Customerlogin'
import Link from 'next/link'

export default function page() {
  return (
    <div>
        <BreadCrumb title="My Account" parent="Home" parent_link="/"/>
        <Customerlogin/>
    </div>
  )
}
