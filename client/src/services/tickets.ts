import { httpClient, Tools } from "@/utils";

export const fetchAllTickets = async (query: any) => {
    const token = localStorage.getItem("access_token")
    const queryBuilder = Tools.queryBuilder(query)
    return await httpClient.get(`/tickets?${queryBuilder}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const AddTicket = async (payload: any) => {
    const token = localStorage.getItem("access_token")

    return await httpClient.post(`/tickets`, payload, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

