import { useContext, useEffect } from "react";
import { motion } from "framer-motion"
import  { useIntersectionObserver } from "@uidotdev/usehooks";
import useSectionInView from "../../../hooks/useSectionInView";
import SectionContext from "../../../context/sectionContext";
const About = () => {
    const { ref, inView } = useSectionInView(1);
    const { setActiveSection } = useContext(SectionContext)

    const [Ref2, entry2] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
    });

    useEffect(() => {
        if(inView){
            setActiveSection("about")
        }
    },[inView, setActiveSection])



    return(
        <motion.section 
            ref={ref}
            id="about"
            initial={{ opacity: 0, y: 50 }}
            animate={inView
                ? { opacity: 1, y: 0 } 
                : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 p-5 bg-[#f9f5f1] border border-[#8c6244] rounded-xl shadow-md gap-3"
        >
            <h1 className="text-[1rem] font-nunito tracking-wide font-black text-center">
                ABOUT
            </h1>
            <div className="font-nunito tracking-wide font-semibold">
                At Kape Shop, we believe every cup tells a story. Started in 2023, our mission is to bring warmth, energy, and meaningful conversations through every brew.
            </div>

            <motion.div
                    ref={Ref2}
                    initial={{ opacity: 0, y: 50 }}
                    animate={entry2?.isIntersecting
                        ? { opacity: 1, y: 0 } 
                        : {}}
                    transition={{ duration: 0.6 }}
                    className="w-full h-auto"
                >  
                    <h1 className="text-[1rem] font-nunito tracking-wide font-black mt-6 mb-2">
                        Why Coffee is Awesome
                    </h1>
                    <ul className="flex-col gap-2">
                        <li className="coffee-benefits-list">
                            Awakens the mind and boosts energy
                        </li>
                        <li className="coffee-benefits-list">
                            Helps improve focus and productivity
                        </li>
                        <li className="coffee-benefits-list">
                            Contains antioxidants that are good for the body
                        </li>
                        <li className="coffee-benefits-list">
                            Enhances mood, especially in the morning
                        </li>
                        <li className="coffee-benefits-list">
                            A moment of break and bonding with friends
                        </li>
                    </ul>
                </motion.div>
                
        </motion.section>
    )
}

export default About