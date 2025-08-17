import { useState } from "react";
import axios from "axios";
const useImage = () => {
    const [ preview, setPreview ] = useState(null);
    const [ loadingimg, setLoadingImg ] = useState(false)
    
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if(!file) return

        setLoadingImg(true)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "coffeeImage");

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/daxhmcpkq/image/upload', formData);

            if (response.data.secure_url) {
                const imageUrl = response.data.secure_url;
                sessionStorage.setItem("image", JSON.stringify(imageUrl));
                setPreview(imageUrl);
            }
        } catch (err) {
            console.error('Error uploading image:', err);
        } finally {
            setLoadingImg(false); 
        }
    };

    return { 
        preview,
        setPreview, 
        loadingimg, 
        handleUpload 
    };
}

export default useImage