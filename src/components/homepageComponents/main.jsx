import { motion } from "framer-motion"
import  { useIntersectionObserver } from "@uidotdev/usehooks";
import Home from "./section/homesection";
import About from "./section/aboutsection";
import Contact from "./section/contactsection";
import  Ownerpic from "../../assets/images/owner.jpg" 
const Main = () => {
    const [imgRef, imgentry] = useIntersectionObserver({
        threshold: 0.2,
        root: null,
        rootMargin: "0px",
    });

    const [storyRef, stroyentry] = useIntersectionObserver({
        threshold: 0.2,
        root: null,
        rootMargin: "0px",
    });

    return(
        <main className="bg-white mt-[5.70rem] sm:mt-[6rem] md:mt-[6.50rem] lg:mt-[6rem] xl:mt-[5.50rem] p-1 w-full h-auto">
            <Home/>
            <About/>

            <section className="flex justify-center items-center mb-[3rem]">
                <div className="flex justify-start items-center flex-col h-auto border-none bg-white rounded-none shadow-none w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%]">
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
                    />
                    <motion.div
                        ref={storyRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={stroyentry?.isIntersecting
                            ? { opacity: 1, y: 0 } 
                            : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="storytelling">
                            <h1 className="text-[clamp(1rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-2">
                                Our Story
                            </h1>
                            <p>
                                Kape Shop started from a simple dream — to bring people together through a warm, comforting cup of coffee.
                                Gojo, our founder, began roasting beans in his small kitchen back in 2022, experimenting with flavors
                                inspired by Filipino mornings.
                            </p>
                            <p className="mt-4">
                                What started as a passion project turned into a full-blown neighborhood café. Now, Kape Shop is not just
                                about coffee — it's about community, warmth, and shared moments.
                            </p>
                            <p className="italic mt-4 text-sm">
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