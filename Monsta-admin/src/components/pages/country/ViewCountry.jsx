import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { Link } from 'react-router'

export default function ViewCountry() {
  
   let [country,setCountry]=useState([]);
   
   useEffect(()=>{
       let existing=JSON.parse(localStorage.getItem('Country')) || [];
    setCountry(existing);
      
   },[])

  return (
   <section className="w-[100%]  place-items-center mx-auto">
        <Breadcrumb parent="Home" parent_link="/" child="Country" child_link="/country/view" page_name="view" />
      
         {country.length===0 ? (
            <p>No Country Found</p>
         ): 
         (

       
         <div className="w-full min-h-[610px]">
            <div className="max-w-[90%] mx-auto py-5">
               <div className="flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                  <h3 className="text-[22px] font-semibold">View Country</h3>
                  <div className="flex justify-between ">
                     <div className="cursor-pointer text-[white] mx-3 rounded-[50%] w-[40px] h-[40px]  mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center  text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-[18px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                           <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
                        </svg>
                     </div>
                     <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Change Status</button><button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete </button>
                  </div>
               </div>
               <div className="border border-t-0 rounded-b-md border-slate-400">
                  <div className="relative overflow-x-auto">
                     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                 <th scope="col" className="p-4">
                                    <div className="flex items-center"><input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /><label for="checkbox-all-search" className="sr-only">checkbox</label></div>
                                 </th>
                                 <th scope="col" className="px-6 py-3">Country Name</th>
                                 <th scope="col" className=" w-[15%] ">Order</th>
                                 <th scope="col" className="w-[11%]">Status</th>
                                 <th scope="col" className="w-[6%]">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {country.map((items,index)=>{
                                 return(
                                      <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="w-4 p-4">
                                    <div className="flex items-center"><input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /><label for="checkbox-table-search-1" className="sr-only">checkbox</label></div>
                                 </td>
                                 <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="py-4">
                                       <div className="text-base font-semibold">{items.name}</div>
                                    </div>
                                 </th>
                          
                                 <td className=" py-4">{items.order}</td>
                                
                                 <td className=" py-4"><button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Active</button></td>
                                 <td className=" py-4">
                                    <Link to="/user">
                                       <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-[18px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                             <path fill="none" d="M0 0h24v24H0z"></path>
                                             <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                          </svg>
                                       </div>
                                    </Link>
                                 </td>
                              </tr>
                                 )
                              })}
                             
                           
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
           )}
      </section>
  )
}
