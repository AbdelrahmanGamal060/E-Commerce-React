import React, { useContext, useEffect } from 'react'
import Style from "./Cart.module.css"
import { CartContext } from '../../context/CartContextProvider'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {

  let { getCart, products, ClearCart, isloading, RemoveSpecificItem, UpdateQuantityProduct } = useContext(CartContext)


  useEffect(() => {
    getCart()
  }, [])



  async function RemoveItemfromCart(id) {
    let flag = await RemoveSpecificItem(id)
    if (flag) {
      toast.success('deleted !');

    } else {
      toast.error('This is an error!');

    }
  }


  async function UpdataProduct(id, count) {
    let flag = await UpdateQuantityProduct(id, count)
    if (flag) {
      toast.success('updated !');
    } else {
      toast.error('This is an error!');
    }
  }


  async function ClearAllCart() {
    let flag = await ClearCart()
    if (flag) {
      toast.success('deleted All Product !');
    } else {
      toast.error('This is an error!');
    }

  }
  if (isloading) {
    return <>


      <div role="status" className="flex justify-center items-center  h-screen">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span class="sr-only">Loading...</span>
      </div>
    </>
  }


  return <>





    {products?.length > 0 ?
      <div className="relative overflow-hidden shadow-md sm:rounded-lg ">

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>

            </tr>
          </thead>
          <tbody>

            {products?.map((product) => <tr key={product.product._id} className="bg-white border-b :bg-gray-800 :border-gray-700 border-gray-200 hover:bg-gray-50 :hover:bg-gray-600">
              <td className="p-4">
                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 :text-white">
                {product.product.title.split(" ", 2).join(" ")}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button onClick={() => UpdataProduct(product.product._id, --product.count)} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:bg-gray-700 :hover:border-gray-600 :focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div className="ms-3">
                    <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder={product.count} required />
                  </div>
                  <button onClick={() => UpdataProduct(product.product._id, ++product.count)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:bg-gray-700 :hover:border-gray-600 :focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 :text-white">
                {product.price} EGP
              </td>
              <td className="px-6 py-4">
                <span onClick={() => RemoveItemfromCart(product.product._id)} className="font-medium cursor-pointer text-green-600 :text-red-500 mr-2 hover:underline">Remove</span>

              </td>
            </tr>)}

          </tbody>

        </table>
        <div className="flex justify-center  items-center px-6 py-4  mt-4">
          <Link
            to="/Payment"
            className="text-green-700 me-9 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Payment
          </Link>

          <button
            onClick={ClearAllCart}
            className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Clear All Cart
          </button>
        </div>
      </div> : <div className='text-center'> No product found</div>}


  </>
}
