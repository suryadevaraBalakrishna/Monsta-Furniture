import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './components/pages/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/common/Layout.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import Addcolor from './components/pages/color/Addcolor.jsx'
import User from './components/pages/user/User.jsx'
import Enquiry from './components/pages/enquiry/Enquiry.jsx'
import Newsletter from './components/pages/newsletter/Newsletter.jsx'
import Viewcolor from './components/pages/color/Viewcolor.jsx'
import AddMaterial from './components/pages/material/AddMaterial.jsx'
import ViewMaterial from './components/pages/material/ViewMaterial.jsx'
import Addcategory from './components/pages/category/Addcategory.jsx'
import Viewcategory from './components/pages/category/Viewcategory.jsx'
import AddFaq from './components/pages/faq/AddFaq.jsx'
import ViewFaq from './components/pages/faq/ViewFaq.jsx'
import AddCountry from './components/pages/country/AddCountry.jsx'
import ViewCountry from './components/pages/country/ViewCountry.jsx'
import Orders from './components/pages/orders/Orders.jsx'
import AddTestimonial from './components/pages/testimonial/AddTestimonial.jsx'
import ViewTestimonial from './components/pages/testimonial/ViewTestimonial.jsx'
import AddSlider from './components/pages/slider/AddSlider.jsx'
import ViewSlider from './components/pages/slider/ViewSlider.jsx'
import AddWhychoose from './components/pages/why-choose-us/AddWhychoose.jsx'
import ViewWhychoose from './components/pages/why-choose-us/ViewWhychoose.jsx'
import Addsubcategory from './components/pages/category/sub-category/Addsubcategory.jsx'
import Viewsubcategory from './components/pages/category/sub-category/Viewsubcategory.jsx'
import Addsubsubcategory from './components/pages/category/sub-sub-category/Addsubsubcategory.jsx'
import Viewsubsubcategory from './components/pages/category/sub-sub-category/Viewsubsubcategory.jsx'
import ProductDetails from './components/pages/product/ProductDetails.jsx'
import ProductItems from './components/pages/product/ProductItems.jsx'
import Profile from './components/pages/profile/Profile.jsx'
import CompanyProfile from './components/pages/company profile/CompanyProfile.jsx'
import { Provider } from 'react-redux'
import { myStore } from './store/store.js'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import ForgotPassword from './components/pages/ForgotPassword.jsx'
import ResetPassword from './components/pages/ResetPassword.jsx'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <Provider store={myStore}>
     <ToastContainer/>
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute> <Layout /></ProtectedRoute> }>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='user'element={<User/>} />
          <Route path='enquiry' element={<Enquiry/>}/>
          <Route path='newsletter' element={<Newsletter/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='company-profile' element={<CompanyProfile/>}/>
          <Route path='color'>
            <Route path='add' element={<Addcolor/>}/>
            <Route path="update/:id?" element={<Addcolor/>}/>
            <Route path='view' element={<Viewcolor/>}/>
          </Route>
          <Route path='material'>
           <Route path='add' element={<AddMaterial/>}/>
           <Route path='update/:id?' element={<AddMaterial/>}/>
           <Route path='view' element={<ViewMaterial/>}/>
          </Route>
          <Route path='category'>
            <Route path='add' element={<Addcategory/>}/>
              <Route path='update/:id?' element={<Addcategory/>}/>
            <Route path='view' element={<Viewcategory/>}/>

            <Route path='sub-category'>
            <Route path='add' element={<Addsubcategory/>}/>
              <Route path='/category/sub-category/update/:id?' element={<Addsubcategory/>}/>
            <Route path='view' element={<Viewsubcategory/>}/>
            </Route>
            
            <Route path='sub-sub-category'>
              <Route path='add' element={<Addsubsubcategory/>}/>
                <Route path='/category/sub-sub-category/update/:id?' element={<Addsubsubcategory/>}/>
              <Route path='view' element={<Viewsubsubcategory/>}/>
            </Route>

          </Route>
          <Route path='faq'>
            <Route path='add' element={<AddFaq/>}/>
              <Route path='update/:id?' element={<AddFaq/>}/>
            <Route path='view' element={<ViewFaq/>}/>
          </Route>
            <Route path='country'>
            <Route path='add' element={<AddCountry/>}/>
            <Route path='view' element={<ViewCountry/>}/>
          </Route>
           <Route path='orders'>
            <Route path='orders' element={<Orders/>}/>
          </Route>
          <Route path='testimonial'>
            <Route path='add' element={<AddTestimonial/>}/>
             <Route path='update/:id?' element={<AddTestimonial/>}/>
            <Route path='view' element={<ViewTestimonial/>}/>
          </Route>
          <Route path='slider'>
            <Route path='add' element={<AddSlider/>}/>
              <Route path='update/:id?' element={<AddSlider/>}/>
             <Route path='view' element={<ViewSlider/>}/>
          </Route>
          <Route path='why-choose-us'>
            <Route path='add' element={<AddWhychoose/>}/>
             <Route path='update/:id?' element={<AddWhychoose/>}/>
             <Route path='view' element={<ViewWhychoose/>}/>
          </Route>
          
          <Route path='product'>
            <Route path='product-details' element={<ProductDetails/>}/>
               <Route path="product-details/update/:id" element={<ProductDetails />} />
            <Route path='product-items' element={<ProductItems/>}/>
            

          </Route>
       
        </Route>

      </Routes>

    </BrowserRouter>
  </StrictMode>
  </Provider>,
)
