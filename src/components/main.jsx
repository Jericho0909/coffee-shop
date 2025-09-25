import { Outlet } from "react-router-dom"
const Main = () => {
    return(
        <main 
            className="flex justify-center w-full  mt-[5.50rem] lg:ml-[11rem]"
        >
            <Outlet/>
        </main>
    )
}

export default Main