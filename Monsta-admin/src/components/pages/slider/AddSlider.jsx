import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { Link, useNavigate, useParams } from 'react-router';
import Dropzone from 'react-dropzone';
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import $, { event } from "jquery";
import { toast } from 'react-toastify';
import axios from 'axios';


export default function AddSlider() {

     const params = useParams();
    const updateId = params.id;

    const navigate = useNavigate();


  const handleSubmit=(event)=>{
    event.preventDefault();
      console.log('submitted');

    const data = event.target
    

    
    if (updateId) {
      var url= import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SLIDER_UPDATE + '/' + updateId;
      console.log(url);
      axios.put(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/slider/view')
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }
    else {
      var url = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SLIDER_CREATE;

      axios.post(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/slider/view')
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }

  }

  //update
    const [imagePath, setimagePath] = useState('');
    const [slider,Setslider]=useState('');

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
    if (updateId) {
      axios.post('http://localhost:8000/api/admin/slider/details', {
        id: updateId
      })
        .then((response) => {
          if (response.data._status == true) {
            Setslider(response.data._data);
            setimagePath(response.data._image_path + response.data._data.image)
          } else {
            Setslider([]);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }

//       $('.dropify').dropify({
//     messages: {
//         'default': 'Drag and drop a file here or click',
//         'replace': 'Drag and drop or click to replace',
//         'remove':  'Remove',
//         'error':   'Ooops, something wrong happended.'
//     }
// });
  }, [updateId])


    return (
        <section className="w-full mx-auto">
            <Breadcrumb parent="Home" parent_link="/" child="Slider" child_link="/slider/add" page_name="add" />
         
          <div className="w-full min-h-[610px]">
                         <div className="max-w-[90%] mx-auto py-5">
                             <div className="flex items-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                                 <h3 className="text-[22px] font-semibold">Add Slider</h3>
                             </div>
         
                             <div className="border border-t-0 rounded-b-md border-slate-400 p-4 space-y-4">
                                 <form
                                     onSubmit={handleSubmit}
                                   
                                 >
                                     <div>
                                         <label className="block mb-1 font-medium mt-2">Image</label>
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
         
                                     <div className='my-4'>
                                         <label className="block mb-1 font-medium">Name</label>
                                         <input className="w-full border border-gray-300 p-2 rounded" placeholder="Name" type="text" name='name' defaultValue={slider.name} />
                                     </div>
         
                                     
                                     <div>
                                         <label className="block mb-1 font-medium">Order</label>
                                         <input className="w-full border border-gray-300 p-2 rounded" placeholder="Order" type="number" name='order' defaultValue={slider.order}  />
                                     </div>
         
         
                                     {/* Submit Button */}
                                     <button className="bg-indigo-600 text-white px-4 mt-4 py-2 rounded hover:bg-indigo-700">
                                        {updateId ? 'Update Slider':'Add Slider'} 
                                     </button>
         
                                 </form>
         
                             </div>
                         </div>
                     </div>
        </section>
    )
}
