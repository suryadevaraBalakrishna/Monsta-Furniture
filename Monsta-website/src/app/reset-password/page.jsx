import React, { Suspense } from 'react'
import BreadCrumb from '../components/common/BreadCrumb'
import Reset from '../components/ResetPasswordComponents/ResetPassword'


export default function ResetPassword() {
  return (
    <div>
        <BreadCrumb title="Reset Password" parent="Home" parent_link="/"/>
        <Suspense  fallback={<div className="text-center py-10">Loading...</div>}>
        <Reset/>
        </Suspense>
    </div>
  )
}
