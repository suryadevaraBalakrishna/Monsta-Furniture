"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { useSearchParams } from 'next/navigation';

export default function ProductContainer({ categorySlug }) {
    let [Category, setCategory] = useState([]);
    let [products, setProducts] = useState([]);
    let [checkedCategory, SetcheckedCategory] = useState([]);
    let [checkedColor, SetcheckedColor] = useState([]);
    let [checkedMaterial, SetcheckedMaterial] = useState([]);
    let [nestedcategory,setnestedcategory]=useState([]);
    let [subsubcheckedCategory,SetsubsubcheckedCategory]=useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [totalPages, settotalPages] = useState(1);
    let [Color, setColor] = useState([]);
    let [Material, setMaterial] = useState([]);
    const [sortBy, setSortBy] = useState("");


   



    // let fetch_products = async () => {
    //     let api_url = process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_PRODUCT_VIEW;

    //     // if (selectedcategory) {
    //     //     api_url = `https://dummyjson.com/products/category/${selectedcategory}?limit=${limit}&skip=${(page - 1) * limit}`
    //     // }

    //     let reponse = await axios.post(api_url);
    //     setProducts(reponse.data._data);

    // }

    // useEffect(() => {
    //     fetch_products();
    // }, [selectedcategory, page]);


    // let handlecategorychange = (category) => {
    //     setPage(1);
    //     setselectedcategory((prev) => (prev === category ? '' : category))
    // }



    //search
    const searchParams=useSearchParams();
    const search=searchParams.get('search') || '';


    //products
    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PRODUCT_VIEW, {
            parent_category_ids: checkedCategory,
            sub_sub_category_ids: subsubcheckedCategory,
            color: checkedColor,
            material: checkedMaterial,
            sort: sortBy,
            limit: 9,
            page: currentPage,
            name:search,
            category_slug:categorySlug
        })
            .then((result) => {
                if (result.data._status == true) {
                    setProducts(result.data._data);
                    setcurrentPage(parseInt(result.data._pagination.current_page));
                    settotalPages(parseInt(result.data._pagination.total_pages));
                } else {
                    setProducts([]);
                    settotalPages(0);
                }

            })
            .catch(() => {
                toast.error('something wrong');
            })
    }, [checkedCategory, currentPage, checkedColor, checkedMaterial, sortBy,search,subsubcheckedCategory])

    //category
    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_CATEGORY_VIEW, {
            limit: 100

        })
            .then((response) => {
                if (response.data._status == true) {
                    setCategory(response.data._data);

                } else {
                    setCategory([]);
                }
            })
            .catch((error) => {
                toast.error(error.response?.data?._message || "Something went wrong");
            })
    }, [])



    //color
    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_COLOR_VIEW, {
            limit: 100

        })
            .then((response) => {
                if (response.data._status == true) {
                    setColor(response.data._data);

                } else {
                    setColor([]);
                }
            })
            .catch((error) => {
                toast.error(error.response?.data?._message || "Something went wrong");
            })
    }, [])


    //material
    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_MATERIAL_VIEW, {
            limit: 100

        })
            .then((response) => {
                if (response.data._status == true) {
                    setMaterial(response.data._data);

                } else {
                    setMaterial([]);
                }
            })
            .catch((error) => {
                toast.error(error.response?.data?._message || "Something went wrong");
            })
    }, [])


    //nested category
    useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_CATEGORY_MENU)
    .then((result)=>{
         if(result.data._status==true){
             setnestedcategory(result.data._data);
         }else{
          toast.error('something went wrong');
         }
    })
    .catch(()=>{
          toast.error('something went wrong');
    })
  },[])






    let checked = (seletcedCat) => {
        SetcheckedCategory((prev) => (prev === seletcedCat ? '' : seletcedCat));
    }

     let subsubchecked = (seletcedCat) => {
        SetsubsubcheckedCategory((prev) => (prev === seletcedCat ? '' : seletcedCat));
    }





    let checked_color = (selectedColor) => {
        SetcheckedColor((prev) => (prev === selectedColor ? '' : selectedColor));
    }


    let checked_material = (selectedMaterial) => {
        SetcheckedMaterial((prev) => (prev === selectedMaterial ? '' : selectedMaterial))
    }




    const handlepagechange = (page) => {
        setcurrentPage(page);
    }




    return (
        <div className="flex flex-col md:flex-row gap-12 p-6">
            {/* Sidebar */}
         

            <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow">
                   {!categorySlug && 
                 (
                    <>
                <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Categories</h2>
                <ul className="space-y-3 text-gray-700">
                    {Category.map((category) => {
                        return (
                            <li key={category.name}>
                                <input type="checkbox" onChange={() => checked(category._id)} checked={checkedCategory === category._id} />
                                <label className='mx-2'>{category.name}</label>
                            </li>
                        )
                    })}
                </ul>


                {/* new code */}
                {nestedcategory.map((category)=>{
                    return(
                    <h2  key={category._id} >
    {/* Top-level category */}
    {/* <span className="text-2xl font-semibold mb-4 text-indigo-600">
      {category.name}
    </span> */}

    {/* Dropdown */}
    <div >
      {category.sub_categories.map((sub) => (
        <div key={sub._id} className="mb-4">
          {/* Sub category */}
          <p className="text-1xl font-semibold mb-4 text-indigo-600">
            {sub.name}
          </p>

          {/* Sub-sub categories */}
          <ul className="ml-2 space-y-1">
            {sub.sub_sub_categories.map((subsub) => (
               <li key={subsub.name}>
                                <input type="checkbox"  onChange={() => subsubchecked(subsub._id)} checked={subsubcheckedCategory === subsub._id} />
                                
                                <label className='mx-2'>{subsub.name}</label>
             </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </h2>
                )})}
                </>
                  )}

                  

                <h2 className="text-2xl font-semibold mb-4 text-indigo-600 mt-2">Color</h2>
                <ul className="space-y-3 text-gray-700">
                    {Color.map((color) => {
                        return (
                            <li key={color.name}>
                                <input type="checkbox" onChange={() => checked_color(color._id)} checked={checkedColor === color._id} />
                                <label className='mx-2'>{color.name}</label>
                            </li>
                        )
                    })}
                </ul>


                <h2 className="text-2xl font-semibold mb-4 text-indigo-600 mt-2">Material</h2>
                <ul className="space-y-3 text-gray-700">
                    {Material.map((material) => {
                        return (
                            <li key={material.name}>
                                <input type="checkbox" onChange={() => checked_material(material._id)} checked={checkedMaterial === material._id} />
                                <label className='mx-2'>{material.name}</label>
                            </li>
                        )
                    })}
                </ul>
            </aside>
           
            {/* Products */}
            <section className="w-full md:w-3/4">

                <div className="flex justify-end mb-4">
                    <select
                        className="border px-3 py-2 rounded"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="name_asc">Name A-Z</option>
                        <option value="name_desc">Name Z-A</option>
                        <option value="featured">Featured</option>
                        <option value="new_arrival">New Arrival</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length != 0 ? (
                        <ProductList myProducts={products} />
                    ) :
                        (
                            <p>No Products Found</p>
                        )
                    }

                </div>

                {/* Pagination */}
                {/* <div className="flex justify-center mt-6 gap-4">
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600" onClick={()=>setPage((prev)=> Math.max(prev-1,1))}>Prev</button>
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600" onClick={()=>setPage((prev)=> prev + 1)}>Next</button>

                </div> */}
                {totalPages > 1 && (
                    <div className="page-flex justify-center">
                        <ResponsivePagination current={currentPage} total={totalPages} onPageChange={handlepagechange} className='flex gap-3 justify-center' />
                    </div>
                )}

            </section>
        </div>

    )
}
