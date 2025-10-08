// utils/firebaseNormalizer.js
const  normalizeData = (obj) => {
    if (obj === undefined) return null;

    if (Array.isArray(obj)) {
        return obj;
    }

    if (obj !== null && typeof obj === "object") {
        const newObj = {};
        for (const key in obj) {
            const value = obj[key];
            if (value === undefined) {
                console.log("1")
                newObj[key] = null; 
            } 
            else {
                console.log("2")
                newObj[key] = normalizeData(value);
            }
        }
        return newObj;
    }

    return obj;
}

export default normalizeData