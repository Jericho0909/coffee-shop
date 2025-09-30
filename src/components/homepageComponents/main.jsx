import { useContext } from "react";
import { motion } from "framer-motion"
import SectionContext from "../../context/sectionContext";
import  { useIntersectionObserver } from "@uidotdev/usehooks";
import Home from "./section/homesection";
import About from "./section/aboutsection";
import Contact from "./section/contactsection";
import  Ownerpic from "../../assets/images/owner.jpg" 
const Main = () => {
    const { activeSection } = useContext(SectionContext)
    const [imgRef, imgentry] = useIntersectionObserver({
        threshold: 0.2,
        root: null,
        rootMargin: "0px",
    })
    const [storyRef, stroyentry] = useIntersectionObserver({
        threshold: 0.2,
        root: null,
        rootMargin: "0px",
    })

    return(
        <main 
           className={`mt-[5.30rem] sm:mt-[6rem] md:mt-[5.20rem] lg:mt-[6rem] xl:mt-[5.20rem] p-1 w-full h-auto transition-colors duration-500 ease-in-out
            ${activeSection === "home" 
                ? "bg-white" 
                : "bg-[#8c6244]"}
            `}
        >
            <Home/>
            <About/>

            <section className="flex justify-center items-center mb-[5rem]">
                <div className="flex justify-start items-center flex-col h-auto w-full p-2">
                    <motion.img
                        ref={imgRef}
                        src={Ownerpic}
                        alt="Owner: Gojo"
                        initial={{ opacity: 0, y: 50 }}
                        animate={imgentry?.isIntersecting
                            ? { opacity: 1, y: 0 } 
                            : {}}
                        transition={{ duration: 0.6 }}
                        className="w-[95%] sm:w-[85%] md:w-[85%] lg:w-[45%] xl:w-[45%] h-auto mb-[1rem] rounded-[8px]"
                        loading="lazy"
                    />
                    <motion.div
                        ref={storyRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={stroyentry?.isIntersecting
                            ? { opacity: 1, y: 0 } 
                            : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <div 
                            className="flex justify-center items-center flex-col m-1 p-[1rem] sm:p-[2rem] lg:p-[4rem] w-full"
                        >
                            <h1 className="text-[clamp(1rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-2">
                                our story
                            </h1>
                            <p className="font-nunito tracking-wide text-[clamp(0.78rem,2vw,1.10rem)] text-start font-semibold">
                                Kape Shop started from a simple dream — to bring people together through a warm, comforting cup of coffee.
                                Gojo, our founder, began roasting beans in his small kitchen back in 2022, experimenting with flavors
                                inspired by Filipino mornings.
                            </p>
                            <p className="font-nunito tracking-wide text-[clamp(0.78rem,2vw,1.10rem)] text-start font-semibold mt-4">
                                What started as a passion project turned into a full-blown neighborhood café. Now, Kape Shop is not just
                                about coffee — it's about community, warmth, and shared moments.
                            </p>
                            <p className="font-nunito tracking-wide text-[clamp(0.78rem,2vw,1.10rem)] text-start font-semibold italic mt-4 text-sm">
                                "Every brew tells a story — and we hope you become part of it."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Contact/>
        </main>
    )
}

export default Main