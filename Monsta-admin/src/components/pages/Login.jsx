import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import { userDetails } from '../../slice/loginSlice';


export default function Login() {

const dispatch=useDispatch();

const navigate=useNavigate();

let [loginStatus,setloginStatus]=useState(false);

let handleLogin=(event)=>{
   event.preventDefault();
   setloginStatus(true);

   axios.post('http://localhost:8000/api/admin/user/login',event.target)
   .then((result)=>{
      if(result.data._status==true){
        toast.success(result.data._message);
      //   console.log(result.data._token);
         dispatch((userDetails({
            user:result.data._data,
            token:result.data._token
         })))
         // Cookies.set('admin_token',result.data._token);
         navigate('/dashboard');
      }else{
        toast.error(result.data._message)
        setloginStatus(false);
      }
   })
   .catch(()=>{
      toast.error('something went wrong')
       setloginStatus(false);
   })

}



  return (
    <section className="bg-gray-50">
   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link className="flex items-center mb-6 text-2xl font-semibold text-gray-900"><img className="" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="logo"/></Link>
      <form autocomplete="off" onSubmit={handleLogin} className="w-[500px] bg-white rounded-lg shadow-2xl p-6 space-y-4">
         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in to your account</h1>
         <div><label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label><input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Email"/></div>
         <div><label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label><input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Password"/></div>
         <Link to='/forgot-password' className='my-2 mb-2 text-blue-400'>forgot password</Link>

         <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" disabled={loginStatus}>Sign In</button>
      </form>
   </div>
</section>
  )
}
