"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addtoCart, deleteCart } from "@/app/slice/cartSlice";
import { addtowishlist, removefromwishlist } from "@/app/slice/wishlistSlice";
import { toast } from "react-toastify";
import ProductList from "@/app/components/ProductComponents/ProductList";


export default function ProductDetailsPage() {
  // ✅ ALL HOOKS AT TOP
  const { slug } = useParams();
  const dispatch = useDispatch();

  const my_cart = useSelector((store) => store.cartReducer.cart);
  const my_wishlist = useSelector((store) => store.wishlist.wishlist);

  const [product, setProduct] = useState(null);
  const [relatedProduct,setrelatedProduct]=useState([]);


  
    //related product
  useEffect(()=>{
    if(!product) return;
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_RELATED_PRODUCT,{
       category_id: product.parent_category_ids[0]._id, 
      exclude_id: product._id
    })
    .then((result)=>{
       if(result.data._status==true){
           setrelatedProduct(result.data._data);
           console.log(result.data._data);
       }else{
          toast.error('something went wrong');
       }
    })
    .catch((error)=>{
      toast.error(error);
    })
  },[product])



  // ✅ Fetch product
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API_URL +
            process.env.NEXT_PUBLIC_PRODUCT_DETAILS,
          { slug }
        );
        setProduct(res.data._data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [slug]);

  // ✅ SAFE early return (no hooks below this)
  if (!product) {
    return <div className="text-center mt-10 text-lg">Loading product...</div>;
  }

  // ✅ Derived data (NOT hooks)
  const products_in_cart = my_cart.filter(
    (item) => item.id === product._id
  );

  const products_in_wishlist = my_wishlist.filter(
    (item) => item.id === product._id
  );

  // ✅ Handlers
  const addtocart = () => {
    dispatch(
      addtoCart({
        qty: 1,
        title: product.name,
        price: product.sale_price,
        image: process.env.NEXT_PUBLIC_PRODUCT_IMAGE + product.image,
        id: product._id
      })
    );
  };

  const addtowish = () => {
    dispatch(
      addtowishlist({
        qty: 1,
        title: product.name,
        price: product.sale_price,
        image: process.env.NEXT_PUBLIC_PRODUCT_IMAGE + product.image,
        id: product._id
      })
    );
  };





  return (
     <>
    <div className="w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Image Section */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-5">
          {product.name}
        </h1>

        <img
          src={process.env.NEXT_PUBLIC_PRODUCT_IMAGE + product.image}
          alt={product.name}
          className="w-full h-[420px] object-cover rounded-xl shadow-md"
        />

        <div className="flex gap-3 mt-4">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={process.env.NEXT_PUBLIC_PRODUCT_IMAGE + img}
              className="h-[120px] object-cover rounded-xl shadow-md"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-center">
        <p className="text-gray-600 mb-3">
          <strong>Category:</strong>{" "}
          {product.parent_category_ids.map((c) => c.name).join(", ")}
        </p>

        <p className="mb-6">{product.long_description}</p>

        <p className="text-2xl font-bold text-indigo-600 mb-6">
          ₹ {product.sale_price}
        </p>

        {/* Wishlist */}
        {products_in_wishlist.length ? (
          <button
            onClick={() => dispatch(removefromwishlist(product._id))}
            className="w-[30%] bg-green-500 text-white py-2 rounded mb-2"
          >
            Remove from Wishlist
          </button>
        ) : (
          <button
            onClick={addtowish}
            className="w-[30%] bg-yellow-500 text-white py-2 rounded mb-2"
          >
            Add to Wishlist
          </button>
        )}

        {/* Cart */}
        {products_in_cart.length ? (
          <button
            onClick={() => dispatch(deleteCart(product._id))}
            className="w-[30%] bg-red-500 text-white py-2 rounded"
          >
            Delete from Cart
          </button>
        ) : (
          <button
            onClick={addtocart}
            className="w-[30%] bg-indigo-500 text-white py-2 rounded"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
   
     <div className='mx-4 my-[100px]' >
                  <div className='text-3xl font-bold text-gray-800'>Related Products</div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
      
                   <ProductList myProducts={relatedProduct}/>
                      
                  </div>
      
              </div>
    </>
  );
}
