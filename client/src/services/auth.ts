import { ILogin } from "@/interfaces";
import api from "./api";

export const login = async (payload: ILogin) => {
    return await api.req('/auth/login', "POST", payload)
}

// export const login = async (payload: ILogin) => {
//     return api.req('/auth/login', "POST", payload)
// }