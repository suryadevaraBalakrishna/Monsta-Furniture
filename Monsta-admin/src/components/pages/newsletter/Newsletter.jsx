import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { Link } from 'react-router'
import axios from 'axios';
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';


export default function Newsletter() {

   let [user, setuser] = useState([]);
   const [currentPage, setcurrentPage] = useState(1);
   const [totalPages, settotalPages] = useState(1);

   useEffect(() => {
      axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_NEWSLETTER_VIEW, {
         page: currentPage,
         limit: 10,
      })
         .then((result) => {
            if (result.data._status == true) {
               setuser(result.data._data);
               setcurrentPage(parseInt(result.data._pagination.current_page));
               settotalPages(parseInt(result.data._pagination.total_pages));

            } else {
               setuser([]);
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
      <section className="w-[100%]  place-items-center mx-auto">
         <Breadcrumb parent="Home" parent_link="/" child="Newsletter" child_link="/newsletter" page_name="newsletter" />
         {user.length === 0 ? (
            <p className="text-center mt-10">No Results Found</p>
         ) : (
            <div className="w-full ">
               <div className=" rounded-lg border border-gray-300 px-5 py-5 max-w-[700px] place-items-center mx-auto mt-10 hidden">
                  <form className="flex max-w-sm">
                     <div className="relative w-full"><input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name" required="" /></div>
                     <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                        </svg>
                        <span className="sr-only">Search</span>
                     </button>
                  </form>
               </div>
               <div className="w-full min-h-[fit-content]">
                  <div className="max-w-[90%] mx-auto py-5">
                     <div className="flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                        <h3 className="text-[22px] font-semibold">View Newsletter</h3>
                        {/* <div class="btn-group flex gap-2">
                <button class="bg-green-600 p-[8px] text-white text-[14px] rounded" >Changes Status</button>
                <button class="bg-red-600 p-[8px] text-white text-[14px] rounded" >Delete</button>
              </div> */}
                     </div>
                     <div className="border border-t-0 rounded-b-md border-slate-400">
                        <div className="relative overflow-x-auto">
                           <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                              <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                 <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">

                                    {/* Table Head */}
                                    <thead className="sticky top-0 z-10 text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                       <tr>
                                          <th className="p-4 w-10">
                                             <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                                             />
                                          </th>
                                          <th className="px-4 py-3">Email ID</th>
                                       </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody>
                                       {user.map((items, index) => (
                                          <tr
                                             key={index}
                                             className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                          >
                                             <td className="p-4">
                                                <input
                                                   type="checkbox"
                                                   className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                />
                                             </td>

                                             <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                {items.email}
                                             </td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
                              </div>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {totalPages > 1 && (


            <div className="w-full text-center mb-2">
               <div className="page-flex justify-center">
                  <ResponsivePagination current={currentPage} total={totalPages} onPageChange={handlepagechange} className='flex gap-3 justify-center' />
               </div>

            </div>
         )}

      </section>
   )
}
