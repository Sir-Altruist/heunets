import CombineProviders from "./combine"
import AuthContextProvider from "./auth"
import TicketContextProvider from "./tickets"


const providers: any = [
    AuthContextProvider,
    TicketContextProvider
]

export {
    CombineProviders,
    providers
}