import { createContext } from "react";
import useFirebaseAction from "../hooks/useFirebaseAction";

const FirebaseActionContext = createContext()

export const FirebaseActionProvider = ({children}) => {
    const { pushAction, updateAction, removeAction } = useFirebaseAction()

    return(
        <FirebaseActionContext.Provider
            value={{
                pushAction,
                updateAction,
                removeAction
            }}
        >
            {children}
        </FirebaseActionContext.Provider>
    )
}

export default FirebaseActionContext