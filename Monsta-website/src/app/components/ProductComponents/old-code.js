import React from 'react'
import ProductList from '../components/ProductComponents/ProductList';
import axios from 'axios';
import ProductContainer from '../components/ProductComponents/ProductContainer';

  let getProduct=async()=>{
    let productData=await axios.get(`https://dummyjson.com/products`);
    let finalData=await productData.data;
    return finalData.products;
  }


  let getcategory=async()=>{
    let category_data=await axios.get(`https://dummyjson.com/products/categories`);
    let final_category=await category_data.data;
    return final_category;
  }



export default async function Products() {

  // let [myProducts,setProducts]=useState([])

  // let getProduct=async()=>{
  //   let productData=await axios.get(`https://dummyjson.com/products`);
  //   let finalData=await productData.data;
  //   setProducts(finalData.products);
  // }

  // useEffect(()=>{
  //  getProduct() 
  // },[myProducts])
  


  let myProducts=await getProduct()


  let mycategory=await getcategory() 

  return (
    <>
      <div className='max-w-[1140px] mx-auto text-center'>
        <h1 className='font-bold'>Products</h1>
      </div>

      <div className="max-w-[1140px] mx-auto p-6 flex flex-col md:flex-row gap-12">

        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Categories</h2>
          <ul className="space-y-3 text-gray-700">
            {mycategory.map((category) => {
              return ( 
                <li>
                  <input class="form-check-input"  id="categories22" type="checkbox" value="22" />
                  <label class="form-check-label mx-2" for="categories22">{category.name}</label>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Product Grid */}
        <section className="w-full md:w-3/4">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Product 1 */}
            <ProductList myProducts={myProducts}/>

            {/* {Products.map((data,index)=>{
              return(
                <Single_product details={data} key={index} />
              )
            })}
           */}


          </div>
      
        </section>
      </div>
    </>
  )
}


// function Single_product({details,key}) {
  
//   return (
//     <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"  key={key}>
//       <img src={details.Image} alt="iPhone 14" className="w-full h-48 object-cover rounded mb-4" />
//       <h3 className="text-lg font-semibold">{details.Name}</h3>
//       <p className="text-gray-600 mb-2">${details.Price}</p>
//       <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded transition">Add to Cart</button>
//     </div>

//   )
// } need to fetch product according to category