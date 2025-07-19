import { motion } from "framer-motion"
import  { useIntersectionObserver } from "@uidotdev/usehooks";
import Home from "./section/homesection";
import About from "./section/aboutsection";
import Contact from "./section/contactsection";
const Main = () => {
    const [Ref, entry] = useIntersectionObserver({
        threshold: 0,
        root: null,
        rootMargin: "0px",
    });

    const [imgRef, imgentry] = useIntersectionObserver({
        threshold: 0,
        root: null,
        rootMargin: "0px",
    });

    const [storyRef, stroyentry] = useIntersectionObserver({
        threshold: 0,
        root: null,
        rootMargin: "0px",
    });

    return(
        <main className="bg-white pt-[4.60rem] p-1 w-full h-auto sm:pt-[6rem]">
            <Home/>

            <div className="flex justify-center items-center p-3 mb-3">
                <motion.img
                    ref={Ref}
                    src="icons/coffee-connecting-people.jpg"
                    alt="Coffee"
                    initial={{ opacity: 0, y: 50 }}
                    animate={entry?.isIntersecting
                        ? { opacity: 1, y: 0 } 
                        : {}}
                    transition={{ duration: 0.6 }}
                    className="w-[95%] h-auto mb-[1rem] rounded-[8px]"
                />
            </div>

            <About/>

            <section className="flex justify-start items-center flex-col w-full h-auto p-3 mb-3">
                <h2 className="text-[1rem] font-nunito tracking-wide font-black text-center mb-2">
                    Our Story
                </h2>
                <motion.img
                    ref={imgRef}
                    src="icons/owner.jpg"
                    alt="Owner: Gojo"
                    initial={{ opacity: 0, y: 50 }}
                    animate={imgentry?.isIntersecting
                        ? { opacity: 1, y: 0 } 
                        : {}}
                    transition={{ duration: 0.6 }}
                    className="w-[95%] h-auto mb-[1rem] rounded-[8px]"
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
            </section>

            <Contact/>
        </main>
    )
}

export default Main