import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { Link, useNavigate, useParams } from 'react-router'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { toast } from 'react-toastify'
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import $, { event } from "jquery";



export default function ProductDetails() {

    const params = useParams();
    const updateId = params.id;

    const navigate = useNavigate();

    let [Category, setCategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const [subsubCategory, setsubsubCategory] = useState([]);
    const [Color, setColor] = useState([]);
    const [Material, setMaterial] = useState([]);
    const [ProductDetails, setProductDetails] = useState('');
    const [imagePath, setimagePath] = useState('');
    const [galleryPath, setgalleryPath] = useState([]);


    console.log('sub', ProductDetails.sub_category_ids);
    console.log('cat', ProductDetails.parent_category_ids);
    console.log('sub sub', ProductDetails.sub_sub_category_ids);


    //category
    useEffect(() => {
        axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_CATEGORY_VIEW, {
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
        axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_COLOR_VIEW, {
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

    //Material
    useEffect(() => {
        axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_MATERIAL_VIEW, {
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


    //get subcategory
    const getSubcategory = (event) => {
        let parentId = event.target.value;
        axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_CATEGORY_VIEW, {
            parent_category_id: parentId,
        })
            .then((response) => {
                if (response.data._status == true) {
                    setsubCategory(response.data._data);
                } else {
                    setsubCategory([]);
                }
            })
            .catch((error) => {
                toast.error(error.response?.data?._message || "Something went wrong");
            })

    }


    //get sub sub category
    const getSubSubCategory = (event) => {
        let subcategoryId = event.target.value;
        console.log(subcategoryId);
        axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_VIEW, {
            sub_category_id: subcategoryId,
        })
            .then((response) => {
                if (response.data._status == true) {
                    setsubsubCategory(response.data._data);
                } else {
                    setsubsubCategory([]);
                }
            })
            .catch((error) => {
                toast.error(error.response?.data?._message || "Something went wrong");
            })
    }






    // update
    useEffect(() => {
        if (updateId) {
            axios.post('http://localhost:8000/api/admin/products/details', {
                id: updateId
            })
                .then((response) => {
                    if (response.data._status == true) {
                        setProductDetails(response.data._data);
                        setimagePath(response.data._image_path + response.data._data.image);
                        // setgalleryPath(response.data._image_path + response.data._data.images);
                        setgalleryPath(
                            response.data._data.images.map((img)=>response.data._image_path + img)
                        )

                    } else {
                        setProductDetails([]);
                    }
                })
                .catch((error) => {
                    toast.error(error.data._message);
                })
        }

    }, [updateId])


    //dropify
    useEffect(() => {
        const dropifyElement = $("#image");

        if (dropifyElement.data("dropify")) {
            dropifyElement.data("dropify").destroy();
            dropifyElement.removeData("dropify");
        }

        // **Force Update Dropify Input**
        dropifyElement.replaceWith(
            `<input type="file" accept="image/*" name="image" id="image" multiple="multiple"
          class="dropify" data-height="250" data-default-file="${imagePath}"/>`
        );

        // **Reinitialize Dropify**
        $("#image").dropify();
    }, [imagePath]);

    useEffect(() => {
        const dropifyElement = $("#images");

        if (dropifyElement.data("dropify")) {
            dropifyElement.data("dropify").destroy();
            dropifyElement.removeData("dropify");
        }

        // **Force Update Dropify Input**
        dropifyElement.replaceWith(
            `<input type="file" accept="image/*" name="images" id="images" multiple="multiple"
          class="dropify" data-height="250" data-default-file=""/>`
        );

        // **Reinitialize Dropify**
        $("#images").dropify();
    },);



    //submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitted');

        const data = event.target



        if (updateId) {
            var url = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_PRODUCT_UPDATE + '/' + updateId;
            console.log(url);
            axios.put(url, data)
                .then((success) => {
                    if (success.data._status == true) {
                        toast.success(success.data._message);
                        navigate('/product/product-items')
                    } else {
                        toast.error(success.data._message);
                    }
                })
                .catch((error) => {
                    toast.error(error.data._message);
                })
        }
        else {
            var url = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_PRODUCT_CREATE;

            axios.post(url, data)
                .then((success) => {
                    if (success.data._status == true) {
                        toast.success(success.data._message);
                        navigate('/product/product-items')
                    } else {
                        toast.error(success.data._error_messages[0]);
                        // toast.error(success.data._message);
                    }
                })
                .catch((error) => {
                    toast.error(error.data._message);
                })
        }

    }




    // new code
    // Auto load sub categories
    useEffect(() => {
        if (ProductDetails.parent_category_ids) {
            axios.post(
                import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_CATEGORY_VIEW,
                { parent_category_id: ProductDetails.parent_category_ids }
            ).then(res => {
                if (res.data._status) {
                    setsubCategory(res.data._data);
                }
            });
        }
    }, [ProductDetails.parent_category_ids]);


    // Auto load sub sub categories
    useEffect(() => {
        if (ProductDetails.sub_category_ids) {
            axios.post(
                import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_VIEW,
                { sub_category_id: ProductDetails.sub_category_ids }
            ).then(res => {
                if (res.data._status) {
                    setsubsubCategory(res.data._data);
                }
            });
        }
    }, [ProductDetails.sub_category_ids]);



    return (
        <section className="w-full mx-auto">
            <Breadcrumb parent="Home" parent_link="/" child="Product Details" child_link="/product/product-details" page_name="view" />
            <div className="w-full px-6 py-6">
                <form onSubmit={handleSubmit}>
                    {/* Grid layout with 3 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Column 1: Images */}
                        <div className="space-y-6">
                            {/* Product Image */}
                            <div className="for-images">
                                <label htmlFor="ProductImage" className="block text-md font-medium text-gray-900 text-[#76838f]">Product Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    name='image'
                                    className="dropify"
                                    data-height="160"
                                    multiple="multiple"
                                />
                            </div>

                            {/* Back Image */}

                            {/* Gallery Image */}
                            <div className="for-images">
                                <label htmlFor="ProductImage" className="block text-md font-medium text-gray-900 text-[#76838f]">Gallery Image</label>
                                <input
                                    type="file"
                                    id="images"
                                    name='images'
                                    className="dropify"
                                    multiple="multiple"
                                    data-height="160"
                                />

                            </div>
                            <div className='flex gap-2'>
                                {galleryPath.length > 0 ? (
                                    galleryPath.map((img, index) => {
                                        return (
                                            <img
                                                key={index}
                                                src={img}
                                                className="w-24 h-24 object-cover rounded border my-2"
                                            />
                                        );
                                    })
                                ) : (
                                    <p>No images</p>
                                )}
                            </div>

                        </div>

                        {/* Column 2: Middle Section */}
                        <div className="middle space-y-5">
                            <div>
                                <label htmlFor="Prodct_Name" className="block text-md font-medium text-gray-900 text-[#76838f]">Product Name</label>
                                <input type="text" className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3" placeholder="Product Name" name="name" defaultValue={ProductDetails.name} />
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Select Sub Category</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="sub_category_ids" onChange={getSubSubCategory}   >
                                    <option value="">Select Category</option>
                                    {subCategory.map((value) => {
                                        return (
                                            <option value={value._id} selected={value._id == ProductDetails.sub_category_ids ? 'selected' : ''}>{value.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Select Material</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="material" >
                                    <option value="">Nothing Selected</option>
                                    {Material.map((value) => {
                                        return (
                                            <option value={value._id} selected={value._id == ProductDetails.material ? 'selected' : ''}>{value.name}</option>
                                        )
                                    })}

                                </select>
                            </div>

                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Is Featured</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="is_featured" >

                                    <option value="1" selected={ProductDetails.is_featured == 1 ? 'selected' : ''}>Yes</option>
                                    <option value="0" selected={ProductDetails.is_featured == 0 ? 'selected' : ''}>No</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Is New Arrival</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="is_new_arrival" >

                                    <option value="1" selected={ProductDetails.is_new_arrival == 1 ? 'selected' : ''}>Yes</option>
                                    <option value="0" selected={ProductDetails.is_new_arrival == 0 ? 'selected' : ''}>No</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Is On Sale</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="is_on_sale" >

                                    <option value="1" selected={ProductDetails.is_on_sale == 1 ? 'selected' : ''}>Yes</option>
                                    <option value="0" selected={ProductDetails.is_on_sale == 0 ? 'selected' : ''}>No</option>
                                </select>
                            </div>


                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Is Top Rated</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="is_top_rated" >

                                    <option value="1" selected={ProductDetails.is_top_rated == 1 ? 'selected' : ''}>Yes</option>
                                    <option value="0" selected={ProductDetails.is_top_rated == 0 ? 'selected' : ''}>No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Actual Price</label>
                                <input type="text" className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" placeholder="Actual Price" name="actual_price" defaultValue={ProductDetails.actual_price} />
                            </div>

                        </div>

                        {/* Column 3: Right Items */}
                        <div className="right-items space-y-5">
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Select Parent Category</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="parent_category_ids" onChange={getSubcategory} >
                                    <option value="">Select  Category</option>
                                    {Category.map((value) => {
                                        return (
                                            <option value={value._id} selected={value._id == ProductDetails.parent_category_ids ? 'selected' : ''}>{value.name}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Select Sub Sub Category</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="sub_sub_category_ids" >
                                    <option value="">Select Sub Sub Category</option>
                                    {subsubCategory.map((value) => {
                                        return (
                                            <option value={value._id} selected={value._id == ProductDetails.sub_sub_category_ids ? 'selected' : ''}>{value.name}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Select Color</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="color" >

                                    {Color.map((value) => {
                                        return (
                                            <option value={value._id} selected={value._id == ProductDetails.color ? 'selected' : ''}>{value.name}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Is Best Selling</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="is_best_selling">

                                    <option value="1" selected={ProductDetails.is_best_selling == 1 ? 'selected' : ''}>Yes</option>
                                    <option value="0" selected={ProductDetails.is_best_selling == 0 ? 'selected' : ''}>No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Is Upsell</label>
                                <select className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" name="is_up_selling" >

                                    <option value="1" selected={ProductDetails.is_up_selling == 1 ? 'selected' : ''}>Yes</option>
                                    <option value="0" selected={ProductDetails.is_up_selling == 0 ? 'selected' : ''}>No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Sale Price</label>
                                <input type="text" className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" placeholder="Sale Price" name="sale_price" defaultValue={ProductDetails.sale_price} />
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Order</label>
                                <input type="text" className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" placeholder="Order" name="order" defaultValue={ProductDetails.order} />
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 text-[#76838f]">Total In Stocks</label>
                                <input type="text" className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" placeholder="Total In Stocks" name="stocks" defaultValue={ProductDetails.stocks} />
                            </div>

                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="mt-2">
                        <label className="block text-md font-medium text-gray-900 text-[#76838f]">Product Dimension</label>
                        <input type="text" className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" placeholder="Product Dimension" name="product_dimension" defaultValue={ProductDetails.product_dimension} />
                    </div>
                    <div className="mt-2">
                        <label className="block text-md font-medium text-gray-900 text-[#76838f]">Product Code</label>
                        <input type="text" className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" placeholder="Product Code" name="product_code" defaultValue={ProductDetails.product_code} />
                    </div>
                    <div className="mt-2">
                        <label className="block text-md font-medium text-gray-900 text-[#76838f]">Delivery Date</label>
                        <input type="text" className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3" placeholder="Delivery Date" name="delivery_date" defaultValue={ProductDetails.delivery_date} />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="categoryName" className="block text-md font-medium text-gray-900 text-[#76838f] mb-2">Product Short Description</label>
                        <textarea className="w-full border border-gray-300 p-2 rounded" rows={2} name="short_description" defaultValue={ProductDetails.short_description}></textarea>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="categoryName" className="block text-md font-medium text-gray-900 text-[#76838f] mb-2">Product Description</label>
                        <textarea className="w-full border border-gray-300 p-2 rounded" rows={4} name="long_description" defaultValue={ProductDetails.long_description}></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {updateId ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
