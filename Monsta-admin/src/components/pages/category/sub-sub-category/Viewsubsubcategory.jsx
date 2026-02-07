import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import ResponsivePagination from 'react-responsive-pagination';


export default function Viewsubsubcategory() {

    // sub sub category
 
    let [subsubCat,setsubsubCat]=useState([]);
    const [imagePath, setimagePath] = useState('');
    const [apiStatus, setapiStatus] = useState(false);
    const [checkedValue, setcheckedValue] = useState([]);
    let [parentCategoryfilter,setparentCategoryfilter]=useState('');
     const [nameFilter, setnameFilter] = useState('');
     const [currentPage, setcurrentPage] = useState(1);
       const [totalPages, settotalPages] = useState(1);
       

    useEffect(()=>{
       axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_VIEW,{
        limit:100,
        parent_category_id:parentCategoryfilter,
         name: nameFilter,
           page: currentPage,
       })
       .then((response)=>{
        if(response.data._status==true){
             setsubsubCat(response.data._data);
             setimagePath(response.data._image_path);
               setcurrentPage(parseInt(response.data._pagination.current_page));
          settotalPages(parseInt(response.data._pagination.total_pages));
        }else{
             setsubsubCat([])
        }
       })
       .catch((error) => {
          toast.error(error.response?.data?._message || "Something went wrong");
       })
    },[apiStatus,parentCategoryfilter,nameFilter,currentPage])
  

    // category
    let [Category,setCategory]=useState([])


    useEffect(()=>{
         axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_CATEGORY_VIEW,{
          limit:100
         })
         .then((response)=>{
          if(response.data._status==true){
            setCategory(response.data._data);
          }
          else{
            setCategory([]);
          }
         })
          .catch((error) => {
            toast.error(error.response?.data?._message || "Something went wrong");
          })
    },[])


    // single check and multi check

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


   //parent cateogry filter
   
  const filterparentCategory=(event)=>{
    setparentCategoryfilter(event.target.value);
  }


  //search
   const searchRecord = (event) => {
      setnameFilter(event.target.value);
  }



    //change status
     const changeStatus = () => {
    if (checkedValue.length > 0) {
      axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_CHANGE_STATUS, {
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


  //page change
    const handlepagechange = (page) => {
    setcurrentPage(page);
  }


   const deleteRecords = () => {
    if (checkedValue.length > 0) {
      if (confirm('Are you sure you want to delete')) {
        axios.put(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_DELETE, {
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

  

 

  


    


    

  return (
    <section className="w-[100%] place-items-center mx-auto">
         <Breadcrumb parent="Home" parent_link="/" child="Sub Sub Category" child_link="/category/sub-sub-category/view" page_name="view" />
         
         <div class="bg-gray-50 px-2 py-5 max-w-[90%] duration-[1s] flex gap-[20px] w-full">
        <form class="flex">
          <div class="relative w-full">
            <input id="simple-search"    onKeyUp={searchRecord} autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search  name..." required="" type="text" name="search" /></div>
          <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
        <select name="parentCatSelectBox"  onChange={filterparentCategory}  class="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3">
          <option value="">Select Parent Category</option>
          {Category.map((items,index)=>{
            return(
              <option value={items._id}>{items.name}</option>
            )
          })}
        </select>
      </div>

         {subsubCat.length === 0 ? (
           <p>No Sub Sub category found</p>
         ) : (
           <div className="w-full min-h-[fit-content]">
             <div className="max-w-[90%] mx-auto py-5">
               <div className="flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                 {/* 🟩 Updated Title */}
                 <h3 className="text-[22px] font-semibold">View Subcategory</h3>
                 <div class="btn-group flex gap-2"><button class="bg-green-600 p-[8px] text-white text-[14px] rounded" onClick={changeStatus}>Changes Status</button><button class="bg-red-600 p-[8px] text-white text-[14px] rounded" onClick={deleteRecords}>Delete</button></div>
               </div>

               <div className="border border-t-0 rounded-b-md border-slate-400">
                 <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                   <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                       <tr>
                         <th className="p-4">
                           <input onClick={checkedAll}
                            checked={subsubCat.length == checkedValue.length ? 'checked' : ''} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" /><label for="checkbox-all-search" class="sr-only">checkbox</label></th>
                         
                         <th className="px-6 py-3">Sub Sub Category Image</th>
                         <th className="px-6 py-3">Parent Category Name</th>
                         <th className="px-6 py-3">Sub Category Name</th>
                          <th className="px-6 py-3">Sub Sub Category Name</th>
                         <th className="px-6 py-3 w-[15%]">Order</th>
                         <th className="px-6 py-3 w-[11%]">Status</th> {/* 🟩 Add Status */}
                         <th className="px-6 py-3 w-[6%]">Action</th>
                       </tr>
                     </thead>
                     <tbody>
                       {subsubCat.map((item, index) => (
                         <tr key={index} className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4">
                               <input onClick={() => singleCheck(item._id)}
                              checked={checkedValue.includes(item._id) ? 'checked' : ''}
                              type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                           </td>
                           <td className="px-6 py-4">
                            {item.image !== '' ? (
                              <img src={imagePath + item.image} className="w-16 h-16 object-cover" />
                            ) : (
                              'N/A'
                            )}
                           </td>
                           <td className="px-6 py-4">{item.parent_category_id.name}</td>
                             <td className="px-6 py-4">{item.sub_category_id.name}</td>
                           <td className="px-6 py-4">{item.name}</td>
                           <td className="px-6 py-4">{item.order}</td>
                           <td className="px-6 py-4"> {/* 🟩 Status Column */}
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
                             <Link to={`/category/sub-sub-category/update/${item._id}`}>
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
  )
}
