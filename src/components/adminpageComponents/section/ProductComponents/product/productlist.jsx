import { useContext } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ContainerContext from "../../../../../context/containerContext"
import ItemCard from "../../../../itemcard"
const ProductList = () => {
    const { productList } = useContext(FetchDataContext)
    const { container } = useContext(ContainerContext)
    
    return (
        <div 
            ref={container}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-h-[82vh] xl:max-h-[72vh] overflow-y-auto scrollbar-hide"
        >
            {productList.map(item => (
                <div 
                    key={item.id}
                    className="productList flex justify-center items-center flex-col border border-gray-400
                    w-full h-full p-3"
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

export default ProductList