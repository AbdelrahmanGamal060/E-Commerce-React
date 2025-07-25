import React, { useState } from 'react'
import Style from "./register.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as YUP from "yup";
import Login from '../login/Login';
import { AuthContext } from '../../context/AuthContextProvider';
import { useContext } from 'react';

export default function Register() {
  let { setToken } = useContext(AuthContext)


  let navigate = useNavigate()

  const [errMessage, seterrMessage] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  function handleRegister(values) {
    setisLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
        localStorage.setItem("Token", res.data.token);
        navigate("/")
      })
      .catch((error) => {
        console.log(error);

        seterrMessage(error.response.data.message)

      }).finally(() => {
        setisLoading(false)
      })
  }

  let validationSchema = YUP.object().shape({
    name: YUP.string().min(3, "name min 3 char").max(20, "name max 20 char").required("name is requird"),
    email: YUP.string().email("Email is in-valid").required("Email is required"),
    password: YUP.string().matches(/^\w{6,15}$/, "password is not matches").required("password is required"),
    rePassword: YUP.string().oneOf([YUP.ref("password")], "Password and rePassword don't match").required("rePassword is required"),
    phone: YUP.string().matches(/^01[0125][0-9]{8}$/, "phone must be egyption number").required("phone is required")
  })
  // hook
  let RegisterForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister
  })

  return <>
    {errMessage ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
      {errMessage}
    </div> : null}
    <form className='w-1/2 mx-auto' onSubmit={RegisterForm.handleSubmit}>
      <h2 className='my-5 text-2xl'>Register Now : </h2>
      <div>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">name :</label>
        <input

          name='name'
          value={RegisterForm.values.name}
          onChange={RegisterForm.handleChange}
          onBlur={RegisterForm.handleBlur}

          type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 :text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {RegisterForm.errors.name && RegisterForm.touched.name ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
        {RegisterForm.errors.name}
      </div> : null}

      <div>
        <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 :text-white">email :</label>
        <input
          name='email'
          value={RegisterForm.values.email}
          onChange={RegisterForm.handleChange}
          onBlur={RegisterForm.handleBlur}

          type="email" id="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 :text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {RegisterForm.errors.email && RegisterForm.touched.email ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
        {RegisterForm.errors.email}
      </div> : null}
      <div>
        <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Password :</label>
        <input
          name='password'
          value={RegisterForm.values.password}
          onChange={RegisterForm.handleChange}
          onBlur={RegisterForm.handleBlur}
          type="Password" id="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 :text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {RegisterForm.errors.password && RegisterForm.touched.password ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
        {RegisterForm.errors.password}
      </div> : null}
      <div>
        <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 :text-white">rePassword :</label>
        <input
          name='rePassword'
          value={RegisterForm.values.rePassword}
          onChange={RegisterForm.handleChange}
          onBlur={RegisterForm.handleBlur}
          type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  :text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {RegisterForm.errors.rePassword && RegisterForm.touched.rePassword ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
        {RegisterForm.errors.rePassword}
      </div> : null}
      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 :text-white">phone :</label>
        <input
          name='phone'
          value={RegisterForm.values.phone}
          onChange={RegisterForm.handleChange}
          onBlur={RegisterForm.handleBlur}
          type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 :text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {RegisterForm.errors.phone && RegisterForm.touched.phone ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
        {RegisterForm.errors.phone}
      </div> : null}
      <button disabled={isLoading ? true : false} type="submit" className="my-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "Register"}
      </button>


    </form>

  </>
}
