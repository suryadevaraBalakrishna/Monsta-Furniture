"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { AiFillStar } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import axios from "axios";


export default function Testimonial() {
   
   let [testimonials,Settestimonials]=useState([]);
   let [imagePath,setimagePath]=useState('');

  useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_TESTIMONIAL)
    .then((result)=>{
      if(result.data._status==true){
         Settestimonials(result.data._data);
         setimagePath(result.data._image_path);
      }else{
         Settestimonials([]);
      }
    })
    .catch((error)=>{
        toast.error(error)
    })
  },[])


  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="overflow-hidden  py-16 px-4">
        <h1 className="text-center pb-4 font-bold text-[30px]">What Our Custumers Say ?</h1>
      <div className="max-w-3xl mx-auto text-center">
        {testimonials?.length !==0 &&(
            <Slider {...settings}>
               {testimonials.map((t, index) => (
            <div key={index} className="px-4">
              <p className="text-gray-700 text-lg mb-6 italic">“{t.message}”</p>
              <img
                className="mx-auto w-20 h-20 rounded-full mb-4"
                src={imagePath+ t.image}
                alt={t.name}
              />
              <span className="block font-semibold text-gray-900">
                {t.name}
              </span>
              <span className="block text-sm text-gray-500 mb-4">
                {t.title}
              </span>
              <div className="flex justify-center text-yellow-400 text-xl space-x-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <AiFillStar key={i} />
                ))}
              </div>
            </div>
          ))}
            </Slider>
        )}

        {/* <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-4">
              <p className="text-gray-700 text-lg mb-6 italic">“{t.text}”</p>
              <img
                className="mx-auto w-20 h-20 rounded-full mb-4"
                src={t.image}
                alt={t.name}
              />
              <span className="block font-semibold text-gray-900">
                {t.name}
              </span>
              <span className="block text-sm text-gray-500 mb-4">
                {t.title}
              </span>
              <div className="flex justify-center text-yellow-400 text-xl space-x-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <AiFillStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </Slider> */}
      </div>
    </div>
  );
}
