import { useContext, useState } from "react"
import FirebaseActionContext from "../../context/firebaseactionContext";
import ModalContext from "../../context/modalContext"
import toTitleCase from "../../utils/toTitleCase";
import removeFireBaseKey from "../../utils/removeFirebaseKey";
import showToast from "../../utils/showToast";
const ContactForm = ({customer}) => {
    const { updateAction } = useContext(FirebaseActionContext)
    const { setIsOpen } = useContext(ModalContext)
    const [ phone, setPhone ] = useState("")
    const [ location, setLocation ] = useState("")
    const { Toast } = showToast()

    const safeData = removeFireBaseKey(customer)
    const handleSubmit = async(e) => {
        e.preventDefault();
        const updatedCustomerContact = {
            ...safeData,
            phone: phone,
            location: location
        }
        await updateAction("customers", customer.firebaseKey, updatedCustomerContact)
        Toast("success", "Success! You can now place an order.", 3000)

        setTimeout(() => {
            setIsOpen(false)
        }, 200)

    }

    return(
        <>
            <h1 
                className="text-[clamp(2rem,2vw,2.50rem)] font-nunito tracking-wide font-black text-center"
            >
                complete the information
            </h1>
            <form 
                className="flex justify-center items-center flex-col w-[90%] mb-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <label htmlFor="phone">
                    Enter your phone number:
                </label>
                <input
                    id="phone"
                    type="tel"
                    maxLength={11}
                    pattern="[0-9]{11}"
                    placeholder="e.g. 09123456789"
                    value={phone}
                    required
                    onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "")
                        setPhone(onlyNums)
                    }}
                />
                <label htmlFor="location">
                    Enter your location:
                </label>
                <input
                    id="location"
                    type="location"
                    name="location"
                    placeholder="Enter your location:"
                    required
                    value={location}
                    onChange={(e) => {
                        const formatted = toTitleCase(e.target.value)
                        setLocation(formatted)
                    }}
                />
                <button
                    type="submit"
                    className="bg-[#8c6244] text-white px-6 py-2 rounded-md mt-3 hover:bg-[#734d35] transition-all duration-300"
                >
                    Confrim
                </button>
            </form>
        </>
    )
}

export default ContactForm