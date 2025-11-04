import { useIntersectionObserver } from "@uidotdev/usehooks";

const useSectionInView = (threshold = 0.5) => {
    const [ref, entry] = useIntersectionObserver({
        threshold,
        root: null,
        rootMargin: "0px",
    })


    return { ref, entry };
}

export default useSectionInView