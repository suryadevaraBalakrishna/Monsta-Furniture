import React from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import ForgotPassword from '../components/ForgotPasswordComponents/ForgotPassword'


export default function forgotPassword() {
  return (
     <div>
            <BreadCrumb title="Forgot Password" parent="Home" parent_link="/"/>
            <ForgotPassword/>
      </div>      
  
  )
}
