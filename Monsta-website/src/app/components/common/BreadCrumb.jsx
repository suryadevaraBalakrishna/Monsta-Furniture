import Link from 'next/link'
import React from 'react'


export default function BreadCrumb({title,parent,parent_link}) {
  return (
  <div className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <ul className="flex justify-center items-center space-x-2 text-gray-600 text-sm">
            <li>
              <Link href={parent_link} className="text-blue-600 hover:underline">
                {parent}
              </Link>
            </li>
            <li>&gt;</li>
            <li className="text-gray-800 font-medium">{title}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
