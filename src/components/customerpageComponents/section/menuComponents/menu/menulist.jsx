import { useContext } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ItemCard from "../../../../itemcard"
const MenuList = () => {
    const { productList } = useContext(FetchDataContext)
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {productList.map(item => (
                <div 
                    key={item.id}
                    className="productList flex justify-center items-center flex-col border border-gray-400
                    w-full h-full p-3 rounded-lg cursor-pointer
                    hover:scale-[0.97] hover:shadow-inner
                    hover:bg-[#fdfaf7] hover:border-[#6F4E37]
                    transition-all duration-300 ease-in-out"
                >   
                    <ItemCard
                        key = {item.id}
                        item = {item}
                    />
                </div>
            ))}
        </div>
    )
}

export default MenuList