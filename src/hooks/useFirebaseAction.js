import { ref, push, update, remove } from "firebase/database";
import { database } from "../firebase";

const useFirebaseAction = () => {
    const pushAction = async (endpoint, newData) => {
        try {
            const dbRef = ref(database, endpoint)
            const newRef = push(dbRef, newData)
            return { id: newRef.key, ...newData }
        } catch (err) {
            console.error("Add failed:", err.message)
            return null
        }
    }

    const updateAction = async (endpoint, id, updatedData) => {
        try {
            const dbRef = ref(database, `${endpoint}/${id}`);
            await update(dbRef, updatedData)
            return { id, ...updatedData }
        } catch (err) {
        console.error("Update failed:", err.message);
        return null;
        }
    }

    const removeAction = async (endpoint, id) => {
        try {
            const dbRef = ref(database, `${endpoint}/${id}`);
            await remove(dbRef)
            return id
        } catch (err) {
        console.error("Delete failed:", err.message);
        return null;
        }
    }

    return {
        pushAction,
        updateAction,
        removeAction
    }
}

export default useFirebaseAction;
