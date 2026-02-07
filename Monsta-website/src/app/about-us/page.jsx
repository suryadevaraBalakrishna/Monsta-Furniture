"use client"
import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb';
import AboutSection from '../components/AboutComponents/AboutSection';
import WhyChooseUs from '../components/AboutComponents/WhyChooseUs';
import Testimonial from '../components/common/Testimonial';


export default function About() {
  return (
    <div>
      {/* <h1>About</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, totam suscipit? Corporis, labore. Tenetur, sunt error? Voluptatum, officia ut? Alias blanditiis assumenda minima optio veritatis quisquam voluptate perferendis odio quasi!</p>
    <button onClick={()=>dispatch(counterPlus())} className='mx-2'>counter Plus</button>
    <button onClick={()=>dispatch(counterMinus())}>Counter Minus</button> */}
    <BreadCrumb title="About us" parent="Home" parent_link="/"/>
    <AboutSection/>
    <WhyChooseUs/>
    <Testimonial/>


    </div>
  )
}
