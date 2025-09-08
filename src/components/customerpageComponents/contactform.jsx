import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import FetchDataContext from "../../context/fetchdataContext"
import ActionContext from "../../context/actionContext"
import ModalContext from "../../context/modalContext"
import { toast } from "react-hot-toast";
const ContactForm = ({customer}) => {
    const { id } = useParams()
    const { setCustomerList } = useContext(FetchDataContext)
    const { patchAction } = useContext(ActionContext)
    const { setIsOpen } = useContext(ModalContext)
    const [ phone, setPhone ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ location, setLocation ] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault();
        const updatedCustomerContact = {
            ...customer,
            phone: phone,
            email: email,
            location: location
        }
        const response = await patchAction("customers", id, updatedCustomerContact)

        setCustomerList(prev => (
            prev.map(customer => customer.id === id ? response : customer )
        ))

        toast.success(
            <div className="Notification">
                Success! You can now place an order.
            </div>,
            {
                style: {
                width: "100%",
                backgroundColor: "white",
                color: "#8c6244",
                padding: "12px 16px",
                borderRadius: "8px",
                },
                duration: 3000,
            }
        )

        setTimeout(() => {
            setIsOpen(false)
        }, 200)

    }

    return(
        <>
            <h1 
                className="text-[clamp(2rem,2vw,2.50rem)] font-nunito tracking-wide font-black text-center"
            >
                contact
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
                        setPhone(onlyNums);
                    }}
                />
                <div>

                </div>
                <label htmlFor="email">
                    Enter your email:
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email:"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setLocation(e.target.value)}
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