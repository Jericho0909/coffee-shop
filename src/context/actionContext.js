import { createContext } from "react";
import useAction from "../hooks/useAction";

const ActionContext = createContext()

export const ActionProvider = ({children}) => {
    const { addAction, patchAction, deleteAction } = useAction()
    return (
        <ActionContext.Provider
            value={{
                addAction,
                patchAction,
                deleteAction
            }}
        >
            {children}
        </ActionContext.Provider>
    )
}

export default ActionContext