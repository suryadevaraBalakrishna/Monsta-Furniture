'use client';
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';


export default function NewsLetter() {

   let handleSubmit=(event)=>{
     event.preventDefault();
    
     axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_NEWSLETTER_CREATE,{
      email:event.target.email.value,
     })
     .then((result)=>{
         if(result.data._status==true){
            toast.success('form submitted');
         }else{
          toast.error('something wrong');
         }
     })
     .catch(()=>{
        toast.error('something wrong');
     })
  }

  return (
    <div className="bg-gray-100 py-12">
  <div className="max-w-4xl mx-auto px-4">
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-gray-800">Our Newsletter</h2>
      <p className="text-gray-600 mt-2">Get E-mail updates about our latest shop and special offers.</p>
    </div>
    <form className="flex flex-col sm:flex-row items-center justify-center gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        required
        placeholder="Email address..."
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Subscribe
      </button>
    </form>
    {/* Mailchimp alerts placeholder */}
    <div className="text-center mt-4 text-sm text-gray-500">
      <div className="mailchimp-submitting"></div>
      <div className="mailchimp-success"></div>
      <div className="mailchimp-error text-red-500"></div>
    </div>
  </div>
</div>

  )
}
