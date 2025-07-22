import React, { useContext, useState } from 'react'
import Style from "./Payment.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContextProvider';
import { CartContext } from '../../context/CartContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Payment() {

  const [cashFlag, setCashFlag] = useState(false)
  let { cartId } = useContext(CartContext)

  let { Token } = useContext(AuthContext)

  let Navigate = useNavigate()


  function CashOrder(values) {



    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, values, {
      headers: {
        Token
      }
    })
      .then((res) => {
        console.log(res);
        Navigate("/allorders")

      })
      .catch((error) => {
        console.log(error);

      })

  }


  function onlineOrder(values) {


    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, values, { headers: { Token } })
      .then((res) => {
        console.log(res);
        window.open(res.data.session.url, "_self")

      }).catch((error) => {
        console.log(error);

      })
  }

  function PaymentOrder(values) {
    let shippingAddress = {
      shippingAddress: values
    }
    if (cashFlag) {
      CashOrder(shippingAddress)
    } else {
      onlineOrder(shippingAddress)
    }
  }

  let paymentForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: PaymentOrder,
  })

  return <>
    <form className='w-1/2 mx-auto' onSubmit={paymentForm.handleSubmit} >
      <div className="relative z-0 w-full mb-5 group">
        <input
          name='details'
          value={paymentForm.values.details}
          onChange={paymentForm.handleChange}
          type="email" id="floating_Details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
        <label htmlFor="floating_Details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          name='phone'
          value={paymentForm.values.phone}
          onChange={paymentForm.handleChange}
          type="tel" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          name='city'
          value={paymentForm.values.city}
          onChange={paymentForm.handleChange}
          type="text" id="floating_City" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
        <label htmlFor="floating_City" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
      </div>
      <button onClick={() => setCashFlag(true)} type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cash</button>
      <button onClick={() => setCashFlag(false)} type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">OnLine</button>

    </form>
  </>
}
