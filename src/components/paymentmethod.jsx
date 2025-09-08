import Cash from "../assets/images/cash4.png"
import Gcash from "../assets/images/gcash.jpg"
import Maya from "../assets/images/maya.png"
import DebitCredit from "../assets/images/debitcard.png"
const PaymentMethod = ({ setMethod, isPaymentSelected, setIsPaymentSelected }) => {
    const paymentMethodArr = [
        {
            method: "Cash", 
            image: Cash
        },
        {
            method: "Gcash",
            image: Gcash,
        },
        {
            method: "Maya",
            image: Maya,
        },
        {
            method: "Debit/Credit",
            image: DebitCredit,
        },

    ]
    return(
        <>
            <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                    choice payment method
            </h1>
            <div 
                className={`w-full rounded-xl shadow-lg p-1 py-[1rem] mb-1
                    ${isPaymentSelected 
                        ? "bg-[#fffdf9] border border-[#d3b89f]"
                        : "border border-red-500"
                    }
                `}
            >
                <div className="container-flex justify-between flex-wrap mb-0 p-1">
                    {paymentMethodArr.map((key, index) => (
                        <div 
                            key={index}
                            className="container-flex w-auto h-auto p-1 mb-0"
                        >
                            <input
                                id={key.method}
                                type="radio"
                                name="payment"
                                value={key.method}
                                onChange={(e) => {
                                    setMethod(e.target.value);
                                    setIsPaymentSelected(true)
                                }}
                                className="w-auto"
                            />
                            <label 
                                htmlFor={key.method}
                                className="w-auto"
                            >
                                <div 
                                    className="container-flex mb-0 w-auto h-auto p-1"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-[50%] overflow-hidden">
                                        <img
                                            src={key.image}
                                            alt={key.method}
                                            loading="lazy"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <span>
                                        {key.method}
                                    </span>

                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>     
        </>
    )
}

export default PaymentMethod