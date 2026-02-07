import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Breadcrumb from '../common/Breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function ProductItems() {

  let [Products, setProducts] = useState([]);
  const [imagePath, setimagePath] = useState('');
  const [apiStatus, setapiStatus] = useState(false);
  const [checkedValue, setcheckedValue] = useState([]);
  
  let [Category, setCategory] = useState([]);
  const [nameFilter, setnameFilter] = useState('');
  let [parentCategoryfilter, setparentCategoryfilter] = useState('');
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);


  useEffect(() => {
    axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_PRODUCT_VIEW, {
      limit: 10,
      page: currentPage,
      name: nameFilter,
      parent_category_ids: parentCategoryfilter,
    })
      .then((response) => {
        if (response.data._status == true) {
          setProducts(response.data._data);
          setimagePath(response.data._image_path);
          setcurrentPage(parseInt(response.data._pagination.current_page));
          settotalPages(parseInt(response.data._pagination.total_pages));
        }
        else {
          setProducts([])
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?._message || "Something went wrong");
      })
  }, [apiStatus, nameFilter, parentCategoryfilter, currentPage,apiStatus])


  useEffect(() => {
    axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_CATEGORY_VIEW, {
      limit: 100

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
  }, [])


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
      axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_PRODUCT_CHANGE_STATUS, {
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
        axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_PRODUCT_DELETE, {
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


  const filterparentCategory = (event) => {
    setparentCategoryfilter(event.target.value);
  }


  const searchRecord = (event) => {
    setnameFilter(event.target.value);
  }


  const handlepagechange = (page) => {
    setcurrentPage(page);
  }



  return (
    <section className="w-full place-items-center mx-auto">
      <Breadcrumb
        parent="Home"
        parent_link="/"
        child="Products"
        child_link="product/product-details"
        page_name="View"
      />


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
          {Category.map((value) => {
            return (
              <option value={value._id}>{value.name}</option>
            )
          })}

        </select>


      </div>


      {Products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <div className="w-full min-h-[fit-content]">
          <div class="max-w-[98%] mx-auto py-5">
            <div class="flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
              <h3 class="text-[26px] font-semibold bg-slate-100 ">Product Items</h3>
              <div class="btn-group flex gap-2"><button class="bg-green-600 p-[8px] text-white text-[14px] rounded" onClick={changeStatus}>Changes Status</button>
                <button class="bg-red-600 p-[8px] text-white text-[14px] rounded" onClick={deleteRecords}>Delete</button>
              </div>
            </div>
            <div class="border border-t-0 rounded-b-md border-slate-400">
              <div class="relative overflow-x-auto">
                <table class="w-full  text-left rtl:text-right text-gray-500 ">
                  <thead class="text-[12px] text-gray-700  bg-gray-50 ">
                    <tr>
                      <th class="px-4 py-3"> <input onClick={checkedAll} checked={Products.length == checkedValue.length ? 'checked' : ''} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" /><label for="checkbox-all-search" class="sr-only">checkbox</label></th>
                      <th scope="col" class="px-6 py-3">Name</th>
                      <th scope="col" class="px-6 py-3">Actual Price</th>
                      <th scope="col" class="px-6 py-3">Sale price</th>
                      <th scope="col" class="px-6 py-3">Parent Category</th>
                      <th scope="col" class="px-6 py-3">Thumbnails</th>
                      <th scope="col" class="px-6 py-3">Status</th>
                      <th scope="col" class="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Products.map((items, index) => {
                      return (
                        <tr class="bg-white border-b">
                          <td class="px-6 py-4">
                            <input onClick={() => singleCheck(items._id)}
                              checked={checkedValue.includes(items._id) ? 'checked' : ''}
                              type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                          </td>
                          <td class="px-6 py-4">{items.name}</td>
                          <td class="px-6 py-4">
                            <p>{items.actual_price}</p>

                          </td>
                          <td class="px-6 py-4">
                            <p >{items.sale_price}</p>
                          </td>
                          <td class="px-6 py-4">
                            {items.parent_category_ids != '' && items.parent_category_ids.length > 0 ?
                              (
                                items.parent_category_ids.map((cat) => {
                                  return (
                                    cat.name + ','
                                  )
                                })
                              )
                              :
                              (
                                <p>No Category</p>
                              )
                            }
                          </td>
                          <td class="px-6 py-4">
                            {items.image !== '' ? (
                              <img src={imagePath + items.image} className="w-16 h-16 object-cover" />
                            ) : (
                              'N/A'
                            )}
                          </td>
                          <td class="px-6 py-4 flex gap-3 mt-6">
                            {items.status ? (
                              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Active
                              </span>
                            ) :
                              (
                                <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Inactive
                                </span>
                              )}

                          </td>
                          <td class="px-6 py-4"><a href={`/product/product-details/update/${items._id}`} data-discover="true"><button class="text-blue-600 hover:underline text-sm">Edit</button></a></td>
                        </tr>
                      )
                    })}

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
