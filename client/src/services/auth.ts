import { ILogin } from "@/interfaces";
import { httpClient } from "@/utils";

export const login = async (payload: ILogin) => {
    return await httpClient.post("/auth/login", payload)
}


