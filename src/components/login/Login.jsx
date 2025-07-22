import React, { useState } from 'react'
import Style from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as YUP from "yup";
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../context/AuthContextProvider';


export default function Login() {
  let { setToken, setIdUser } = useContext(AuthContext)

  let navigate = useNavigate()
  const [errMessage, seterrMessage] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  function handleLogin(values) {
    setisLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("Token", res.data.token);
        setToken(res.data.token);
        let { id } = jwtDecode(res.data.token);
        localStorage.setItem("id", id);
        setIdUser(id)
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
    email: YUP.string().email("Email is in-valid").required("Email is required"),
    password: YUP.string().matches(/^\w{6,15}$/, "password is not matches").required("password is required"),
  })
  // hook
  let LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema,
    onSubmit: handleLogin
  })

  return <>
    {errMessage ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
      {errMessage}
    </div> : null}
    <form className='w-1/2 mx-auto' onSubmit={LoginForm.handleSubmit}>
      <h2 className='my-5 text-2xl'>Login Now : </h2>

      <div>
        <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 :text-white">email :</label>
        <input
          name='email'
          value={LoginForm.values.email}
          onChange={LoginForm.handleChange}
          onBlur={LoginForm.handleBlur}

          type="email" id="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 :text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {LoginForm.errors.email && LoginForm.touched.email ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
        {LoginForm.errors.email}
      </div> : null}
      <div>
        <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Password :</label>
        <input
          name='password'
          value={LoginForm.values.password}
          onChange={LoginForm.handleChange}
          onBlur={LoginForm.handleBlur}
          type="Password" id="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 :text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      {LoginForm.errors.password && LoginForm.touched.password ? <div class="p-4 mb-4 text-center text-sm text-red-800 rounded-lg bg-red-50 :bg-gray-800 dark:text-red-400" role="alert">
        {LoginForm.errors.password}
      </div> : null}

      <div className='flex justify-between items-center'>
        <button disabled={isLoading ? true : false} type="submit" className="my-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "Login"}
        </button>

        <Link className=' text-x' to={"/ForgetYourPassword"}>forget your password ?</Link>
      </div>

    </form>

  </>
}

