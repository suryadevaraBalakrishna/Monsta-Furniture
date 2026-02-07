import Link from 'next/link'
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

export default function Footer() {
   return (
      <footer className="bg-gray-100 text-gray-700 text-sm pt-10">
         <div className="max-w-7xl mx-auto px-4">
            {/* Top Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  pb-10">
               {/* Contact Us */}
               <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <p>Address: Claritas est etiam processus dynamicus</p>
                  <p>Phone: <a href="tel:9781234560" className="text-blue-600 hover:underline">9781234560</a></p>
                  <p>Email: furniture@gmail.com</p>
                  <div className="flex space-x-4 mt-4">
                     <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></Link>
                     <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
                     <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer"><CiTwitter /></Link>
                   
                  </div>
               </div>

               {/* Information */}
               <div>
                  <h3 className="text-lg font-semibold mb-4">Information</h3>
                  <ul className="space-y-2">
                     <li><Link href="/about-us" className="hover:underline">About Us</Link></li>
                     <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
                     <li><Link href="/faq" className="hover:underline">Frequently Questions</Link></li>
                  </ul>
               </div>

               {/* My Account */}
               <div>
                  <h3 className="text-lg font-semibold mb-4">My Account</h3>
                  <ul className="space-y-2">
                     <li><Link href="/my-dashboard" className="hover:underline">My Dashboard</Link></li>
                     <li><Link href="/wishlist" className="hover:underline">Wishlist</Link></li>
                     <li><Link href="/cart" className="hover:underline">Cart</Link></li>
                     <li><Link href="/checkout" className="hover:underline">Checkout</Link></li>
                  </ul>
               </div>

               {/* Top Rated Products */}
             
            </div>

            {/* Bottom Copyright */}
            <div className="text-center py-6">
               <p>All Rights Reserved By Furniture | © 2025</p>
               <img
                  src="https://www.wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png"
                  alt="payment methods"
                  className="mx-auto mt-2"
               />
            </div>
         </div>
      </footer>

   )
}
