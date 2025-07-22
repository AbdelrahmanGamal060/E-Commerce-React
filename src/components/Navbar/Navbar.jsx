import React, { useContext } from 'react'
import Style from "./Navbar.module.css"
import logo from "../../../public/logo.svg"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContextProvider'

export default function Navbar() {
  let { Token, setToken } = useContext(AuthContext)
  let Navigate = useNavigate()
  function Logout() {
    setToken(null)
    localStorage.removeItem("Token")
    Navigate("/Login")
  }
  return <>

    <nav className='bg-gray-300 py-3 fixed w-full z-[999] top-0 '>
      <div className=' container sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex items-center'>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        {Token ?
          <ul className='flex gap-3 ms-3'>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/Products">Products</Link> </li>
            <li> <Link to="/Cart">Cart</Link> </li>
            <li> <Link to="/Category">Category</Link> </li>
            <li> <Link to="/Brand">Brand</Link> </li>
            <li> <Link to="/WishList">Whis List</Link> </li>
          </ul> : null}

        <ul className='flex ms-auto gap-3'>
          <li> <i className='fab fa-facebook-f'></i> </li>
          <li> <i className='fab fa-tiktok'></i> </li>
          <li> <i className='fab fa-twitter'></i> </li>
          <li> <i className='fab fa-yahoo'></i> </li>
          <li> <i className='fab fa-github'></i> </li>
          {Token ? <li> <span onClick={() => Logout()} > Logout</span> </li> :
            <>
              <li> <Link to="/Login">Login</Link> </li>
              <li> <Link to="/Register">Register</Link> </li>
            </>}


        </ul>
      </div>
    </nav >

  </>
}
