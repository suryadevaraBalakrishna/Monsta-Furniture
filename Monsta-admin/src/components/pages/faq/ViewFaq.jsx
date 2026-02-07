import React, { useEffect, useState } from 'react';
import Breadcrumb from '../common/Breadcrumb';
import { Link } from 'react-router';
import axios from 'axios';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import ResponsivePagination from 'react-responsive-pagination';
import { toast } from 'react-toastify';

export default function ViewFaq() {
  const [faq, setFaq] = useState([]);
     const [apiStatus, setapiStatus] = useState(false);
         const [checkedValue, setcheckedValue] = useState([]);
           const [currentPage, setcurrentPage] = useState(1);
               const [totalPages, settotalPages] = useState(1);


  useEffect(() => {
     axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_FAQ_VIEW,{
     page: currentPage,
      limit:2,
     }
    )
    .then((result)=>{
        if(result.data._status==true){
           setFaq(result.data._data);
           setcurrentPage(parseInt(result.data._pagination.current_page));
           settotalPages(parseInt(result.data._pagination.total_pages));
        }else{
           setFaq([]);
        }
    })
    .catch((error)=>{
        toast.error(error.response?.data?._message || "Something went wrong");
    })
  }, [apiStatus,currentPage]);


       let checkedAll = () => {
      if (Why.length != checkedValue.length) {
         var data = [];
         Why.forEach((values) => {
            data.push(values._id);
         })
         setcheckedValue([...data]);
      } else {
         setcheckedValue([]);
      }
   }



    let singleCheck = (id) => {
      if (checkedValue.includes(id)) {
         var data = checkedValue.filter((value) => {
            if (value != id) {
               return value;
            }
         })
         data = [...data];
         setcheckedValue(data);
         console.log(data);
      }
      else {
         const data = [...checkedValue, id];
         setcheckedValue(data);
         console.log(data);
      }
   }


    const changeStatus = () => {
      if (checkedValue.length > 0) {
         axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_FAQ_CHANGE_STATUS, {
            id: checkedValue
         })
            .then((response) => {
               if (response.data._status == true) {
                  toast.success(response.data._message);
                  setapiStatus(!apiStatus);
                  setcheckedValue([]);
               } else {
                  toast.error(response.data_message);
               }
            })
            .catch((error) => {
               toast.error('something went wrong');
            })
      }
      else {
         toast.error('Please select at least 1 record');
      }
   }



    const deleteRecords = () => {
      if (checkedValue.length > 0) {
         if (confirm('Are you sure you want to delete')) {
            axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_FAQ_DELETE, {
               id: checkedValue
            })
               .then((response) => {
                  if (response.data._status == true) {
                     toast.success(response.data._message);
                     setapiStatus(!apiStatus);
                     setcheckedValue([]);
                  } else {
                     toast.error(response.data_message);
                  }
               })
               .catch(() => {
                  toast.error('something went wrong');
               })
         }
      }
      else {
         toast.error('Please select at least 1 record');
      }
   }

    const handlepagechange = (page) => {
      setcurrentPage(page);
   }





  return (
    <section className="w-full mx-auto">
      <Breadcrumb
        parent="Home"
        parent_link="/"
        child="Faq"
        child_link="/faq/view"
        page_name="view"
      />

      {faq.length === 0 ? (
        <p className="text-center mt-5 text-gray-600">No FAQs Found</p>
      ) : (
        <div className="w-full min-h-[fit-content]">
          <div className="max-w-[90%] mx-auto py-5">
            <div className="flex items-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
              <h3 className="text-[22px] font-semibold">View FAQs</h3>
                <div class="btn-group flex gap-2">
                        <button class="bg-green-600 p-[8px] text-white text-[14px] rounded" onClick={changeStatus}>Changes Status</button>
                        <button class="bg-red-600 p-[8px] text-white text-[14px] rounded"  onClick={deleteRecords}>Delete</button>
                      </div>
            </div>

            <div className="border border-t-0 rounded-b-md border-slate-400">
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                          <th class="px-4 py-3"><input onClick={checkedAll}
                                    checked={faq.length == checkedValue.length ? 'checked' : ''} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" /><label for="checkbox-all-search" class="sr-only">checkbox</label></th>
                      <th className="px-6 py-3">Question</th>
                      <th className="px-6 py-3">Answer</th>
                      <th className="px-6 py-3">Order</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {faq.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                      >
                          <td className="px-4 py-3">
                                          <input onClick={() => singleCheck(item._id)}
                                             checked={checkedValue.includes(item._id) ? 'checked' : ''}
                                             type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                          <label for="checkbox-all-search" class="sr-only">checkbox</label></td>

                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                          {item.question}
                        </td>

                        <td className="px-6 py-4">{item.answer}</td>

                        <td className="px-6 py-4">{item.order}</td>

                        <td className="px-6 py-4">
                          {item.status ? (
                                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    Active
                                    </span>
                                    ) : (
                                   <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    Inactive
                                    </span>
                                    )}
                        </td>

                       <td className="px-6 py-4">
                                                       <Link to={`/faq/update/${item._id}`}>
                                                         <button className="text-blue-600 hover:underline">Edit</button>
                                                       </Link>
                                                     </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
  );
}
