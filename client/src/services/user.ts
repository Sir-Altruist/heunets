import api from "./api";

export const profile = async () => {
    const token = localStorage.getItem("access_token")
    return await api.req('/users/profile', undefined, null, true, token)
}

// export const login = async (payload: ILogin) => {
//     return api.req('/auth/login', "POST", payload)
// }