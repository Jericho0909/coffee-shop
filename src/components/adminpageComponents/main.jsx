import { Outlet } from "react-router-dom"
const Main = () => {
    return(
        <main className="bg-white mt-[5.70rem] sm:mt-[5rem] md:mt-[5.50rem] lg:mt-[6rem] xl:mt-[6rem] p-1 w-full h-auto">
            <Outlet/>
        </main>
    )
}

export default Main