import { createContext } from "react";
import useAction from "../hooks/useAction";

const ActionContext = createContext()

export const ActionProvider = ({children}) => {
    const { addAction, patchAction } = useAction()
    return (
        <ActionContext.Provider
            value={{
                addAction,
                patchAction
            }}
        >
            {children}
        </ActionContext.Provider>
    )
}

export default ActionContext