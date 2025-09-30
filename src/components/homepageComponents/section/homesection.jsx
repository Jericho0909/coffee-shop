import { useContext, useEffect } from "react";
import { motion } from "framer-motion"
import useSectionInView from "../../../hooks/useSectionInView"
import SectionContext from "../../../context/sectionContext";
import CoffeeBean from "../../../assets/images/coffee-bean9.png"
import CoffeeCherry from "../../../assets/images/coffee-cherry1.png"
import CoffeePowder from "../../../assets/images/coffee-powder-no-bg.png"
import Coffee from "../../../assets/images/coffee-2_-no-bg.png"
const Home = () => {
    const { ref, inView } = useSectionInView(0.7);
    const { setActiveSection } = useContext(SectionContext)

    useEffect(() => {
        if(inView){
            setActiveSection("home")
        }
    },[inView, setActiveSection])

    const animationForCoffeeBean = {
        container: {
            initial: { x: "-50vw", y: "-100vh", rotate: 0},
            animate: { x: 0, y: 0, rotate: 720 },
            transition: { duration: 2, ease: "easeOut" }
        },
        img: {
            initial: { rotate: 0 },
            animate: { rotate: 50 },
            transition: { delay: 1, duration: 1, ease: "easeOut" }
        }
    }

    const animationForCoffeCherry = {
        container: {
            initial: { scale: 0.5 },
            animate: { scale: 1 },
            transition: { duration: 2, ease: "easeOut" }
        },
        img: {
            initial: { scale: 1 },
            animate: { scale: 1 },
            transition: { delay: 2, duration: 1, ease: "easeOut" }
        }
    }

    const animationForCoffeePowder = {
        container: {
            initial: { rotate: 0 },
            animate: { rotate: -720 },
            transition: { duration: 2, ease: "easeOut" }
        },
        img: {
            initial: { rotate: 0 },
            animate: { rotate: -50},
            transition: { delay: 2, duration: 1, ease: "easeOut" }
        }
    }

    const animationForCoffee = {
        container: {
            initial: { x: "50vw", y: "100vh", opacity: 0},
            animate: { x: 0, y: 0, opacity: 1 },
            transition: { duration: 2, ease: "easeOut" }
        },
        img: {
            initial: { opacity: 1},
            animate: { opacity: 1},
            transition: { delay: 1, duration: 1, ease: "easeOut" }
        }
    }

    const imgAnimationContext = (img, animation, position) => {
        return(
            <motion.div
                className={`container-flex justify-center w-[12rem] h-[12rem] mb-0 absolute ${position}`}
                initial={animation.container.initial}
                animate={inView ? animation.container.animate : animation.container.initial}
                transition={animation.container.transition}
                >
                <motion.img
                    src={img}
                    alt="CoffeeBean"
                    initial={animation.img.initial}
                    animate={animation.img.animate}
                    transition={animation.img.transition}
                />
            </motion.div>
        )
    }

    return(
        <motion.section
            ref={ref}
            id="home"
            initial={{ opacity: 0, y: 0 }}
            animate={inView
                ? { opacity: 1, y: 0 } 
                : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center scroll-mt-20 mb-[4rem] h-[90dvh]"
        >
            <div className="container relative p-2">
                <div className="flex justify-center items-center w-full h-[80dvh]">
                   {imgAnimationContext
                        (
                            CoffeeBean, 
                            animationForCoffeeBean, 
                            "bottom-0 left-[1rem] sm:bottom-[7rem] sm:left-[8rem]"
                        )
                    }
                    {imgAnimationContext
                        (
                            CoffeeCherry, 
                            animationForCoffeCherry, 
                            "top-[3rem] left-[2rem] sm:top-[4rem] sm:left-[6rem]"
                        )
                    }
                    {imgAnimationContext
                        (
                            CoffeePowder, 
                            animationForCoffeePowder, 
                            "top-[5rem] right-[1rem] xl:top-[8rem] xl:right-[10rem]"
                        )
                    }
                    {imgAnimationContext
                        (
                            Coffee, 
                            animationForCoffee, 
                            "bottom-[3rem] right-[0rem] xl:bottom-[6rem] xl:right-[8rem]"
                        )
                    }
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