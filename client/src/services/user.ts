import { httpClient } from "@/utils";

export const profile = async () => {
    const token = localStorage.getItem("access_token")
    return await httpClient.get("/users/profile", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

