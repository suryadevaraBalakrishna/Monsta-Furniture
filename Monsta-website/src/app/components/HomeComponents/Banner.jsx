"use client"
import React, { useEffect, useState } from 'react'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import "./Banner.css";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Banner() {
      var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let [sliderData,SetsliderData]=useState([]);
  let [imagePath,setimagePath]=useState('');

  useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_SLIDER)
    .then((result)=>{
      if(result.data._status==true){
         SetsliderData(result.data._data);
         setimagePath(result.data._image_path);
      }else{
         SetsliderData([]);
      }
    })
    .catch((error)=>{
        toast.error(error)
    })
  },[])


  return (
     <div className='overflow-hidden'>
      
     {sliderData?.length !== 0 && (
  <Slider {...settings}>
    {sliderData.map((items, index) => {
      return (
        <div key={index}>
          <img src={imagePath + items.image} />
        </div>
      );
    })}
  </Slider>
)}

      

  
    </div>
  )
}
