import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../context/WishListContextProvider'
import { CartContext } from '../../context/CartContextProvider'
import toast from 'react-hot-toast'

export default function WishList() {
  const { addTocart } = useContext(CartContext)
  const { GetLoggedUser, RemoveProductFromWishlist, products, isloading } = useContext(WishListContext)

  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    GetLoggedUser()
  }, [])

  useEffect(() => {
    if (products) {
      setWishlistItems(products)
    }
  }, [products])

  async function RemoveItemfromWishList(id) {
    const flag = await RemoveProductFromWishlist(id)
    if (flag) {
      toast.success('Deleted from wishlist!')
      // نحذف العنصر من الحالة المحلية
      setWishlistItems(prev => prev.filter(item => item._id !== id))
    } else {
      toast.error('Error removing item!')
    }
  }

  if (isloading) {
    return (
      <div role="status" className="flex justify-center items-center h-screen">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142..." fill="currentColor" />
          <path d="M93.9676 39.0409C96.393..." fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-green-600">Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        wishlistItems.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-between shadow hover:shadow-green-200 transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <img src={product.imageCover} alt={product.title} className="w-24 h-24 object-cover rounded-md" />

              <div>
                <h5 className="text-lg font-semibold text-gray-800">{product.title}</h5>
                <p className="text-green-600 font-medium">{product.price} EGP</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => RemoveItemfromWishList(product._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove from wishlist"
                  >
                    <i className="fa-solid fa-heart text-xl"></i>
                  </button>

                  <span
                    onClick={() => RemoveItemfromWishList(product._id)}
                    className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>

            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              onClick={() => addTocart(product._id)}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  )
}
