"use client"
import { addtoCart, deleteCart } from '@/app/slice/cartSlice'
import { addtowishlist, removefromwishlist } from '@/app/slice/wishlistSlice'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function ProductList({myProducts}) {
  return (
    <>
     {myProducts.map((data,index)=>{
          return(
         <ProductCard data={data} index={index} key={data._id}/>
     )
    })}
    </>
  )
}


function ProductCard({data ,index}){
  let my_cart=useSelector((myStore)=>myStore.cartReducer.cart)
  let my_wishlist=useSelector((myStore)=>myStore.wishlist.wishlist);



  let dispatch=useDispatch();

  let addtocart=()=>{
    let obj={
       qty:1,
       title:data.name,
       price:data.sale_price,
       image:process.env.NEXT_PUBLIC_PRODUCT_IMAGE + data.image,
       id:data._id
    }
    dispatch(addtoCart(obj)); 
  }



  let addtowish=()=>{
    let list={
      qty:1,
        title:data.name,
       price:data.sale_price,
       image:process.env.NEXT_PUBLIC_PRODUCT_IMAGE + data.image,
       id:data._id
    }
    dispatch(addtowishlist(list))
  }


  let products_in_cart=my_cart.filter((items)=>items.id==data._id);

  let products_in_wishlist=my_wishlist.filter((items)=>items.id==data._id);



   return(
     <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"  key={index}>
     <Link href={`/products/${data.slug}`}>  
      <img src={process.env.NEXT_PUBLIC_PRODUCT_IMAGE+data.image} alt="iPhone 14" className="w-full h-48 object-cover rounded mb-4" />
        </Link> 
      <h3 className="text-lg font-semibold">{data.name}</h3>
      <p className="text-gray-600 mb-2">{data.short_description}</p>
     <p className="text-gray-600 mb-2">Rs {data.sale_price}</p>
      
     {products_in_wishlist.length==1 ?  
      <button className="w-full bg-green-500 hover:bg-indigo-600 text-white py-2 rounded transition my-2" onClick={()=>dispatch(removefromwishlist(data._id))}>Remove from Wishlisht</button>
     :
        <button className="w-full bg-yellow-500 hover:bg-indigo-600 text-white py-2 rounded transition my-2" onClick={()=>addtowish()}>Add to Wishlisht</button>
    }
     {products_in_cart.length==1 ? 
       <button onClick={()=>dispatch(deleteCart(data._id))}  className="w-full bg-red-500 hover:bg-indigo-600 text-white py-2 rounded transition">Delete from Cart</button>  
    :
     <button onClick={()=>addtocart()} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded transition">Add to Cart</button>
    }
    
    </div>
   )
}