"use client"

import { createContext, useCallback, useState } from "react";

export const TicketContext = createContext<any>(null)

export const TicketContextProvider: React.FC = ({ children }: any) => {
    const [tickets, setTickets] = useState<any>([])
    const [ticketData, setTicketData] = useState({
        title: '',
        description: ''
    })

    const updateTickets = useCallback((info: any) => {
        setTickets(info)
    }, [])

    const updateTicketData = useCallback((info: any) => {
        setTicketData(info)
    }, [])

    return (
        <TicketContext.Provider
        value={{
            tickets,
            ticketData,
            updateTickets,
            updateTicketData
        }}
        >
            {children}
        </TicketContext.Provider>
    )
}

export default TicketContextProvider;