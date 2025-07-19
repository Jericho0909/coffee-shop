import { useMediaQuery } from "@uidotdev/usehooks";
const useMediaquery = () => {
    const isMobile = useMediaQuery("only screen and (max-width: 768px)");
    
    return {
        isMobile
    }
}

export default useMediaquery