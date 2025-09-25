import CoffeeBean from '../assets/images/coffee-bean3.png'
const Aside = ({children}) => {
    return (
        <>
            <div className="flex justify-center items-center w-full h-auto mt-[5rem]">
                <img
                className="w-20 h-auto"
                src={CoffeeBean}
                alt="Coffee-Shop"
                loading="lazy"
                />
            </div>

            <nav className="container-flex justify-center mb-0 flex-col items-start p-4 space-y-4">
                {children}
            </nav>
        </>
    )
}

export default Aside