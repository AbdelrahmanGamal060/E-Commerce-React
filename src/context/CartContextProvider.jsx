import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContextProvider'


export let CartContext = createContext()


export default function CartContextProvider({ children }) {

    const [products, setProducts] = useState(null)
    const [cartId, setcartId] = useState(null)
    const [numOfCart, setnumOfCart] = useState(null)
    const [totalPrice, settotalPrice] = useState(null)
    const [isloading, setisloading] = useState(false)


    let { Token } = useContext(AuthContext)

    async function addTocart(productId) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, {
            headers: {
                Token
            }
        })
            .then(() => {

                return true
            })
            .catch(() => {

                return false
            })

    }


    function getCart() {
        setisloading(true)
        axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { Token } })
            .then((res) => {
                console.log(res);
                setProducts(res.data.data.products)
                setnumOfCart(res.data.numOfCartItems)
                settotalPrice(res.data.data.totalCartPrice)
                setcartId(res.data.cartId)
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                setisloading(false)
            })
    }


    async function RemoveSpecificItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: { Token } })

            .then((res) => {

                console.log(res);
                setProducts(res.data.data.products)
                setnumOfCart(res.data.numOfCartItems)
                settotalPrice(res.data.data.totalCartPrice)
                return true

            })
            .catch((error) => {

                console.log(error);
                return false
            })

    }

    async function UpdateQuantityProduct(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers: { Token } })
            .then((res) => {
                console.log(res);
                setProducts(res.data.data.products)
                setnumOfCart(res.data.numOfCartItems)
                settotalPrice(res.data.data.totalCartPrice)
                return true
            })
            .catch((error) => {
                console.log(error);
                return false

            })
    }


    async function ClearCart() {
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers: { Token } })
            .then((res) => {
                console.log(res);
                setProducts([])
                setnumOfCart(0)
                settotalPrice(0)

                return true
            }).catch((error) => {
                console.log(error);
                return false
            })

    }
    return <CartContext.Provider value={{ addTocart, getCart, products, numOfCart, totalPrice, isloading,cartId ,RemoveSpecificItem, UpdateQuantityProduct, ClearCart }}>

        {children}

    </CartContext.Provider>
}

