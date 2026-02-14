"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { login, register } from '@/app/slice/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';
import { userDetails } from '@/app/slice/loginSlice';
import Link from 'next/link';


export default function Customerlogin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formSubmit,setformSubmit] = useState(false);

  const [loginStatus,setloginStatus] = useState(false);


  const handleRegister=(event)=>{
     event.preventDefault();
     setformSubmit(true);

     axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_USER_REGISTER,event.target)
     .then((result)=>{
       if(result.data._status==true){
         toast.success(result.data._message);
           setformSubmit(true);
         dispatch(userDetails({
          user: result.data._data,
          token: result.data._token
         }))
         Cookies.set('token',result.data._token);
        //  Cookies.set('user',JSON.stringify(result.data._data))
         router.push('/my-dashboard');
       }else{
        toast.error(result.data._message);
        setformSubmit(false);
       }
     })
     .catch(()=>{
       toast.error('Something went wrong');
       setformSubmit(false);
     })

  }


  const handleLogin=(event)=>{
    event.preventDefault();
    setloginStatus(true);
     
      axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_USER_LOGIN,event.target)
     .then((result)=>{
       if(result.data._status==true){
         toast.success(result.data._message);
           setloginStatus(true);
         dispatch(userDetails({
          user: result.data._data,
          token: result.data._token
         }))
         Cookies.set('token',result.data._token);
        //  Cookies.set('user',JSON.stringify(result.data._data))
         router.push('/my-dashboard');
       }else{
        toast.error(result.data._message);
        setloginStatus(false);
       }
     })
     .catch(()=>{
       toast.error('Something went wrong');
       setloginStatus(false);
     })
  }


  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Login Area */}
          <div className="lg:w-1/2 w-full">
            <div className="account_form">
              <h2 className="text-2xl font-semibold mb-6">Login</h2>
              <form autoComplete="off" onSubmit={handleLogin} noValidate >
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
                <div className="mb-4">
                  <label className="block mb-1 font-medium" htmlFor="login-password">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    name="password"
                    placeholder="Password"
                    
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <input type="checkbox"  onClick={()=>setShowPassword(!showPassword)} className="ml-2"/> show password
                </div>
                <div className="flex justify-between items-center mb-6">
                  <Link href="/forgot-password" className="text-blue-600 hover:underline text-sm">
                    Forgot your password?
                  </Link>
                </div>
                  <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition w-full"
                 disabled={loginStatus}>
                  {loginStatus ? 'Loading..' :'Login'}
                </button>
              </form>
            </div>
          </div>

          {/* Register Area */}
          <div className="lg:w-1/2 w-full">
            <div className="account_form register">
              <h2 className="text-2xl font-semibold mb-6">Register</h2>
              <form autoComplete="off" noValidate onSubmit={handleRegister}>
                 <div className="mb-4">
                  <label className="block mb-1 font-medium" htmlFor="register-email">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                 <div className="mb-4">
                  <label className="block mb-1 font-medium" htmlFor="register-email">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile_number"
                    placeholder="Mobile Number"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium" htmlFor="register-email">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="register-email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 font-medium" htmlFor="register-password">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="register-password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition w-full"
                 disabled={formSubmit}>
                  {formSubmit ? 'Loading..' :'Register'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
