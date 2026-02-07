import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import axios from 'axios';


export default function Order() {
  let [order, setorder] = useState([])

  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);

  useEffect(() => {
    axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_ORDER_VIEW, {
      page: currentPage,
      limit: 10,
    })
      .then((result) => {
        if (result.data._status == true) {
          setorder(result.data._data);
          setcurrentPage(parseInt(result.data._pagination.current_page));
          settotalPages(parseInt(result.data._pagination.total_pages));

          console.log(result.data._data);
        } else {
          setorder([]);
        }
      })
      .catch((error) => {
        toast.error(error);
      })

  }, [currentPage])

  const handlepagechange = (page) => {
    setcurrentPage(page);
  }



  return (
    <section className="w-[100%]  place-items-center mx-auto overflow-hidden">
      <Breadcrumb parent="Home" parent_link="/" child="Orders" child_link="/orders/orders/" />
      {order.length === 0 ?
        (
          <p className="text-center mt-10">No Results Found</p>
        ) :
        (

          <div className="w-full min-h-[fit-content] text-sm">
            <div className="max-w-full xl:max-w-[1220px] mx-auto py-4 px-2">
              <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
                Order&apos;s List
              </h3>

              <div className="border border-t-0 rounded-b-md border-slate-400 overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-gray-600 whitespace-nowrap text-xs">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-3 py-2">
                        <button
                          type="button"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-xs px-3 py-1.5"
                        >
                          Delete
                        </button>
                      </th>
                      <th className="px-3 py-2">Order ID</th>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Quantity</th>
                      <th className="px-3 py-2">Price</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.map((items, index) => {
                      return (


                        <tr className="bg-white border-b" key={index}>
                          <td className="px-3 py-2" >
                            <input
                              type="checkbox"
                              className="w-3.5 h-3.5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                            />
                          </td>
                          <td className="px-3 py-2">{items.order_id}</td>
                          <td className="px-3 py-2 font-medium">{items.billing_address.name}</td>
                          <td className="px-3 py-2 text-center">2</td>
                          <td className="px-3 py-2">₹ {items.total_amount}</td>
                          <td className="px-3 py-2">{items.order_date}</td>
                          <td className="px-3 py-2 text-orange-500"> {items.order_status === 1
                            ? "In Process"
                            : items.order_status === 2
                              ? "Order Placed"
                              : items.order_status === 3
                                ? "Order failed"
                                : "-"
                          }</td>
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              data-modal-target="order-modal"
                              data-modal-toggle="order-modal"
                              className="py-1.5 px-3 text-xs font-medium text-gray-800 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


      {totalPages > 1 &&(
      <div className="w-full text-center mb-2">
        <div className="page-flex justify-center">
          <ResponsivePagination current={currentPage} total={totalPages} onPageChange={handlepagechange} className='flex gap-3 justify-center' />
        </div>

      </div>
            )}


    </section>
  )
}
