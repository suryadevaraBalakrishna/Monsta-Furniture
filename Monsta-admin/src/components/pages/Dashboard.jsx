import React, { useEffect, useState } from 'react'
import Breadcrumb from './common/Breadcrumb'
import axios from 'axios';
import { toast } from 'react-toastify';


export default function () {
   let [dashboard_data,setdasboard_data]=useState('');
   useEffect(()=>{
          axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_DASHBOARD)
          .then((result)=>{
              if(result.data._status==true){
                setdasboard_data(result.data);
              }else{
               toast.error('something went wrong');
              }
          })
          .catch((error)=>{
            toast.error(error);
          })
   },[])
  return (
    <div class="max-w-[90%] mx-auto py-5 place-items-center">
        <Breadcrumb parent="Home" parent_link="/" child="Dashboard" child_link="/dashboard" />
    <div class="grid grid-cols-3 gap-5 w-[100%] mt-4 min-h-[340px]">
       <div class="h-48 p-5 rounded-md shadow-lg" style={{backgroundColor: 'rgb(89, 86, 211)'}}>
          <div class="flex justify-between items-center">
             <h3 class="text-[25px] text-white font-bold">{dashboard_data.totalUsers}</h3>
          </div>
          <h3 class="text-[22px] font-semibold text-white">Users</h3>
       </div>
       <div class="h-48 p-5 rounded-md shadow-lg" style={{backgroundColor: 'rgb(41, 152, 254)'}}>
          <div class="flex justify-between items-center">
             <h3 class="text-[25px] text-white font-bold">{dashboard_data.totalRecords}</h3>
          </div>
          <h3 class="text-[22px] font-semibold text-white">Product</h3>
       </div>
       <div class="h-48 p-5 rounded-md shadow-lg" style={{backgroundColor:'rgb(233, 83, 83)'}}>
          <div class="flex justify-between items-center">
             <h3 class="text-[25px] text-white font-bold">{dashboard_data.totalOrders}</h3>
          </div>
          <h3 class="text-[22px] font-semibold text-white">Orders</h3>
       </div>
    </div>
 </div>
  )
}
