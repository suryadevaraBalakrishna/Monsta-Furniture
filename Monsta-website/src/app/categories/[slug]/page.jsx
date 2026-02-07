'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import ProductContainer from '@/app/components/ProductComponents/ProductContainer';

export default function page() {
    const {slug}=useParams();
  return (
    <>
    <ProductContainer categorySlug={slug} />
    </>
  )
}
