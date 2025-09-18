import { useContext } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import AddHighlightContext from "../../../../../context/addhighlightContext"
import ItemCard from "../../../../itemcard"
const ProductList = () => {
    const { productList } = useContext(FetchDataContext)
    const { containerRefs } = useContext(AddHighlightContext)

    return (
        <>
            {productList.length !== 0 
                ? (
                    <div 
                        className={`
                            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full 
                        `}
                    >
                        {productList.map(item => (
                            <div 
                                key={item.id}
                                ref={(el) => (containerRefs.current[item.id] = el)}
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
                : (
                    <div className="container-flex justify-center w-full h-full p-1 mb-0">
                        No Product
                    </div>
                )
            }
        </>
    )
}

export default ProductList