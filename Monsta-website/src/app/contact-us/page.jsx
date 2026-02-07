import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import Map from '../components/ContactComponents/Map'
import Form from '../components/ContactComponents/Form'

export default function page() {
  return (
   <div>
    <BreadCrumb title="Contact Us" parent="Home" parent_link="/" />
    <Map/>
    <Form/>
   </div>
  )
}
