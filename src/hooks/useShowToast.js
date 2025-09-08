import { toast } from "react-hot-toast";
const useShowToast = () => {
    const toastMap = {
        success: toast.success,
        error: toast.error,
        default: toast
    }

    const showToast = (type, message, timer) => {
        const fn = toastMap[type] || toastMap.default;
        fn(<div className="Notification">{message}</div>, {
            style: {
            width: "100%",
            backgroundColor: "white",
            color: "#8c6244",
            padding: "12px 16px",
            borderRadius: "8px",
            },
            duration: timer,
        })
    }

    return { showToast }
}

export default useShowToast