import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router'
import Breadcrumb from '../common/Breadcrumb'
import axios from 'axios';
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';


export default function User() {
   let [user,setuser]=useState([]);
     const [currentPage, setcurrentPage] = useState(1);
      const [totalPages, settotalPages] = useState(1);
   

   useEffect(()=>{
       axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_USER_VIEW,{
            page: currentPage,
         limit: 1,
       })
       .then((result)=>{
           if(result.data._status==true){
                setuser(result.data._data);
                  setcurrentPage(parseInt(result.data._pagination.current_page));
               settotalPages(parseInt(result.data._pagination.total_pages));

                console.log(result.data._data);
           }else{
                 setuser([]);
           }
       })
       .catch((error)=>{
         toast.error(error);
       })

   },[currentPage])

     const handlepagechange = (page) => {
      setcurrentPage(page);
   }

   
   return (
      <section className="w-[100%]  place-items-center mx-auto">
         <Breadcrumb parent="Home" parent_link="/" child="user" child_link="/user" page_name="view" />
         {user.length ===0 ?(
              <p className="text-center mt-10">No Results Found</p>
         ):(
            <div className="w-full min-h-[fit-content]">
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
                  <h3 className="text-[22px] font-semibold">View User</h3>
                    {/* <div class="btn-group flex gap-2">
                <button class="bg-green-600 p-[8px] text-white text-[14px] rounded" >Changes Status</button>
                <button class="bg-red-600 p-[8px] text-white text-[14px] rounded" >Delete</button>
              </div> */}
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
                                 <th scope="col" className="px-6 py-3">Name</th>
                                 <th scope="col" className=" w-[30%] ">Email Id</th>
                                 <th scope="col" className=" w-[30%] ">Mobile Number</th>
                                 <th scope="col" className="w-[11%]">Role Type</th>
                                 {/* <th scope="col" className="w-[6%]">Action</th> */}
                              </tr>
                           </thead>
                           <tbody>
                               {user.map((items,index)=>{
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
                                 <td className=" py-4">{items.email}</td>
                                 <td className=" py-4">{items.mobile_number}</td>
                                  <td className="py-4"> {items.role_type }</td>
{/*                               
                                 <td className=" py-4">
                                    <Link to="/user">
                                       <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-[18px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                             <path fill="none" d="M0 0h24v24H0z"></path>
                                             <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                          </svg>
                                       </div>
                                    </Link>
                                 </td> */}
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
         </div>
         )}

            <div className="w-full text-center mb-2">
            <div className="page-flex justify-center">
               <ResponsivePagination current={currentPage} total={totalPages} onPageChange={handlepagechange} className='flex gap-3 justify-center' />
            </div>

         </div>
      </section>
   )
}
