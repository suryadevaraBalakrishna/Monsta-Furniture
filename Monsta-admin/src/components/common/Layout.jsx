import React from 'react';
import Header from './Header'; 
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  return (
    <>
    <ToastContainer/>
    <section className="w-full">
      <div className='grid grid-cols-[20.5%_auto]'>
        <div>
          <Sidebar/>
        </div>
        <div>
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
      </div>
    </section>
    </>
  );
}
