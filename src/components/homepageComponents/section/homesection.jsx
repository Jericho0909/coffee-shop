import { useContext, useEffect } from "react";
import { motion } from "framer-motion"
import useSectionInView from "../../../hooks/useSectionInView"
import SectionContext from "../../../context/sectionContext";
import HomepageBG from "../../../assets/images/bg-coffee-shop.jpg"
const Home = () => {
    const { ref, inView } = useSectionInView(0.7);
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
            className="flex justify-center items-center scroll-mt-20 mb-[4rem]"
        >
            <div className="container relative p-2">
                <div className="flex justify-center items-center w-full h-auto">
                    <img 
                        src={HomepageBG} 
                        className=" w-[90vw] h-[82vh] sm:h-[86vh] md:h-[84vh] lg:h-[88vh] xl:h-[80vh] object-cover object-left filter blur-[2px] rounded-[10px] m-1 p-1" 
                        alt="Coffe Shop"
                    />
                </div>
                <p 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.90rem] font-nunito tracking-wide font-black text-white"
                    style={{ 
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                        fontVariant: "small-caps"
                    }}
                >
                    KAPE?
                </p>
            </div>
        </motion.section>
    )
}

export default Home