import { useContext, useState } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"

const ProductDetails = () => {
    const { productList } = useContext(FetchDataContext)
    const [ id,] = useState(sessionStorage.getItem("productId"))

    const product = productList.find(item => item.id === id)

    return(
        <div 
            className="w-full h-full py-[2rem] px-[0.50rem] overflow-y-scroll scrollbar-hide"
        >
            <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                details
            </h1>
            <div>
                <div className="container-flex justify-center">
                    <div 
                        className="w-[10rem] h-[10rem] border border-black mr-[0.50rem] overflow-hidden"
                    >
                        <img
                            className="w-full h-full object-fill border border-[#D4A373]"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                </div>
                <div className="container-flex justify-center">
                    <p
                        className="font-nunito font-bold tracking-wide
                        text-[clamp(0.90rem,2vw,1rem)] " 
                    >
                        {product.name}
                    </p>
                </div>
                <div 
                    className="container-flex justify-start px-[2rem]"
                >
                    <p 
                        className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                    >
                        {product.description}
                    </p>
                </div>
                <div>
                    <h1
                        className="text-[clamp(0.90rem,2vw,1.10rem)] font-nunito tracking-wide font-black text-center mb-[0.80rem]"
                        style={{ fontVariant: "normal" }}
                    >
                        General
                    </h1>
                    <div className="container-flex justify-start px-[2rem]">
                        <p
                            className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                        >
                            <span 
                                className="text-[clamp(0.85rem,2vw,1.05rem)] text-[#D4A373] font-semibold"
                            >
                                Cups Served:
                            </span>
                            <span>
                                {product.orderCount}
                            </span>
                        </p>
                    </div>
                    <div className="container-flex justify-start px-[2rem]">
                        <p
                            className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                        >
                            <span 
                                className="text-[clamp(0.85rem,2vw,1.05rem)] text-[#D4A373] font-semibold"
                            >
                                Type:
                            </span>
                            <span>
                                {product.type}
                            </span>
                        </p>
                    </div>
                    <div className="container-flex justify-start px-[2rem]">
                       <p
                            className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                        >
                            <span 
                                className="text-[clamp(0.85rem,2vw,1.05rem)] text-[#D4A373] font-semibold"
                            >
                                Category:
                            </span>
                            <span>
                                {product.category}
                            </span>
                        </p>
                    </div>
                </div>
                <div>
                    <h1
                        className="text-[clamp(0.90rem,2vw,1.10rem)] font-nunito tracking-wide font-black text-center mb-[0.80rem]"
                        style={{ fontVariant: "normal" }}
                    >
                        Pricing
                    </h1>
                    <div className="container-flex justify-start px-[2rem]">
                        <p
                            className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                        >
                            <span 
                                className="text-[clamp(0.85rem,2vw,1.05rem)] text-[#D4A373] font-semibold"
                            >
                                BasePrice:
                            </span>
                            <span>
                                {product.price}
                            </span>
                        </p>
                    </div>
                    <div className="container-flex justify-between px-[2rem] h-auto ">
                        {product.sizeOptions.map(option => (
                            <div 
                                key={option.size}
                                className="container-flex w-auto h-auto mb-0"
                            >
                                <p
                                    className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                                >
                                    <span 
                                        className="text-[clamp(0.85rem,2vw,1.05rem)] text-[#D4A373] font-semibold"
                                    >
                                        {option.size}:
                                    </span>
                                    <span>
                                        {option.price}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h1
                        className="text-[clamp(0.90rem,2vw,1.10rem)] font-nunito tracking-wide font-black text-center mb-[0.80rem]"
                        style={{ fontVariant: "normal" }}
                    >
                        Extras
                    </h1>
                    <div className="container-flex justify-start px-[2rem] gap-3">
                        <div className="flex">
                            <p
                                className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                            >

                                <span 
                                    className="text-[clamp(0.85rem,2vw,1.05rem)] text-[#D4A373] font-semibold"
                                >
                                    Flavors:
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.flavors.map((flavor, index) => (
                                <p
                                    key={index}
                                    className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                                >
                                    <span>
                                        {flavor}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="container-flex justify-start px-[2rem] gap-1">
                        <div className="flex">
                            <p
                                className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                            >
                                <span
                                    className="text-[clamp(0.85rem,2vw,1.05rem)] text-[#D4A373] font-semibold"
                                >
                                    addOns:
                                </span> 
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.addOns.map((add, index) => (
                                <p
                                    key={index}
                                    className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]"
                                >
                                    <span>
                                        {add}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails