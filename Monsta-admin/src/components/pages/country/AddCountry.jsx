import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { Link } from 'react-router'

export default function AddCountry() {
 
  let [country,setCountry]=useState({
    name:'',
    order:''
  })

  let handleInputChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setCountry((prevData)=>{
        return({
            ...prevData,
            [name]:value,
        })
    })
   }


   function handleSubmit(e){
    e.preventDefault();

    let newCountry={
      ...country
    }

    let existing=JSON.parse(localStorage.getItem('Country')) || [];
    existing.push(newCountry);

    localStorage.setItem('Country',JSON.stringify(existing));

    setCountry({
        name:'',
    order:''
    })

    alert('Country Saved');

   }

  return (
    <section className="w-full mx-auto">
        <Breadcrumb parent="Home" parent_link="/" child="Country" child_link="/country/add" page_name="view" />
  
        <div className="w-full min-h-[610px]">
          <div className="max-w-[90%] mx-auto py-5">
            <div className="flex items-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
              <h3 className="text-[22px] font-semibold">Add Country</h3>
            </div>
  
            <div className="border border-t-0 rounded-b-md border-slate-400 p-4 space-y-4">
              <form onSubmit={handleSubmit}>
             <div><label class="block mb-1 font-medium">Country Name</label><input class="w-full border border-gray-300 p-2 rounded" placeholder="Enter Country Name" type="text" value={country.name} onChange={handleInputChange} name='name' /></div>
               
          <div><label class="block mb-1 font-medium">Order</label><input class="w-full border border-gray-300 p-2 rounded" placeholder="Enter Order" type="number"  name='order' value={country.order} onChange={handleInputChange}/></div>
  
              {/* Submit Button */}
              <button className="bg-indigo-600 text-white px-4 mt-3 py-2 rounded hover:bg-indigo-700">
                Add Country
              </button>

              </form>
  
            </div>
          </div>
        </div>
      </section>
  )
}
