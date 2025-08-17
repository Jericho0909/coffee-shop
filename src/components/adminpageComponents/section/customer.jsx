import { useState, useEffect } from "react"
import Loading from "../../loading"
const Customers = () => {
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    })

    if(loading){
        return(
            <Loading/>
        )
    }
    
    return(
        <section>
            <div>
                Customers
            </div>
        </section>
    )
}

export default Customers