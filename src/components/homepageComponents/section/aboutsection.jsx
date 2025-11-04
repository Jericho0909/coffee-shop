import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion"
import useSectionInView from "../../../hooks/useSectionInView";
import SectionContext from "../../../context/sectionContext"
import MediaQueryContext from "../../../context/mediaqueryContext";
const About = () => {
    const { isMobile } = useContext(MediaQueryContext)
    const { ref, entry } = useSectionInView(isMobile ? 0.5 : 0.7);
    const { setActiveSection } = useContext(SectionContext)
    const [ hasAnimated, setHasAnimated ] = useState(false)

    useEffect(() => {
        if(entry?.isIntersecting){
            setActiveSection("about")
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
            id="about"
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated
                ? { opacity: 1, y: 0 } 
                : {}}
            transition={{
                duration: 0.6,
                delay: 0.2,
                ease: "easeInOut",
            }}
            className="flex justify-center items-center mb-[2rem] p-[1rem] "
        >   
            <div className="container grid grid-cols-1 lg:grid-cols-2 w-full p-[1rem] sm:p-[2rem] lg:p-[4rem]">
                <div className="flex justify-center items-center flex-col">
                     <h1 className="text-[clamp(1rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center">
                        ABOUT
                    </h1>
                    <p className="text-[clamp(0.78rem,2vw,1.10rem)] font-nunito tracking-wide font-semibold m-1 w-full"> 
                        At Kape Shop, we believe every cup tells a story. Started in 2023, our mission is to bring warmth, energy, and meaningful conversations through every brew. We are passionate about creating a cozy and welcoming environment where every customer feels at home — whether you're catching up with friends, diving into work, or simply enjoying a moment of peace with your favorite drink. Each blend we serve is carefully crafted, using only high-quality beans and ingredients, ensuring that every sip delivers comfort, richness, and satisfaction. More than just coffee, we offer an experience — one that inspires connection, creativity, and community.
                    </p>
                </div>
                <div
                    className="flex justify-start items-center flex-col w-full h-auto"
                >  
                    <h1 className="text-[clamp(1rem,2vw,1.50rem)] font-nunito tracking-wide font-black mt-6 lg:mt-0 mb-2 lg:mb-0">
                        why coffee is awesome
                    </h1>
                    <ul className="flex-col gap-2 lg:flex lg:justify-center lg:items-center w-full h-full">
                        <li className="coffee-benefits-list lg:justify-center">
                            awakens the mind and boosts energy
                        </li>
                        <li className="coffee-benefits-list lg:justify-center">
                            helps improve focus and productivity
                        </li>
                        <li className="coffee-benefits-list lg:justify-center">
                            contains antioxidants that are good for the body
                        </li>
                        <li className="coffee-benefits-list lg:justify-center">
                            enhances mood, especially in the morning
                        </li>
                        <li className="coffee-benefits-list lg:justify-center">
                            a moment of break and bonding with friends
                        </li>
                    </ul>
                </div>
            </div>
        </motion.section>
    )
}

export default About