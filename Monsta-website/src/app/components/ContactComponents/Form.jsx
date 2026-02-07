'use client';
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

export default function Form() {

  let handleSubmit=(event)=>{
     event.preventDefault();
    
     axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_CONTACT_CREATE,{
      name:event.target.name.value,
      email:event.target.email.value,
      mobile_number:event.target.mobile.value,
      subject:event.target.subject.value,
      message:event.target.message.value
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
       <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <div className="lg:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <i className="fa fa-fax text-blue-600"></i>
                <span>Address: Claritas est etiam processus dynamicus</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa fa-phone text-blue-600"></i>
                <span>9781234560</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa fa-envelope-o text-blue-600"></i>
                <span>furniture@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-6">Tell us your question</h3>
            <form  onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="name">
                  Your Name (required)
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name *"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="email">
                  Your Email (required)
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email *"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="mobile">
                  Your Mobile Number (required)
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Mobile Number *"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject *"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder="Message *"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
