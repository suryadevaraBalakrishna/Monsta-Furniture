import React, { useState } from "react";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function ResetPassword() {

     let [submitStatus, setsubmitStatus] = useState(false);

     

     
    const [searchParams] = useSearchParams(); // ✅ CORRECT
  const token = searchParams.get("token");  // ✅ WORKS

  const navigate = useNavigate();
    
  let handleSubmit=(event)=>{
  event.preventDefault();

   setsubmitStatus(true);

  axios.post('http://localhost:8000/api/admin/user/reset-password',event.target,{
    headers: {
            Authorization: `Bearer ${token}`
    }
  })
  .then((result)=>{
    if(result.data._status==true){
       toast.success(result.data._message);
       setsubmitStatus(true);
       navigate("/");
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
    
      <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link className="flex items-center mb-6 text-2xl font-semibold text-gray-900"><img className="" src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg" alt="logo" /></Link>
                <form autocomplete="off" onSubmit={handleSubmit} className="w-[500px] bg-white rounded-lg shadow-2xl p-6 space-y-4">
                      <div><label for="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label><input type="password"  name="new_password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Password"/></div>
                      <div><label for="password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label><input type="password"  name="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Password"/></div>

                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" disabled={submitStatus}>Submit</button>
                </form>
            </div>
        </section>
  )
}
