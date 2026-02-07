import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Dropzone from 'react-dropzone'
import Breadcrumb from '../../common/Breadcrumb'
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import $, { event } from "jquery";
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Addsubcategory() {

   const params=useParams();
  const updateId = params.id;

    const [SubcategoryDetails, setSubcategoryDetails] = useState('');
   const [imagePath, setimagePath]=useState('');
   let [Category, setCategory] = useState([]);

      useEffect(() => {
    const dropifyElement = $("#image");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="image"
          class="dropify" data-height="250" data-default-file="${imagePath}"/>`
    );

    // **Reinitialize Dropify**
    $("#image").dropify();

  }, [imagePath]); // ✅ Runs when `defaultImage` updates



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





       const navigate = useNavigate();


  const handleSubmit=(event)=>{
    event.preventDefault();
      console.log('submitted');

    const data = event.target
    

    
    if (updateId) {
      var url= import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_CATEGORY_UPDATE + '/' + updateId;
      console.log(url);
      axios.put(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/category/sub-category/view')
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }
    else {
      var url = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_CATEGORY_CREATE;

      axios.post(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/category/sub-category/view')
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }

  }




  // update
   useEffect(() => {
    if (updateId) {
      axios.post('http://localhost:8000/api/admin/sub-categories/details', {
        id: updateId
      })
        .then((response) => {
          if (response.data._status == true) {
            setSubcategoryDetails(response.data._data);
            setimagePath(response.data._image_path + response.data._data.image)
          } else {
            setSubcategoryDetails([]);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }

  }, [updateId])



   
  return (
     <section className="w-full mx-auto">
          <Breadcrumb parent="Home" parent_link="/" child="Sub Category" child_link="/category/sub-category/add" page_name="view" />
    
          <div className="w-full min-h-[610px]">
            <div className="max-w-[90%] mx-auto py-5">
              <div className="flex items-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                <h3 className="text-[22px] font-semibold">{updateId ? 'Update Subcategory' : 'Add Subcategory'}</h3>
              </div>
    
              <div className="border border-t-0 rounded-b-md border-slate-400 p-4 space-y-4">
                <form onSubmit={handleSubmit} >
                  <div><label class="block mb-1 font-medium">Subcategory Image</label>
                      <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  className="dropify"
                  data-height="250"
                   data-default-file={imagePath}
                />
                  </div>

                   <div><label class="block mb-1 font-medium my-3">Parent category</label>
                   <select class="w-full border border-gray-300 p-2 rounded" placeholder="Enter Category Name" name='parent_category_id'>
                        <option value="">Select Parent Category</option>
                    {Category.map((value)=>{
                          return(
                            <option value={value._id} selected={value._id==SubcategoryDetails.parent_category_id ? 'selected':''}>{value.name}</option>
                          )
                        })}
                   </select>
                   
                   </div>
    

    
                  <div><label class="block mb-1 font-medium my-3">Sub Category Name</label><input class="w-full border border-gray-300 p-2 rounded" placeholder="Enter SubCategory Name" type="text" name='name' defaultValue={SubcategoryDetails.name}  /></div>
    
                  <div><label class="block mb-3 font-medium">Order</label><input class="w-full border border-gray-300 p-2 rounded" placeholder="Enter Order" type="number"  name='order' defaultValue={SubcategoryDetails.order}/></div>
    
                  {/* Submit Button */}
                  <button className="bg-indigo-600 text-white px-4 py-2  mt-2 rounded hover:bg-indigo-700">
                    {updateId ? 'Update Subcategory' : 'Add Subcategory'}
                  </button>
                </form>
    
              </div>
            </div>
          </div>
        </section>
  )
}
