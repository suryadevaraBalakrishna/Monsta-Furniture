"use client";
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import ProductList from '../ProductComponents/ProductList';
import { toast } from 'react-toastify';

export default function Bestsellingproducts() {
    
    let [myproducts,setmyproducts]=useState([]);

    

     useEffect(()=>{
    //      let fetch_products= async() =>{
    //   let products=await axios.get(`https://dummyjson.com/products?limit=5`);
    //   let products_data=products.data.products;
    //    setmyproducts(products_data);
    //  }
    //  fetch_products();

      axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCT_VIEW,{
        is_best_selling:true,
        limit:20
      })
      .then((result)=>{
        if(result.data._status==true){
        setmyproducts(result.data._data);
        }else{
        setmyproducts([]);
        }

      })
      .catch(()=>{
        toast.error('something wrong');
      })
     },[]);



    return (
        <div className='mx-4 my-[100px]' >
            <div className='text-3xl font-bold text-gray-800'>Bestsellingproducts</div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>

             <ProductList myProducts={myproducts}/>
                
            </div>

        </div>
    )
}
