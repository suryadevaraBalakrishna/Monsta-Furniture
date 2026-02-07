import axios from 'axios'
import React, { Suspense } from 'react'
import ProductContainer from '../components/ProductComponents/ProductContainer'


export default async function page() {
  let result= await axios.get(`https://dummyjson.com/products/categories`)
  let categories= await result.data;

  return (
     <div className="max-w-[1140px] mx-auto">
      <h1 className="font-bold text-center mt-4 text-3xl">Products</h1>
      <Suspense fallback={null}>
       <ProductContainer />
       </Suspense>
    </div>
  )
}
