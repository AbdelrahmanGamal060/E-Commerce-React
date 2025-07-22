import React, { createContext, useState } from 'react'

export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {


    const [Token, setToken] = useState(localStorage.getItem("Token"))

    const [IdUser, setIdUser] = useState(localStorage.getItem("id"))


    // useEffect(() => {
    //     if (localStorage.getItem("Token")) {
    //         setToken(localStorage.getItem("Token"))
    //     }
    // }, [])

    return <AuthContext.Provider value={{ Token, setToken, setIdUser, IdUser }}>
        {children}
    </AuthContext.Provider>
}
