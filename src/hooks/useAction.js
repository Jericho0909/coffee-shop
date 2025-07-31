import DbApi from "../api/api";

const useAction =  () => {
    const addAction = async (endpoint, newData) => {
        try {
            const response = await DbApi.post(`/${endpoint}`, newData);
            return response.data;
        } catch (err) {
            console.error("Add failed:", err.message);
            return null;
        }
    };

    const patchAction = async (endpoint, id, updatedData) =>{
        try {
            const response = await DbApi.patch(`/${endpoint}/${id}`, updatedData);
            return response.data;
        } catch (err){
            console.error("change password failed:", err.message);
            return null;
        }
    }

    return {
        addAction,
        patchAction
    }
}

export default useAction

