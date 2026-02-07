import React, { useEffect, useState } from 'react';
import Breadcrumb from '../common/Breadcrumb';
import { Link, useParams } from 'react-router'; // corrected import
import axios from 'axios';
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';


export default function Viewcolor() {
  const [color, setColor] = useState([]);
  const [nameFilter, setnameFilter] = useState('');
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [checkedValue, setcheckedValue] = useState([]);
  const [apiStatus, setapiStatus] = useState(false);

  let checkedAll = () => {
    if (color.length != checkedValue.length) {
      var data = [];
      color.forEach((values) => {
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
      axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_COLOR_CHANGE_STATUS, {
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
    else {
      toast.error('Please select at least 1 record');
    }
  }


  const deleteRecords = () => {
    if (checkedValue.length > 0) {
      if (confirm('Are you sure you want to delete')) {
        axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_COLOR_DELETE, {
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


  useEffect(() => {
    axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_COLOR_VIEW, {
      name: nameFilter,
      page: currentPage,
    
    })
      .then((response) => {
        if (response.data._status == true) {
          setColor(response.data._data);
          setcurrentPage(parseInt(response.data._pagination.current_page));
          settotalPages(parseInt(response.data._pagination.total_pages));
          console.log(color);
        } else {
          setColor([]);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?._message || "Something went wrong");
      })
  }, [nameFilter, currentPage, apiStatus])


 

  const searchRecord = (event) => {
    event.preventDefault();
    setnameFilter(event.target.search.value);
    setcurrentPage(1);
  }



  const handlepagechange = (page) => {
    setcurrentPage(page);
  }



  return (
    <section className="w-full mx-auto">
      <Breadcrumb parent="Home" parent_link="/" child="Color" child_link="/color/view" page_name="view" />

      <div className='bg-gray-50 px-2 py-5 max-w-[1220px] duration-[1s]'>
        <form className="flex max-w-sm" onSubmit={searchRecord}>
          <div className="relative w-full">
            <input
              type="text"
              name='search'
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


      </div>



      {color.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">No colors found.</p>
      ) : (
        <div className="w-full ">
          <div className="max-w-[95%] mx-auto py-5">
            <div className="flex items-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
              <h3 className="text-[22px] font-semibold">View Colors</h3>
              <div className='btn-group flex gap-2'>
                <button className='bg-green-600 p-[8px] text-white text-[14px] rounded' onClick={changeStatus}>Changes Status</button>
                <button className='bg-red-600 p-[8px] text-white text-[14px] rounded' onClick={deleteRecords}>Delete</button>
              </div>
            </div>



            <div className="border border-t-0 rounded-b-md border-slate-400">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">
                        <input
                          onClick={checkedAll}
                          checked={color.length == checkedValue.length ? 'checked' : ''}
                          type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                      </th>
                      <th className="px-4 py-3">Color Name</th>
                      <th className="px-4 py-3">Code</th>
                      <th className="px-4 py-3">Order</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {color.map((item, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input onClick={() => singleCheck(item._id)}
                            checked={checkedValue.includes(item._id) ? 'checked' : ''}
                            type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label></td>
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3">{item.code}</td>
                        <td className="px-4 py-3">{item.order}</td>
                        <td className="px-4 py-3">
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
                        <td className="px-4 py-3">
                          <Link to={`/color/update/${item._id}`}>
                            <button className="text-blue-600 hover:underline text-sm">Edit</button>
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
