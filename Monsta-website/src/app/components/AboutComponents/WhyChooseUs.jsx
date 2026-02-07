import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function WhyChooseUs() {
     let [whyChoose,SetwhyChoose]=useState([]);
   let [imagePath,setimagePath]=useState('');

  useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WHY_CHOOSE)
    .then((result)=>{
      if(result.data._status==true){
         SetwhyChoose(result.data._data);
         setimagePath(result.data._image_path);
      }else{
         SetwhyChoose([]);
      }
    })
    .catch((error)=>{
        toast.error(error)
    })
  },[])

  return (
       <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Why Choose Us?</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChoose?.length !== 0 && (
          whyChoose.map((items,index)=>{
            return(
                <div className="bg-white shadow-lg rounded-2xl p-6 text-center" key={items._id}>
            <div className="mb-4">
              <img
                src={imagePath + items.image}
                alt={items.name}
                className="mx-auto w-20 h-20 object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{items.name}</h3>
            <p className="text-gray-600">
             {items.description}
            </p>
          </div>
            )
          })
          )}
       
        </div>
      </div>
    </div>
  )
}
