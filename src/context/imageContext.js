import { createContext } from "react";
import useImage from "../hooks/useImage";

const ImageContext = createContext()

export const ImageProvider = ({children}) => {
    const { preview, loadingimg, handleUpload } = useImage()

    return(
        <ImageContext.Provider
            value={{
                preview, 
                loadingimg, 
                handleUpload 
            }}
        >
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContext