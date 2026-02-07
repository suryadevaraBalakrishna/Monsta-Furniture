'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';



export default function ForgotPassword() {



 let [submitStatus,setsubmitStatus]=useState(false);

let passwordForgot=(event)=>{
  event.preventDefault()
  setsubmitStatus(true);
  axios.post('http://localhost:8000/api/website/user/forgot-password',event.target)
  .then((result)=>{
    if(result.data._status==true){
        toast.success(result.data._message);
    }else{
        toast.error(result.data._message)
    }
  })
  .catch(()=>{
         toast.error('Something went wrong');
   })

}

    


  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-[30%] mx-auto">
            <div className="account_form">
              <h2 className="text-2xl font-semibold mb-6">Forgot password</h2>
              <form autoComplete="off" onSubmit={passwordForgot} noValidate >
                <div className="mb-4">
                  <label className="block mb-1 font-medium" htmlFor="login-email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="login-email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
               
                  <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition w-full"
                 disabled={submitStatus}>
                 {submitStatus ? 'Sending' : 'Send Password Reset' }
                </button>
              </form>
            </div>
          </div>
          </div>
      </div>
      </div>
  )
}
