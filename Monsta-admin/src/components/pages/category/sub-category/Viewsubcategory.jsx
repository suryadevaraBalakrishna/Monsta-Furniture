import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Breadcrumb from '../../common/Breadcrumb'
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import { toast } from 'react-toastify';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function Viewsubcategory() {

  let [subCategory, setsubCategory] = useState([]);
  const [nameFilter, setnameFilter] = useState('');
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [apiStatus, setapiStatus] = useState(false);
  const [checkedValue, setcheckedValue] = useState([]);
  const [imagePath, setimagePath] = useState('');
  let [Category, setCategory] = useState([]);
  let [parentCategoryfilter,setparentCategoryfilter]=useState('');

 

   useEffect(() => {
      axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_CATEGORY_VIEW, {
         limit:100

      })
         .then((response) => {
            if (response.data._status == true) {
               setCategory(response.data._data);

            } else {
               setCategory([]);
            }
         })
         .catch((error) => {
            toast.error(error.response?.data?._message || "Something went wrong");
         })
   },[])


  useEffect(() => {
    axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_CATEGORY_VIEW, {
      page: currentPage,
      name: nameFilter,
      // limit:1
      parent_category_id:parentCategoryfilter,

    })
      .then((response) => {
        if (response.data._status == true) {
          setsubCategory(response.data._data);
          setimagePath(response.data._image_path);
          setcurrentPage(parseInt(response.data._pagination.current_page));
          settotalPages(parseInt(response.data._pagination.total_pages));

        } else {
          setsubCategory([]);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?._message || "Something went wrong");
      })
  }, [currentPage, nameFilter, apiStatus,parentCategoryfilter])


  const handlepagechange = (page) => {
    setcurrentPage(page);
  }


 



  let checkedAll = () => {
    if (subCategory.length != checkedValue.length) {
      var data = [];
      subCategory.forEach((values) => {
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
      axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_CATEGORY_CHANGE_STATUS, {
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
        axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_CATEGORY_DELETE, {
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


  const filterparentCategory=(event)=>{
    setparentCategoryfilter(event.target.value);
  }


   const searchRecord = (event) => {
      setnameFilter(event.target.value);
  }

  return (
    <section className="w-[100%] place-items-center mx-auto">
      <Breadcrumb parent="Home" parent_link="/" child="Sub Category" child_link="/sub-category/view" page_name="view" />
      <div className='bg-gray-50 px-2 py-5 max-w-[90%] duration-[1s] flex gap-[20px] w-full'>
        <form className="flex" >
          <div className="relative w-full">
            <input
              type="text"
              name='search'
              onKeyUp={searchRecord}
              id="simple-search" autoComplete='off'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search  name..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        <select onChange={filterparentCategory} name="parentCatSelectBox" className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3">
          <option value="">Select Parent Category</option>
          {Category.map((value)=>{
             return(
               <option value={value._id}>{value.name}</option>
             )
          })}
          
        </select>


      </div>

      {subCategory.length === 0 ? (
        <p>No Sub category found</p>
      ) : (
        <div className="w-full min-h-[fit-content]">
          <div className="max-w-[90%] mx-auto py-5">
            <div className="flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
              {/* 🟩 Updated Title */}
              <h3 className="text-[22px] font-semibold">View Subcategory</h3>
              <div class="btn-group flex gap-2">
                <button class="bg-green-600 p-[8px] text-white text-[14px] rounded" onClick={changeStatus}>Changes Status</button>
                <button class="bg-red-600 p-[8px] text-white text-[14px] rounded" onClick={deleteRecords}>Delete</button></div>
            </div>

            <div className="border border-t-0 rounded-b-md border-slate-400">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="p-4">
                        <th class="px-4 py-3">
                          <input onClick={checkedAll}
                            checked={subCategory.length == checkedValue.length ? 'checked' : ''} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" /><label for="checkbox-all-search" class="sr-only">checkbox</label></th>
                      </th>
                      <th className="px-6 py-3">Category Image</th>
                      <th className="px-6 py-3">Parent Category Name</th>
                      <th className="px-6 py-3">Sub Category Name</th>
                      <th className="px-6 py-3 w-[15%]">Order</th>
                      <th className="px-6 py-3 w-[11%]">Status</th> {/* 🟩 Add Status */}
                      <th className="px-6 py-3 w-[6%]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subCategory.map((items, index) => {
                      return (
                        <tr class="bg-white border-b hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input onClick={() => singleCheck(items._id)}
                              checked={checkedValue.includes(items._id) ? 'checked' : ''}
                              type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checkbox-all-search" class="sr-only">checkbox</label></td>
                          <td className="px-4 py-3">
                            {items.image !== '' ? (
                              <img src={imagePath + items.image} className="w-16 h-16 object-cover" />
                            ) : (
                              'N/A'
                            )}
                          </td>
                          <td class="px-4 py-3">{items.parent_category_id.name}</td>
                          <td class="px-4 py-3">{items.name}</td>
                          <td class="px-4 py-3">{items.order}</td>
                          <td className="px-4 py-3">
                            {items.status ? (
                              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Active
                              </span>
                            ) : (
                              <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td class="px-4 py-3"><a href={`/category/sub-category/update/${items._id}`} data-discover="true"><button class="text-blue-600 hover:underline text-sm">Edit</button></a></td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
      }
      <div className="w-full text-center mb-2">
        <div className="page-flex justify-center">
          <ResponsivePagination current={currentPage} total={totalPages} onPageChange={handlepagechange} className='flex gap-3 justify-center' />
        </div>

      </div>
    </section >
  );
}
