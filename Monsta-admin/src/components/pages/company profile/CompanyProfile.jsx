import React from 'react'
import Breadcrumb from '../common/Breadcrumb'

export default function CompanyProfile() {
    return (
        <>
        <div>
            <Breadcrumb parent="Home" parent_link="/" child="Company Profile" child_link="/company-profile" page_name="view" />
        </div>
        
        <div class="bg-white p-6 rounded-[6px]">
   <form autocomplete="off" class="">
      <div class="flex gap-5">
         <div class="w-1/3">
          
         </div>
         <div class="w-2/3">
            <div class=""><label for="Name" class="block  text-md font-medium text-gray-900">Name</label><input type="text" name="Name" id="Name" class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3" placeholder="Name"/></div>
            <div class=""><label for="Email" class="block  text-md font-medium text-gray-900">Email</label><input type="number" name="Email" id="Email" class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3" placeholder="Email"/></div>
            <div class=""><label for="Mobile_Number" class="block  text-md font-medium text-gray-900">Mobile Number</label><input type="number" name="Mobile_Number" id="order" class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3" placeholder="Mobile Number"/></div>
         </div>
      </div>
      <div class="my-2"><label for="Address" class=" block  text-sm font-medium text-gray-900 dark:text-white">Address</label><textarea id="Address" rows="4" name="Address" class="block p-2.5 w-full text-sm resize-none  rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address"></textarea></div>
      <div class="my-2"><label for="Google Map URL" name="Google" class=" block  text-sm font-medium text-gray-900 dark:text-white">Google Map URL</label><textarea id="Google Map URL" rows="4" class="resize-none block p-2.5 w-full text-sm   rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Google Map URL"></textarea></div>
      <div class="my-4 p-2 border-2 border-gray rounded-[6px]"><iframe class="w-full" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14310.50203363295!2d73.030606!3d26.273815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1dfafdd7%3A0xf992fd41c21a238e!2sLaxmi%20Dairy%20%26%20Provision%20Store!5e0!3m2!1sen!2sin!4v1741676183003!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      <button type="submit" class="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">Update Company Profile</button>
   </form>
</div>
</>
    )
}
