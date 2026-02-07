'use client'
import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import { myStore } from '@/app/store/store'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { clearCart } from '../slice/cartSlice'

export default function page() {

  //remove product from cart
  const dispatch=useDispatch();


   let cart_data=useSelector((myStore)=>myStore.cartReducer.cart);
    console.log(cart_data);

  let subTotal=cart_data.reduce((total,data)=>{
      return total + data.price * data.qty
  },0)

  const userToken=useSelector((state)=>{
      return state.login.token
    })

      const { error, isLoading, Razorpay } = useRazorpay();


      let product_info=useSelector((myStore)=>myStore.cartReducer.cart);


  let placeorder=(event)=>{
     event.preventDefault();

     var billing_address={
        name:event.target.name.value,
        mobile_number:event.target.mobile_number.value,
        billing_name:event.target.billing_name.value,
        biling_email:event.target.biling_email.value,
        billing_mobile:event.target.billing_mobile.value,
        billing_address:event.target.billing_address.value,
        billing_country:event.target.billing_country.value,
        billing_state:event.target.billing_country.value,
        billing_city:event.target.billing_city.value
     }

     var shipping_address={
        name:event.target.name.value,
        mobile_number:event.target.mobile_number.value,
        shipping_name:event.target.billing_name.value,
        shipping_email:event.target.biling_email.value,
        shipping_mobile:event.target.billing_mobile.value,
        shipping_address:event.target.billing_address.value,
        shipping_country:event.target.billing_country.value,
        shipping_state:event.target.billing_country.value,
        shipping_city:event.target.billing_city.value
     }


     
     




     axios.post('http://localhost:8000/api/website/order/order-placed',{
        product_info:product_info,
        billing_address:billing_address,
        shipping_address: shipping_address,
        total_amount:subTotal,
        net_amount:subTotal
     },{
         headers:{
        'Authorization' : `Bearer ${userToken}`
      }
     })
     .then((result)=>{
       if(result.data._status==true){
         handlePayment(result.data.orderInfo.id,result.data.orderInfo.amount)
       }else{
            toast.error('something went wrong');
       }
     })
     .catch((error)=>{
        toast.error('something went wrong2');
     })

  }

  const handlePayment = (id,amount) => {
    const options={
      key: "rzp_test_S7zG0ylca2nnea",
      amount: amount, // Amount in paise
      currency: "INR",
      name: "Monsta Company",
      description: "Test Transaction",
      order_id: id, // Generate order_id on server
      handler: (response) => {
        console.log(response);
        orderStatusChange(response.razorpay_payment_id,response.razorpay_order_id)
        toast.success("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);

     razorpayInstance.on("payment.failed", function (response) {
            toast.error('Payment Failed !!')
            console.log(response);
            orderStatusChange(response.error.metadata.payment_id, response.error.metadata.order_id)
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });
        
    razorpayInstance.open();
  };



  const orderStatusChange=(payment_id, order_id)=>{
           axios.post('http://localhost:8000/api/website/order/change-status', {
            payment_id : payment_id,
            order_id : order_id
        }, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then((result) => {
            if (result.data._status == true) {
                toast.success(result.data._messsage);
                dispatch(clearCart());
            } else {
                toast.error(result.data._messsage);
            }
        })
         .catch((error) => {
            console.log(error);
            toast.error('Something went wrong !');
        })
     }

  


  return (
    <div>
         <BreadCrumb title="Checkout" parent="Home" parent_link="/"/>

           <div className="checkout_form px-4 py-8">
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-8" onSubmit={placeorder}>

        {/* ================= LEFT : BILLING DETAILS ================= */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Billing Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input className="w-full border rounded px-3 py-2" type="text" name='name' />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number *</label>
              <input className="w-full border rounded px-3 py-2" type="text"  name='mobile_number'/>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Billing Name *</label>
              <input className="w-full border rounded px-3 py-2" type="text" name='billing_name' />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Billing Email *</label>
              <input className="w-full border rounded px-3 py-2" type="email" name='biling_email' />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Billing Mobile *</label>
              <input className="w-full border rounded px-3 py-2" type="text" name='billing_mobile' />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Billing Address *</label>
              <input className="w-full border rounded px-3 py-2" type="text" name='billing_address' />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country *</label>
              <select className="w-full border rounded px-3 py-2" name='billing_country'>
                <option>Select Country</option>
                <option>India</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State *</label>
              <input className="w-full border rounded px-3 py-2" type="text" name='billing_state' />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input className="w-full border rounded px-3 py-2" type="text" name='billing_city'/>
            </div>
          </div>

          {/* Ship to different address */}
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm">Ship to a different address?</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Order Notes</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="4"
              placeholder="Notes about your order"
            />
          </div>
        </div>

        {/* ================= RIGHT : ORDER SUMMARY ================= */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Order</h3>

          <div className="border rounded p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>

              <tbody>
                {cart_data.map((items,index)=>{
                    return(
                        <tr  key={index} className="border-b">
                  <td className="py-2">
                    {items.title} × {items.qty}
                  </td>
                  <td className="text-right py-2">Rs {items.price * items.qty}</td>
                </tr>
                )})}
               
              </tbody>

              <tfoot>
                <tr>
                  <th className="text-left py-2">Cart Subtotal</th>
                  <td className="text-right py-2">Rs {subTotal}</td>
                </tr>
                <tr>
                  <th className="text-left py-2">Discount</th>
                  <td className="text-right py-2">₹0</td>
                </tr>
                <tr className="font-semibold border-t">
                  <th className="text-left py-2">Order Total</th>
                  <td className="text-right py-2">Rs {subTotal}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Place Order
          </button>

          <div className="mt-3 text-red-500 text-sm placeOrderError">
            {/* error message here */}
          </div>
        </div>

      </form>
    </div>
    </div>
    
  )
}




