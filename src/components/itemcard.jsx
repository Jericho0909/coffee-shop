import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import ModalContext from "../context/modalContext";
import FirebaseFetchDataContext from "../context/firebasefetchdataContext";
import FirebaseActionContext from "../context/firebaseactionContext";
import ImageContext from "../context/imageContext";
import AddHighlightContext from "../context/addhighlightContext";
import { motion } from "framer-motion";
import { SunSnow } from 'lucide-react';
import { Coffee } from 'lucide-react';
import { Snowflake } from 'lucide-react';
import { PhilippinePeso } from 'lucide-react';
import NoImg from '../../src/assets/images/no-img.jpeg'
import showToast from "../utils/showToast";

const ItemCard = ({ item }) => {
    const { username } = useParams()
    const { toggleModal, setModalName } = useContext(ModalContext)
    const { removeAction } = useContext(FirebaseActionContext)
    const { productList } = useContext(FirebaseFetchDataContext)
    const { setPreview  } = useContext(ImageContext)
    const { saveIndex } = useContext(AddHighlightContext)
    const { Toast } = showToast()
    const [ref, entry] = useIntersectionObserver({
        threshold: 0.1,
        root: null,
        rootMargin: "0px",
    });

    const isVisible = entry?.isIntersecting;

    const Type = (type) => {
        if(type === "Hot/Iced"){
            return (
                <div>
                    <SunSnow
                        size={20}
                        stroke="url(#halfGradient)"
                    />
                    <svg width="0" height="0">
                        <defs>
                        <linearGradient id="halfGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="50%" stopColor="red" />
                            <stop offset="50%" stopColor="blue" />
                        </linearGradient>
                        </defs>
                    </svg>
                </div>
            );
        }
        else if (type === "Hot"){
            return (
                <Coffee size={20} color="red"/>
            );
        }
        else{
            return (
                <Snowflake size={20} color="blue"/>
            );
        }
    }

    const openModal = (user) => {
        if(user.endsWith(".admin")){
            setModalName("detailProduct")
            toggleModal()
        }
        else{
            setModalName("placeorder")
            toggleModal()
        }
    }

    const openModalUpdate = () => {
        setPreview(null)
        sessionStorage.clear()
        setModalName("updateProduct")
        toggleModal()
        saveIndex()
    }

    const savedId = (id) => {
        sessionStorage.setItem("productId", id)
        saveIndex(id)
    }

    const deleteProduct = async (e, item) => {
        e.preventDefault()
        const updatedProductList = productList.filter(key => key.id !== item.id)

        await removeAction("products", item.firebaseKey, updatedProductList)

        Toast("success", "Successfully deleted the product.", 2000)

    }

    const ViewButton = (user, item) => {
        if(user.endsWith(".admin")){
            return (
                <div 
                    className="flex justify-between items-center py-1 px-1 w-full h-auto gap-3"
                >
                    <button
                        className="bg-[#88A550] text-white px-4 py-2 rounded shadow-md w-[35%] sm:w-[45%] h-auto
                        transition-transform duration-300 ease-in-out
                        hover:bg-[#7a9549] hover:scale-105 hover:shadow-[0_4px_12px_rgba(136,165,80,0.4)]
                        active:translate-y-1 active:shadow-none"
                        style={{ fontVariant: "small-caps" }}
                        onClick={() => {
                            openModalUpdate();
                            savedId(item.id)
                        }}
                    >
                        update
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded shadow-md w-[35%] sm:w-[45%] h-auto
                        transition-transform duration-300 ease-in-out
                        hover:bg-red-600 hover:scale-105 hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)]
                        active:translate-y-1 active:shadow-none"
                        style={{ fontVariant: "small-caps" }}
                        onClick={(e) => deleteProduct(e, item)}
                    >
                        delete
                    </button>
                </div>
            )
        }
    }

  return (
    <>
        <div
            ref={ref}
            className="w-full h-[34rem] md:h-[20rem] border border-[#8c6244] rounded-md overflow-hidden mb-2 relative cursor-pointer"
            onClick={() => {
                openModal(username);
                savedId(item.id)
            }}
        >
            {isVisible && (
                <>
                    <motion.img
                    src={item.image !== "__empty__"
                        ? item.image
                        : NoImg
                    }
                    alt={item.name}
                    className={`
                        w-full h-full object-cover
                        ${item.available 
                            ? "bg-transparent"
                            : "blur-[2px]"
                        }
                    `}
                    initial={{ opacity: 0 }}
                    animate={isVisible
                                ? { opacity: 1 } 
                                : { opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    />
                    <div className="absolute top-0 left-0 bg-white w-auto h-auto p-3">
                        {Type(item.type)}
                    </div>
                    <div 
                        className={`
                            flex justify-center items-center absolute top-0 w-full h-full`}
                        style={{ fontVariant: "small-caps" }}
                    >
                        <div className="w-auto h-auto p-[0.50rem]">
                            {item.available 
                            ? ""
                            : "not available"
                        }
                        </div>
                    </div>
                </>
            )}
        </div>
        <div className="flex justify-between items-center w-full h-auto py-1 px-1 mb-[0.80%] text-black gap-1">
            <div className="flex justify-start items-center gap-2 w-auto">
                <span 
                    className="truncate overflow-hidden whitespace-nowrap w-[18rem] sm:w-[8rem] md:w-[9rem] lg:w-[9.50rem] xl:w-[14rem]"
                >
                    {item.name}
                </span>
            </div>
            <div className="flex justify-end items-center gap-1 w-auto">
                <PhilippinePeso size={20} color="black"/>
                <span>{item.price}</span>
            </div>
        </div>
        {ViewButton(username, item)}
    </>
    
  );
};

export default ItemCard;
