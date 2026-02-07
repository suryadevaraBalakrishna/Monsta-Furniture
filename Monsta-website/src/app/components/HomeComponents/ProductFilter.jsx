"use client"
import React, { useEffect, useState } from 'react'
import { productData } from './data/Product_data'
import axios from 'axios';
import ProductList from '../ProductComponents/ProductList';


export default function ProductFilter() {
   let [activeTab,setActiveTab]=useState('featured');
   let [allproducts,setallProducts]=useState([]);

   useEffect(() => {
  fetchProducts(activeTab);
}, [activeTab]);

const fetchProducts = async (tab) => {
  let body = {};

  if (tab === 'featured') {
    body.is_featured = true;
    body.limit=20;
  }

  if (tab === 'newArrivals') {
    body.is_new_arrival = true;
      body.limit=20;
  }

  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCT_VIEW,
      body,
    );

    if (res.data._status === true) {
      setallProducts(res.data._data);
    } else {
      setallProducts([]);
    }
  } catch (error) {
    console.error(error);
  }
};


  //  useEffect(()=>{
  //   let fetch_products=async ()=>{
  //     let products=await axios.get(`https://dummyjson.com/products?limit=30`);
  //     let products_data= products.data.products;
  //     setallProducts(products_data);
  //   };
  //   fetch_products();
  //  },[]);

  //  let getfilteredproducts=()=>{
  //   if(activeTab=== 'featured'){
  //     return allproducts.slice(0,8);
  //   }
  //   else if(activeTab==='newArrivals'){
  //     return allproducts.slice(-8);
  //   }
  //   return allproducts;
  //  }

  //  let filterproducts=getfilteredproducts();

  //  let products=productData[activeTab];

   let tabs = [
    { key: 'featured', label: 'Featured' },
    { key: 'newArrivals', label: 'New Arrivals' },
  ];



  return (
   <div className="container mx-auto px-4 py-10">
   <div className="flex space-x-6 border-b border-gray-200 mb-6 justify-center">

    {tabs.map((tab)=>{
        return(
            <button key={tab.key} onClick={()=>setActiveTab(tab.key)} className={`text-light ${activeTab==tab.key ? 'border-b-2 border-amber-600 text-amber-600':'text-gray-600 hover:text-amber-600' }`}>{tab.label}</button>
        )
    })}


    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <ProductList myProducts={allproducts} />
      </div>
    </div>
  )
}
