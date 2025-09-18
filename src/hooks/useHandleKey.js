import { useState } from "react"
const useHandleKey = () => {
    const [ highlightedIndex, setHighlightedIndex ] = useState(-1)

    const handleKeyDown = (e, data) => {
        if(data.length === 0) return;

        if(e.key === "ArrowDown"){
            e.preventDefault()
            setHighlightedIndex((prev) =>
                prev < data.length - 1 ? prev + 1 : 0
            )
        }else if (e.key === "ArrowUp"){
            e.preventDefault()
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : data.length - 1
            )
        }
    }
    
    return {
        highlightedIndex,
        setHighlightedIndex,
        handleKeyDown
    }

}

export default useHandleKey