'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../components/common/BreadCrumb';
import { logOut } from '../slice/loginSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Dashboard() {
  let router = useRouter();
  // let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // let user = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login-register');
  //   }
  // }, [isAuthenticated])

  let [tab, setTab] = useState('home');

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
    router.push('/');
  }

  let [profileDetails, setprofileDetails] = useState('');

  const userToken = useSelector((state) => {
    return state.login.token
  })

  let [order, setorder] = useState([]);



  useEffect(() => {
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_ORDER_VIEW, {}, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then((result) => {
        if (result.data._status == true) {
          setorder(result.data._data);
          console.log(result.data._data);
        } else {
          toast.error(result.data._message);
        }
      })
      .catch(() => {
        toast.error('something error');
      })
  }, [])


  useEffect(() => {
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_VIEW_PROFILE, {}, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then((result) => {
        if (result.data._status == true) {
          setprofileDetails(result.data._data);
        } else {
          toast.error(result.data._message);
        }
      })
      .catch(() => {
        toast.error('something error');
      })
  }, [])



  let updateProfile = (event) => {
    event.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_UPDATE_PROFILE, event.target, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then((result) => {
        if (result.data._status == true) {
          toast.success(result.data._message);
          setprofileDetails(result.data._data);
        } else {
          toast.error(result.data._message);
        }
      })
      .catch(() => {
        toast.error('something error');
      })

  }


  let updatePassword = (event) => {
    event.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_CHANGE_PASSWORD,
      event.target, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then((result) => {
        if (result.data._status == true) {
          toast.success(result.data._message);
        } else {
          toast.error(result.data._message)
        }
      })
      .catch(() => {
        toast.error('something error');
      })

  }

  return (
    <div>
      <BreadCrumb title="My Dashboard" parent="Home" parent_link="/" />
      <div className="p-8">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        {/* <p className="mt-4">Hello, {user?.email}</p> */}
      </div>

      <div className="flex min-h-[400px]">

        {/* LEFT SIDEBAR */}
        <div className="w-1/4 bg-gray-100 p-6 space-y-4">
          <button onClick={() => setTab('home')} className="w-full text-left px-4 py-2 bg-white rounded hover:bg-indigo-100">
            My Dashboard
          </button>

          <button onClick={() => setTab('orders')} className="w-full text-left px-4 py-2 bg-white rounded hover:bg-indigo-100">
            Orders
          </button>


          <button onClick={() => setTab('profile')} className="w-full text-left px-4 py-2 bg-white rounded hover:bg-indigo-100">
            My Profile
          </button>

          <button onClick={() => setTab('change-password')} className="w-full text-left px-4 py-2 bg-white rounded hover:bg-indigo-100">
            Change Password
          </button>

          <button onClick={logout} className="w-full text-left px-4 py-2 bg-white rounded hover:bg-indigo-100">
            Logout
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-3/4 p-6 bg-white rounded shadow">

          {/* DASHBOARD */}
          {tab === 'home' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>
              <p className="text-gray-700">
                Welcome to your dashboard.
              </p>
            </div>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Orders</h2>
              {order.length === 0 ? (

                <p>No orders found.</p>
              ) : (
                <div className="space-y-4">
                  {order.map((order) => (
                    <div
                      key={order._id}
                      className="border rounded-lg p-5 mb-6 shadow-sm"
                    >
                      {/* Order Header */}
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="font-semibold">
                            Order No: <span className="text-gray-600">{order.order_id}</span>
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.order_date).toLocaleDateString()}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded text-sm text-white ${order.order_status === 1
                              ? "bg-yellow-500"
                              : order.order_status === 2
                                ? "bg-green-600"
                                : order.order_status === 3
                                  ? "bg-red-500"
                                  : "bg-gray-400"
                            }`}
                        >
                          {order.order_status === 1
                            ? "In Process"
                            : order.order_status === 2
                              ? "Order Placed"
                              : order.order_status === 3
                                ? "Order Failed"
                                : "-"}
                        </span>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3">
                        {order.product_info.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 border-b pb-3 last:border-b-0"
                          >
                            {/* Product Image */}
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded"
                            />

                            {/* Product Details */}
                            <div className="flex-1">
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.qty}
                              </p>
                            </div>

                            {/* Price */}
                            <p className="font-semibold">
                              ₹{item.price * item.qty}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="flex justify-end mt-4">
                        <p className="text-lg font-bold">
                          Total: ₹{order.net_amount}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>
          )}


          {/* MY PROFILE */}
          {tab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Profile</h2>

              <form className="space-y-4 max-w-md" onSubmit={updateProfile}>
                <div>
                  <label className="block font-medium mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border rounded px-3 py-2"
                    defaultValue={profileDetails.name} name='name'
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <p>{profileDetails.email}</p>

                </div>

                <div>
                  <label className="block font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full border rounded px-3 py-2"
                    name='mobile_number'
                    defaultValue={profileDetails.mobile_number}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                >
                  Update Profile
                </button>
              </form>
            </div>
          )}

          {/* CHANGE PASSWORD */}
          {tab === 'change-password' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Change Password</h2>

              <form className="space-y-4 max-w-md" onSubmit={updatePassword}>
                <div>
                  <label className="block font-medium mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full border rounded px-3 py-2"
                    name='current_password'
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border rounded px-3 py-2"
                    name='new_password'
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name='confirm_password'
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}

        </div>
      </div>


    </div>

  )
}
