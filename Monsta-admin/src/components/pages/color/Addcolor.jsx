'use client';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../common/Breadcrumb';
import ColorPicker from 'react-pick-color';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Addcolor() {

  const params = useParams();
  const updateId = params.id;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');

    const data = {
      name: e.target.name.value,
      code: e.target.code.value,
      order: e.target.order.value
    }

    if (updateId) {
      // var url = `http://localhost:8000/api/admin/color/update/${updateId}`;
      var url= import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_COLOR_UPDATE + updateId;

      axios.put(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/color/view')
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }
    else {
      var url = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_COLOR_CREATE;

      axios.post(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/color/view')
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
  const [colorDetails, setcolorDetails] = useState('');

  useEffect(() => {
    if (updateId) {
      axios.post('http://localhost:8000/api/admin/color/details', {
        id: updateId
      })
        .then((response) => {
          if (response.data._status == true) {
            setcolorDetails(response.data._data);
            console.log(colorDetails);
          } else {
            setcolorDetails([]);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }
  }, [updateId])




  return (
    <section className="w-full mx-auto">
      <Breadcrumb parent="Home" parent_link="/" child="Color" child_link="/color/add" page_name={updateId ? 'Update Color' : 'Add Color'} />

      <div className="w-full min-h-[610px]">
        <div className="max-w-[90%] mx-auto py-5">
          <div className="flex items-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            <h3 className="text-[22px] font-semibold">{updateId ? 'Update Color' : 'Add Color'}</h3>
          </div>

          <div className="border border-t-0 rounded-b-md border-slate-400 p-4 space-y-4">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 font-medium">Color Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={colorDetails.name}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter Color Name"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Select Color</label>
                <input
                  type="color"
                  name="code"
                  defaultValue={colorDetails.code}
                  className="w-full h-10 border border-gray-300 rounded mb-2"
                />
                {/* <ColorPicker/> */}
              </div>

              <div>
                <label className="block mb-1 font-medium">Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={colorDetails.order}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter Order"
                />
              </div>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                {updateId ? 'Update Color' : 'Add Color'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
