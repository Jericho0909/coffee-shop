import { useState } from "react"
const useAutview = () => {
    const [authView, setAuthView] = useState("login");

    return{
        authView,
        setAuthView
    }
}

export default useAutview