"use client"

import { createContext, useCallback, useState } from "react";
import { AuthServices } from "@/services";

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
    const [message, setMessage] = useState<{
        error: string;
        success: string
    }>({
        error: "",
        success: ""
    })
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const updateLoginData = useCallback((info: any) => {
        setLoginData(info)
    }, [])

    const handleLogin = useCallback(async (data: ILogin): Promise<any> => {
        try {
            setLoading(true)
            setMessage({
                error: "",
                success: ""
            })
            const response = await AuthServices.login(data)
            if(response.status === "success"){
                localStorage.setItem("access_token", JSON.stringify(response.details.token))
                setMessage(prev => ({
                    ...prev,
                    success: response.message
                }))
            } else {
                setMessage(prev => ({
                    ...prev,
                    error: response.message
                }))
            }
        } catch (error) {
            console.log("error in login: ", error)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider
        value={{
            loginData,
            message,
            loading,
            updateLoginData,
            handleLogin
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;