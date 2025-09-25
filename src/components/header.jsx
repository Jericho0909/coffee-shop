import CoffeeIcon from "../assets/icons/coffee-icon.png"
const Header = ({ title, rightContent }) => {
    return(
        <header 
            className="fixed top-0 right-0 z-10 bg-[#8c6244] w-full h-[5.20rem] border border-black"
        >
            <div className="left">
                <div className="w-[4.90rem] sm:w-[5.30rem] md:w-[5.90rem] lg:w-[6rem] xl:w-[6.20rem] h-auto">
                    <img 
                        className="w-full h-full"
                        src={CoffeeIcon} 
                        alt="Coffee-Shop"
                        loading="lazy"
                    />
                </div>
                <div className="w-full m-1 p-1 text-[clamp(1rem,2vw,1.50rem)] text-white font-bold">
                    {title}
                </div>
            </div>
            <div className="right">
                {rightContent}
            </div>
        </header>
    )
}

export default Header