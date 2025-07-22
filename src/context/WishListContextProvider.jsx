import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContextProvider'

export let WishListContext = createContext()

export default function WishListContextProvider({ children }) {


    const [products, setProducts] = useState(null)

    const [isloading, setisloading] = useState(false)



    let { Token } = useContext(AuthContext)


    async function Addtowishlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, {
            headers: { Token }
        }).then(() => {

            return true

        }).catch(() => {
            return false
        })
    }

    function GetLoggedUser() {
        setisloading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: { Token } })
            .then((res) => {
                console.log(res);
                setProducts(res.data.data)


            }).catch((error) => {
                console.log(error);

            }).finally(() => {
                setisloading(false)

            })
    }


    async function RemoveProductFromWishlist(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { Token } })
            .then((res) => {
                const remainingIds = res.data.data;
                setProducts(currentProducts =>
                    currentProducts.filter(product => remainingIds.includes(product.id))
                );
                return true
            })
            .catch((error) => {
                console.log(error);
                return false
            })

    }




    return <WishListContext.Provider value={{ Addtowishlist, GetLoggedUser, RemoveProductFromWishlist, products, isloading }}>


        {children}


    </WishListContext.Provider>
}
