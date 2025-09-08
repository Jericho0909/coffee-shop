import { useRef, useState } from "react";
const useAddHighlight = () => {
    const containerRefs = useRef([])
     const [ selectedIndex, setSelectedIndex ] = useState(null)

    const saveIndex = (index) => {
        setSelectedIndex(index)
    }

    const highlightUpdated = () => {
        if (selectedIndex !== null) {
            const container = containerRefs.current[selectedIndex];
            if(container){
                
                container.classList.add("highlight")

                setTimeout(() => {
                container.classList.remove("highlight")
                }, 4000)
            }
        }
    }

    return {
        containerRefs,
        saveIndex,
        highlightUpdated
    }
}

export default useAddHighlight