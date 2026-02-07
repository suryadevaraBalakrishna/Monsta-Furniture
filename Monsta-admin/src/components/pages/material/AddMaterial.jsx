import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'


export default function AddMaterial() {
  const params = useParams();
  const navigate = useNavigate();
  const UpdateId = params.id;

  const handlesubmit = (event) => {
    event.preventDefault();

    const data = {
      name: event.target.materialname.value,
      order: event.target.order.value
    }

    if (UpdateId) {
      // var url = `http://localhost:8000/api/admin/material/update/${UpdateId}`;
      var url= import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_MATERIAL_UPDATE + UpdateId;

      axios.put(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/material/view');
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })

    }
    else {

      var url = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_MATERIAL_CREATE;

      axios.post(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/material/view');
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }
  }


  //Update
  const [Materialdetails, setMaterialdetails] = useState('');

  useEffect(() => {
    if (UpdateId) {
      axios.post('http://localhost:8000/api/admin/material/details', {
        id: UpdateId
      })
        .then((response) => {
          if (response.data._status == true) {
            setMaterialdetails(response.data._data);
          } else {
            setMaterialdetails('');
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }

  }, [UpdateId])


  return (
    <section className="w-full mx-auto">
      <Breadcrumb parent="Home" parent_link="/" child="Material" child_link="/material/add" page_name="view" />

      <div className="w-full min-h-[610px]">
        <div className="max-w-[90%] mx-auto py-5">
          <div className="flex items-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            <h3 className="text-[22px] font-semibold">{UpdateId ? 'Update Material' : 'Add Material'}</h3>
          </div>

          <div className="border border-t-0 rounded-b-md border-slate-400 p-4 space-y-4">
            <form onSubmit={handlesubmit}>
              <div>
                <label className="block mb-1 font-medium">Material Name</label><input className="w-full border border-gray-300 p-2 rounded" placeholder="Enter Material Name" type="text" name='materialname' defaultValue={Materialdetails.name} /></div>

              <div><label className="block mb-1 font-medium my-3">Order</label><input className="w-full border border-gray-300 p-2 rounded" placeholder="Enter Order" type="number" name='order' defaultValue={Materialdetails.order} /></div>

              {/* Submit Button */}
              <button className="bg-indigo-600 text-white px-4 py-2  mt-3 rounded hover:bg-indigo-700">
                {UpdateId ? 'Update Material' : 'Add Material'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  )
}
