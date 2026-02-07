"use client"
import { addtoCart } from '@/app/slice/cartSlice'
import { removefromwishlist } from '@/app/slice/wishlistSlice'
import { myStore } from '@/app/store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function WishlistArea() {
  let wishlist_data = useSelector((myStore) => myStore.wishlist.wishlist);

  let dispatch = useDispatch();

  let add_to_cart = (items) => {
    dispatch(addtoCart(items));
    dispatch(removefromwishlist(items.id));
  }
  return (
    <div className="wishlist_area py-12 bg-gray-50 my-5">
      <div className="container mx-auto px-4 max-w-7xl">
        <form action="#">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-md">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="text-left py-3 px-4 w-12">Delete</th>
                  <th className="text-left py-3 px-4 w-24">Image</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4 w-32">Price</th>
                  <th className="text-left py-3 px-4 w-36">Add To Cart</th>
                </tr>
              </thead>
              <tbody>
                {wishlist_data.length >= 1 ?
                  wishlist_data.map((items) => {
                    return (
                      <tr className="border-b border-gray-200">
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            title="Remove from wishlist"
                            className="text-red-500 hover:text-red-700 font-bold"
                            onClick={() => dispatch(removefromwishlist(items.id))}
                          >
                            X
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
                          <button
                            type="button"

                            className="text-black-400 "
                            onClick={() => add_to_cart(items)}
                          >
                            Add To Cart
                          </button>
                        </td>
                      </tr>
                    )
                  })
                  :
                  ''
                }

              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  )
}
