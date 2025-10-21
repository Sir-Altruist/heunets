"use client"

import { createContext, useCallback, useState } from "react";

interface ILogin {
    email: string;
    password: string
}
export const AuthContext = createContext<any>(null)

export const AuthContextProvider: React.FC = ({ children }: any) => {
    const [loginData, setLoginData] = useState<ILogin>({
        email: '',
        password: ''
    })
    const [user, setUser] = useState({
        username: '',
        firstName: ''
    })

    const updateLoginData = useCallback((info: any) => {
        setLoginData(info)
    }, [loginData])

    const updateUserData = useCallback((info: any) => {
        setUser(info)
    }, [user])

    return (
        <AuthContext.Provider
        value={{
            loginData,
            user,
            updateLoginData,
            updateUserData
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;