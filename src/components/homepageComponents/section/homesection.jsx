import { useContext, useEffect } from "react";
import { motion } from "framer-motion"
import useSectionInView from "../../../hooks/useSectionInView"
import SectionContext from "../../../context/sectionContext";
const Home = () => {
    const { ref, inView } = useSectionInView(0.6);
    const { setActiveSection } = useContext(SectionContext)

    useEffect(() => {
        if(inView){
            setActiveSection("home")
        }
    },[inView, setActiveSection])

    return(
        <motion.section
            ref={ref}
            id="home"
            initial={{ opacity: 0, y: 0 }}
            animate={inView
                ? { opacity: 1, y: 0 } 
                : {}}
            transition={{ duration: 0.6 }}
            className="relative scroll-mt-20 p-2 bg-[#f9f5f1] border border-[#8c6244] rounded-xl shadow-md gap-3"
        >
            <img src="/icons/bg-coffee-shop.jpg" className="w-screen h-[90vh] object-cover object-left filter blur-[2px]" alt="Coffe Shop"/>
            <p 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.90rem] font-nunito tracking-wide font-black text-white"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
            >
                KAPE?
            </p>
        </motion.section>
    )
}

export default Home