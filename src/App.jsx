
import './App.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/cart/cart'
import Login from './components/login/Login'
import Register from './components/register/register'
import Notfoundpage from './components/Notfoundpage/Notfoundpage'
import Category from './components/category/category'
import Brand from './components/Brand/Brand'
import AuthContextProvider from './context/AuthContextProvider'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './context/CartContextProvider'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'
import Allorders from './components/allorders/allorders'
import CategoryDetalis from './components/CategoryDetalis/CategoryDetalis'
import WishList from './components/WishList/WishList'
import WishListContextProvider from './context/WishListContextProvider'
import ForgetYourPassword from './components/ForgetYourPassword/ForgetYourPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'

let client = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "Brand", element: <ProtectedRoute> <Brand /></ProtectedRoute> },
        { path: "WishList", element: <ProtectedRoute> <WishList /></ProtectedRoute> },
        { path: "Products", element: <ProtectedRoute>  <Products />  </ProtectedRoute> },
        { path: "Payment", element: <ProtectedRoute>  <Payment />  </ProtectedRoute> },
        { path: "Allorders", element: <ProtectedRoute>  <Allorders />  </ProtectedRoute> },
        { path: "ProductDetails/:id/:category", element: <ProtectedRoute>  <ProductDetails />  </ProtectedRoute> },
        { path: "Category", element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: "CategoryDetalis/:id", element: <ProtectedRoute><CategoryDetalis /></ProtectedRoute> },
        { path: "Cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
        { path: "ForgetYourPassword", element: <ForgetYourPassword /> },
        { path: "VerifyResetCode", element: <VerifyResetCode /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "*", element: <Notfoundpage /> },
      ]
    }

  ])
  return (
    <>
      < BrowserRouter basename="/E-Commerce-React">
        <AuthContextProvider>
          <QueryClientProvider client={client}>

            <CartContextProvider>
              <WishListContextProvider>

                <ReactQueryDevtools />
                <RouterProvider router={router} />
                <Toaster />

              </WishListContextProvider>
            </CartContextProvider>


          </QueryClientProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
