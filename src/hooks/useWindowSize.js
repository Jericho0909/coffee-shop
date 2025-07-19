import { useWindowSize } from "@uidotdev/usehooks";
const useWindowsize = () => {
    const { width } = useWindowSize();
    const isLargePhone = width >= 390 && width <= 430;

    return {
        isLargePhone
    }

    
}

export default useWindowsize