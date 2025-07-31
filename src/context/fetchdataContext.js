import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useFetchData";

const FetchDataContext = createContext()

export const FetchDataProvider = ({children}) => {
    const [ adminList, setAdminList ] = useState([]) 
    const { data: Admins, fetchError: adminsError, isLoading: adminsIsLoading, setIsLoading: setAdminsIsLoading } = useAxiosFetch('http://localhost:3500/admins')

    useEffect(() => {
        setAdminList(Admins)
    },[Admins])

    return (
        <FetchDataContext.Provider
            value={{
                adminList, setAdminList, adminsError, adminsIsLoading, setAdminsIsLoading
            }}
        >
            {children}
        </FetchDataContext.Provider>
    )
}

export default FetchDataContext