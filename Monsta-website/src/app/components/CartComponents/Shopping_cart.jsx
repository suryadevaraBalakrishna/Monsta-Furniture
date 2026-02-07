"use client"
import { deleteCart, updateQuantity } from '@/app/slice/cartSlice';
import { myStore } from '@/app/store/store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Shopping_cart() {
  let cart_data = useSelector((myStore) => myStore.cartReducer.cart);

  let subTotal = cart_data.reduce((total, data) => {
    return total + data.price * data.qty
  }, 0)

  console.log(subTotal);


  let dispatch = useDispatch();



  return (
    <div className="shopping_cart_area py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">

        <form autoComplete="off" className="mb-12">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-md">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="text-left py-3 px-4 w-12">Delete</th>
                  <th className="text-left py-3 px-4 w-24">Image</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4 w-32">Price</th>
                  <th className="text-left py-3 px-4 w-36">Quantity</th>
                  <th className="text-left py-3 px-4 w-36">Total</th>
                </tr>
              </thead>
              <tbody>

                {cart_data.map((items,index) => {
                  return (
                    <tr className="border-b border-gray-200" key={index}>
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          title="Remove"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => dispatch(deleteCart(items.id))}
                        >
                          x
                        </button>
                      </td>
                      <td className="py-4 px-4">
                          <img
                            src={items.image}
                            alt={items.title}
                            className="h-16 w-16 object-cover rounded"
                          />
                      </td>
                      <td className="py-4 px-4">

                        {items.title}

                      </td>
                      <td className="py-4 px-4">{items.price}</td>
                      <td className="py-4 px-4">
                        <label htmlFor="quantity-16" className="sr-only">
                          Quantity
                        </label>
                        <input
                          id="quantity-16"
                          name="cartProduct[16][product_quantity]"
                          type="number"
                          min="0"
                          max="100"
                          value={items.qty < 1 ? 1 : items.qty}
                          onChange={(e) => dispatch(updateQuantity({ id: items.id, qty: e.target.value < 1 ? 1 : e.target.value }))}
                          className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </td>
                      <td className="py-4 px-4 font-semibold">Rs {items.price * items.qty}</td>
                    </tr>
                  )
                })}


              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Update Cart
            </button>
          </div>
        </form>

        <div className="coupon_area flex flex-col md:flex-row gap-8">
          <div className="coupon_code md:w-1/2 bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Coupon</h3>
            <p className="mb-4">Enter your coupon code if you have one.</p>
            <form autoComplete="off" noValidate className="flex gap-2">
              <input
                type="text"
                name="entercode"
                id="entercode"
                placeholder="Coupon code"
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Apply coupon
              </button>
            </form>
          </div>

          <div className="coupon_code md:w-1/2 bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <p>Subtotal</p>
                <p className="font-semibold">Rs {subTotal}</p>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <p>Discount (-)</p>
                <p className="font-semibold text-red-600">Rs. 0</p>
              </div>
              <div className="flex justify-between pt-2 font-semibold text-lg">
                <p>Total</p>
                <p>Rs {subTotal}</p>
              </div>
              <div className="mt-6">
                <a
                  href="/checkout"
                  className="block text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                  Proceed to Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
