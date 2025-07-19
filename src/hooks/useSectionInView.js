import { useIntersectionObserver } from "@uidotdev/usehooks";

const useSectionInView = (threshold = 0.5) => {
  const [ref, entry] = useIntersectionObserver({
    threshold,
    root: null,
    rootMargin: "0px",
  });

  const inView = entry?.isIntersecting || false;

  return { ref, inView };
};

export default useSectionInView