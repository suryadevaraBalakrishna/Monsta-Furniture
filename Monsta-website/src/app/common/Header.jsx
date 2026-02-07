"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { loadUserFromStorage, logout } from '@/app/slice/authSlice';
import { loadwishlistfromstorage } from '../slice/wishlistSlice';
import { myStore } from '../store/store';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Header() {

  const [searchText, setsearchText] = useState('');
  const [mounted, setMounted] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let [menuData, setmenuData] = useState([]);


  const router = useRouter();


  let mycart = useSelector((myStore) => {
    return (
      myStore.cartReducer.cart
    )
  })

  let isLoggedIn = useSelector((loginstate) => {
    return loginstate.login.token;
  })





  let my_wishlist = useSelector((myStore) => myStore.wishlist.wishlist);

  let dispatch = useDispatch();

    useEffect(() => {
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_CATEGORY_MENU)
      .then((result) => {
        if (result.data._status == true) {
          setmenuData(result.data._data);
        } else {
          toast.error('something went wrong');
          console.log('something went wrong');
        }
      })
      .catch(() => {
        toast.error('something went wrong');
      })
  }, [])


  useEffect(() => {
    // dispatch(loadUserFromStorage());
    dispatch(loadwishlistfromstorage());
  }, []);










  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) return null; // ✅ FIX





  return (
    <div className="sticky top-0 z-[999]">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2 bg-white border-b border-gray-200 gap-2 md:gap-0">
        {/* Left Section */}
        <div className="text-sm text-gray-600">
          <p>Contact us 24/7: +91-9781234560 / furniture@gmail.com</p>
        </div>

        {/* Middle - Search */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && searchText.trim()) {
                router.push(`/products?search=${encodeURIComponent(searchText)}`)
              }
            }}
            className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 text-sm">
          <Link href="/wishlist" className="flex items-center text-gray-600 hover:text-indigo-600">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Wishlist {my_wishlist.length == 0 ? '' : my_wishlist.length}
          </Link>

          <Link href="/cart" className="flex items-center text-gray-600 hover:text-indigo-600">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7.5M17 13l1.5 7.5M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            Cart {mycart.length == 0 ? '' : mycart.length}
          </Link>

          {isLoggedIn ?
            (<>
              <Link href="/my-dashboard" className="text-gray-600 hover:text-indigo-600">
                Dashboard
              </Link>
            </>) : (<Link href="/login-register" className="text-gray-600 hover:text-indigo-600">
              Login / Register
            </Link>)}


        </div>
      </div>

      <nav className="bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className="flex items-center space-x-3 rtl:space-x-reverse" href="/" data-discover="true">
            <img className="h-8" alt="Flowbite Logo" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >

            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${mobileMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          >

            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" href="/" data-discover="true">
                  Home
                </Link>
              </li>
              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" href="/about-us" data-discover="true">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" href="/products" data-discover="true">
                  Products
                </Link>
              </li>
              {menuData.map((category) => (
                <li key={category._id} className="relative group">
                  {/* Top-level category */}
                  <span className="cursor-pointer block  px-3 text-gray-900 hover:text-indigo-600">
                    {category.name}
                  </span>

                  {/* Dropdown */}
                  <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border rounded-lg min-w-[280px] p-4 z-50">
                    {category.sub_categories.map((sub) => (
                      <div key={sub._id} className="mb-4">
                        {/* Sub category */}
                        <p className="font-semibold text-sm text-gray-800 mb-1">
                          {sub.name}
                        </p>

                        {/* Sub-sub categories */}
                        <ul className="ml-2 space-y-1">
                          {sub.sub_sub_categories.map((subsub) => (
                            <li key={subsub._id}>
                              <Link
                                href={`/categories/${subsub.slug}`}
                                className="text-sm text-gray-600 hover:text-indigo-600"
                              >
                                {subsub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              ))}



              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" href="/contact-us" data-discover="true">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" href="/cart" data-discover="true">
                  Cart {mycart.length == 0 ? '' : mycart.length}
                </Link>
              </li>
              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" href="/checkout" data-discover="true">
                  Checkout
                </Link>
              </li>
              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" href="/faq" data-discover="true">
                  FAQ
                </Link>
              </li>

            </ul>


          </div>
        </div>
      </nav>
    </div>

  )
}
