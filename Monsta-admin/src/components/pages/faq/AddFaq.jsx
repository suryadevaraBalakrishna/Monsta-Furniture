import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { Link } from 'react-router'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';


export default function AddFaq() {

  let [faq,setfaq]=useState('');

   const params = useParams();
       const updateId = params.id;
   
       const navigate = useNavigate();
   
   
       const handleSubmit=(event)=>{
    event.preventDefault();
      console.log('submitted');

    const data = {
      question: event.target.question.value,
      answer: event.target.answer.value,
      order: event.target.order.value
    }

    

    
    if (updateId) {
      var url= import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_FAQ_UPDATE + '/' + updateId;
      console.log(url);
      axios.put(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/faq/view')
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }
    else {
      var url = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_FAQ_CREATE;

      axios.post(url, data)
        .then((success) => {
          if (success.data._status == true) {
            toast.success(success.data._message);
            navigate('/faq/view')
          } else {
            toast.error(success.data._message);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }

  }


      //  update
       useEffect(() => {
    if (updateId) {
      axios.post('http://localhost:8000/api/admin/faq/details', {
        id: updateId
      })
        .then((response) => {
          if (response.data._status == true) {
            setfaq(response.data._data);
          } else {
            setfaq([]);
          }
        })
        .catch((error) => {
          toast.error(error.data._message);
        })
    }


  }, [updateId])

  
  
    
 
   return (
    <section className="w-full mx-auto">
          <Breadcrumb parent="Home" parent_link="/" child="Faq" child_link="/faq/add" page_name="view" />
    
          <div className="w-full min-h-[610px]">
            <div className="max-w-[90%] mx-auto py-5">
              <div className="flex items-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                <h3 className="text-[22px] font-semibold"> {updateId ? 'UpdateFaq' : 'Add Faq' } </h3>
              </div>
    
              <div className="border border-t-0 rounded-b-md border-slate-400 p-4 space-y-4">

                <form onSubmit={handleSubmit}>
            
               <div><label class="block mb-1 font-medium">Question</label><input className="w-full border border-gray-300 p-2 rounded" placeholder="Question" type="text" defaultValue={faq.question} name='question'  /></div>
               
                <div><label class="block mb-1 font-medium" >Answer</label><textarea  className="w-full border border-gray-300 p-2 rounded" placeholder='Answer' defaultValue={faq.answer} name='answer' ></textarea></div>
                 

            <div><label class="block mb-1 font-medium">Order</label><input class="w-full border border-gray-300 p-2 rounded" placeholder="Enter Order" type="number"  defaultValue={faq.order} name='order' /></div>
    
                {/* Submit Button */}
                <button  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  {updateId ? 'UpdateFaq' : 'Add Faq' } 
                </button>
                </form>
    
              </div>
            </div>
          </div>
        </section>
   )
}
