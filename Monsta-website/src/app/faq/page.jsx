import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import Accordion from '../components/FAQComponents/Accordion'

export default function FAQ() {
  return (
    <div>
        <BreadCrumb title="Frequently Questions" parent="Home" parent_link="/"/>
        <Accordion/>
    </div>
  )
}
