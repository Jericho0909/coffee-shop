import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion"
import useSectionInView from "../../../hooks/useSectionInView"
import SectionContext from "../../../context/sectionContext";
import CoffeeShop from "../../../assets/images/bg-coffee-shop.jpg"
const Home = () => {
    const { ref, entry } = useSectionInView(0.7)
    const { setActiveSection } = useContext(SectionContext)
    const [ hasAnimated, setHasAnimated ] = useState(false)

    useEffect(() => {
        if(entry?.isIntersecting){
            setActiveSection("home")
        }
    },[entry, setActiveSection])

    useEffect(() => {
        if(entry?.isIntersecting){
            setHasAnimated(true)
        }
    }, [entry])

    return(
        <motion.section
            ref={ref}
            id="home"
            initial={{ opacity: 0, y: 0 }}
            animate={hasAnimated
                ? { opacity: 1, y: 0 } 
                : {}}
            transition={{
                duration: 0.6,
                delay: 0.2,
                ease: "easeInOut",
            }}
            className="flex justify-center items-center scroll-mt-20 mb-[2rem] h-[90dvh]"
        >
            <div className="container relative p-2 w-screen h-[80vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-[3px] scale-110"
                    style={{ backgroundImage: `url(${CoffeeShop})` }}
                >

                </div>
                <span 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.90rem] font-nunito tracking-wide font-black text-[#8c6244]"
                    style={{ 
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                    fontVariant: "small-caps"
                    }}
                >
                    KAPE?
                </span>
            </div>
        </motion.section>
    )
}

export default Home