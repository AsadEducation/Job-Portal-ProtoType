import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"

export const useAuth = ()=>{

    const context = useContext(AuthContext);
    return context ;
}