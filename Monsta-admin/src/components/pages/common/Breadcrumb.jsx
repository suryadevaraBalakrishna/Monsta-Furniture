import React from 'react'
import { Link } from 'react-router'

export default function Breadcrumb({parent_link,parent,child_link,child,page_name}) {
    return (
        <div>
            <nav className="flex border-b-2 place-items-center" aria-label="Breadcrumb">
                <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center "><Link className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600" to={parent_link}>{parent}</Link></li>
                    <li>
                        <div className="flex items-center">/<Link className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2" to={child_link}>{child}</Link></div>
                    </li>
                    {page_name && 
                    <li aria-current="page">
                        <div className="flex items-center">/<span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{page_name}</span></div>
                    </li>
                    }
                </ol>
            </nav>
        </div>
    )
}
