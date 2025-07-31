import {    useEffect, useState } from "react"
import Header from "../components/adminpageCompoments/header"
import CoffeGif from "../../src/assets/gif/coffee-Gif.gif"
const Adminpage = () => {
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 9000)

        return () => clearTimeout(timer)
    }, [])

    if( loading ){
        return (
            <div className="flex justify-center items-center bg-[#8c6244] w-full h-[100vh]">
                <div className="flex justify-center items-center flex-col w-auto h-auto m-1 p-1 gap-5">
                    <img
                        className="w-[65%] sm:w-[50%] lg:w-[45%] xl:w-[20%] h-auto rounded-[50%]"
                        src={CoffeGif}
                        alt="Coffee-Icon-Loading"
                    />
                    <p className="loader text-[2rem] font-bold font-mono w-fit">
                        Loading...
                    </p>
                </div>
            </div>
        )
    }

    return(
        <>
            <Header/>
        </>
    )
}

export default Adminpage