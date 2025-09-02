import CoffeeIcon from "../assets/icons/coffee-icon.png"
const Aside = ({children}) => {
    return (
        <>
            <div className="flex justify-center items-center w-full h-auto mt-[5rem]">
                <img
                className="w-20 h-auto"
                src={CoffeeIcon}
                alt="Coffee-Shop"
                loading="lazy"
                />
            </div>

            <nav className="flex flex-col items-start p-4 space-y-4">
                {children()}
            </nav>
        </>
    )
}

export default Aside