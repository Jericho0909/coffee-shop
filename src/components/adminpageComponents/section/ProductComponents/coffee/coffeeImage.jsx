import { useContext, useRef, useEffect } from "react"
import ImageContext from "../../../../../context/imageContext"

const CoffeeImage = ({formData, setFormData, formType}) => {
    const { preview, loadingimg, handleUpload } = useContext(ImageContext)
    const fileInputRef = useRef(null)

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            image: prev.image || preview 
        }));
    }, [preview, setFormData]);
    
    const handleClick = () => {
        fileInputRef.current.click();
    };
    

    return(
        <div className="flex justify-center items-center flex-col mb-[1rem]">
            <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start p-1">
                image
            </h1>
            <div 
                className="w-[10rem] h-[10rem] border border-black mr-[0.50rem] overflow-hidden"
            >
                <div
                    onClick={handleClick} 
                    className="w-full h-full cursor-pointer"        
                >
                    {loadingimg ? (
                        <p 
                            className="flex justify-center items-center h-full"
                        >
                            Uploading...
                        </p>
                        ) : formData.image ? (
                            <img 
                                src={ preview || formData.image} alt="Preview" 
                                className="w-full h-full object-fill"
                            />
                        ) : (
                        <span
                            className="flex justify-center items-center h-full"
                        >
                            Click to upload
                        </span>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleUpload(e, formType)}
                />  
            </div>
        </div>
        
    )   
}

export default CoffeeImage