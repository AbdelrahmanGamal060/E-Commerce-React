import React, { useContext, useEffect, useState } from 'react'
import Style from "./Allorders.module.css"
import { AuthContext } from '../../context/AuthContextProvider'
import axios from 'axios'
import { data } from 'react-router-dom'

export default function Allorders() {

  const [DisplayAllOrder, setDisplayAllOrder] = useState(null)
  let { IdUser } = useContext(AuthContext)

  async function getUserOrder() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${IdUser}`)
    console.log(data);

    setDisplayAllOrder(data)
  }

  useEffect(() => {
    getUserOrder()
  }, [])

  return <>
    <div>


      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                imgs
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>

              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Price
              </th>

            </tr>
          </thead>
          <tbody>

            {DisplayAllOrder?.map((Order) =>

              <tr className="bg-white dark:bg-gray-800" key={Order._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {Order.cartItems[0].product.title}
                </th>
                <td class="px-6 py-4">
                  <img src={Order.cartItems[0].product.imageCover} className='w-20' alt="" />
                </td>
                <td class="px-6 py-4">
                  {Order.cartItems[0].count}
                </td>
                <td class="px-6 py-4">
                  {Order.cartItems[0].price}
                </td>
              </tr>
            )}


          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">totalOrderPrice</th>
              <td className="px-6 py-3">3</td>

            </tr>
          </tfoot>
        </table>
      </div>

    </div>

  </>
}
