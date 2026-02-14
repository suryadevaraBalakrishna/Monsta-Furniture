import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import $, { event } from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";

export default function Profile() {
    let [activeTab, setactiveTab] = useState('edit');
    let [profileDetails,setprofileDetails]=useState('');
    let [UpdateStatus,setUpdateStatus]=useState(false);
    let [Passwordstatus,setPasswordstatus]=useState(false);
    let [imagePath,setimagePath]=useState('');

    let usertoken=useSelector((state)=>{
        return state.login.admin_token;
    })


    useEffect(()=>{
        axios.post('https://monsta-furniture-api.onrender.com/api/admin/user/view-profile',{},{
            headers:{
                'Authorization': `Bearer ${usertoken}`
            }
        })
        .then((result)=>{
            if(result.data._status==true){
                setprofileDetails(result.data._data)
                setimagePath(result.data._image_path +result.data._data.image);
            }else{
                toast.error(result.data._message);
            }
        })
        .catch(()=>{
            toast.error('something went wrong');
        })
    },[])




    let handleUpdate=(event)=>{
        event.preventDefault();
        setUpdateStatus(true);

         axios.post('https://monsta-furniture-api.onrender.com/api/admin/user/update-profile',event.target,{
            headers:{
                'Authorization': `Bearer ${usertoken}`
            }
        })
        .then((result)=>{
            if(result.data._status==true){
                toast.success(result.data._message);
            }else{
                toast.error(result.data._message);
            }
        })
        .catch(()=>{
            setUpdateStatus(false);
            toast.error('something went wrong');
        })



    }


    let updatePassword=(event)=>{
         event.preventDefault();
        setUpdateStatus(true);

         axios.post('https://monsta-furniture-api.onrender.com/api/admin/user/change-password',event.target,{
            headers:{
                'Authorization': `Bearer ${usertoken}`
            }
        })
        .then((result)=>{
            if(result.data._status==true){
                toast.success(result.data._message);
            }else{
                toast.error(result.data._message);
            }
        })
        .catch(()=>{
            setUpdateStatus(false);
            toast.error('something went wrong');
        })
   
    }

         useEffect(() => {
    const dropifyElement = $("#image");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="image"
          class="dropify" data-height="250" data-default-file="${imagePath}"/>`
    );

    // **Reinitialize Dropify**
    $("#image").dropify();

  }, [imagePath,activeTab]); 

    



    return (
        <>
            <div>
                <Breadcrumb parent="Home" parent_link="/" child="Profile" child_link="/profile" page_name="view" />
            </div>
            <div class="w-full px-6 grid grid-cols-[35%_auto] gap-[10px] py-[20px]">
                <div class="bg-white  self-start  rounded-lg shadow-md">
                    <div class="py-[40px] text-center">
                        <img class="w-[80px] h-[80px] mx-auto rounded-full" src={imagePath} alt="Profile" />
                        <h5 class="pt-[6px]">Admin</h5>
                    </div>
                    <div class="bg-[#F6F9FD] p-[20px]  rounded-lg shadow-md">
                        <h4 class="py-[8px] font-bold">Contact Information</h4>
                        <p class="flex items-center gap-[8px] py-[6px]">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M336 0H176a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h160a64 64 0 0 0 64-64V64a64 64 0 0 0-64-64zm32 448a32 32 0 0 1-32 32H176a32 32 0 0 1-32-32V64a32 32 0 0 1 32-32h11.35a7.94 7.94 0 0 1 7.3 4.75A32 32 0 0 0 224 56h64a32 32 0 0 0 29.35-19.25 7.94 7.94 0 0 1 7.3-4.75H336a32 32 0 0 1 32 32z"></path>
                                <path d="M336 48a11.88 11.88 0 0 0-9.53 4.69A48 48 0 0 1 288 72h-64a48 48 0 0 1-38.47-19.31A11.88 11.88 0 0 0 176 48a16 16 0 0 0-16 16v384a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16z"></path>
                                <path d="M336 0H176a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h160a64 64 0 0 0 64-64V64a64 64 0 0 0-64-64zm32 448a32 32 0 0 1-32 32H176a32 32 0 0 1-32-32V64a32 32 0 0 1 32-32h11.35a7.94 7.94 0 0 1 7.3 4.75A32 32 0 0 0 224 56h64a32 32 0 0 0 29.35-19.25 7.94 7.94 0 0 1 7.3-4.75H336a32 32 0 0 1 32 32z"></path>
                            </svg>
                            {profileDetails.mobile_number}
                        </p>
                        <p class="flex items-center gap-[2px] py-[6px]">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
                            </svg>
                            {profileDetails.email}
                        </p>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="flex border-b border-gray-300 mb-4">
                        <button onClick={() => setactiveTab('edit')} className={`px-6 py-2 text-lg font-medium border-b-4 ${activeTab === 'edit'
                                ? 'border-purple-700 text-purple-700'
                                : 'border-transparent text-gray-600'
                            }`}>Edit Profile</button>
                        <button class="px-6 py-2 text-lg font-medium text-gray-600" onClick={() => setactiveTab('password')} className={`px-6 py-2 text-lg font-medium border-b-4 ${activeTab === 'password'
                                ? 'border-purple-700 text-purple-700'
                                : 'border-transparent text-gray-600'
                            }`}>Change Password</button>
                    </div>
                    {activeTab === 'edit' && (
                        <form class="p-3" onSubmit={handleUpdate} >
                            <div class="flex gap-5">
                                <div class="w-1/3">
                                    <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  className="dropify"
                  data-height="250"
                   data-default-file={imagePath}
                />
                                </div>
                                <div class="w-2/3">
                                    <div class="mb-5"><label class="block  text-md font-medium text-gray-900">Name</label><input type="text" name="name" class="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Name"  defaultValue={profileDetails.name}/></div>
                                    <div class="mb-5"><label class="block  text-md font-medium text-gray-900">Email</label><input type="email" name="email" class="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Email" defaultValue={profileDetails.email} /></div>
                                    <div class="mb-5"><label class="block  text-md font-medium text-gray-900">Mobile Number</label><input type="tel" name="mobile_number" class="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Number" defaultValue={profileDetails.mobile_number}/></div>
                                </div>
                            </div>
                            <button type="submit" disabled={UpdateStatus} class="my-5 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg px-5 py-2.5">Update Profile</button>
                        </form>
                    )}

                    {activeTab === 'password' && (
                        <form class="p-3" onSubmit={updatePassword}>
                            <div class="mb-5"><label class="block  text-md font-medium text-gray-900">Current Password</label><input type="password" name="current_password" class="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Current Password" /></div>
                            <div class="mb-5"><label class="block  text-md font-medium text-gray-900">New Password</label><input type="password" name="new_password" class="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="New Password" /></div>
                            <div class="mb-5"><label class="block  text-md font-medium text-gray-900">Confirm Password</label><input type="password" name="confirm_password" class="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Confirm Password" /></div>
                            <button type="submit" disabled={Passwordstatus} class="my-5 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg px-5 py-2.5">Change Password</button>
                        </form>
                    )}


                </div>
            </div>
        </>
    )
}
