'use client';
import axios from 'axios';
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from 'react'
import { toast } from 'react-toastify';


export default function Reset() {

 let [submitStatus,setsubmitStatus]=useState(false);

   const searchParams = useSearchParams();
  const token = searchParams.get("token");

 
   const router = useRouter();

let handleSubmit=(event)=>{
  event.preventDefault();
  setsubmitStatus(true);

  axios.post('http://localhost:8000/api/website/user/reset-password',event.target,{
    headers: {
            Authorization: `Bearer ${token}`
    }
  })
  .then((result)=>{
    if(result.data._status==true){
       toast.success(result.data._message);
       router.push('/login-register')
       setsubmitStatus(true);
    }else{
         toast.error(result.data._message);
         setsubmitStatus(true);
    }
  })
  .catch((error)=>{
     toast.error(error);
     setsubmitStatus(false);
  })
}


  return (
     <div className="flex items-center justify-center bg-white-100 my-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-3 py-2 rounded"
          name='new_password'
          
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border px-3 py-2 rounded"
          name='confirm_password'
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded"
         disabled={submitStatus}>
        {submitStatus ? 'Sending...' : 'Reset Password ' }
        </button>
      </form>
    </div>
  )
}
