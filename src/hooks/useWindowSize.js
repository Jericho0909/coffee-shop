import { useWindowSize } from "@uidotdev/usehooks";
const useWindowsize = () => {
    const { width } = useWindowSize();
    const isLargePhone = width >= 390 && width <= 430;
    const isMobile = width < 1024;

    return {
        isLargePhone,
        isMobile
    }

    
}

export default useWindowsize