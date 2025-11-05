import { useContext, useState } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext"
import AuthValidationContext from "../../../../../context/authvalidationContext"
import toTitleCase from "../../../../../utils/toTitleCase"
import { EyeClosed } from 'lucide-react';
import { Eye } from 'lucide-react';
const EmployerForm = ({employerData, setEmployerData, adminData, setAdminData, setType}) => {
    const { adminList } = useContext(FirebaseFetchDataContext)
    const {
        showPasswordValidationError,
        isUsernameAvailable,
        isEmailAvailable
    } = useContext(AuthValidationContext)
    const [ activeInput, setActiveInput ] = useState(false)
    const [ showPass, setShowPass ] = useState(false)

    const inputRow = (labelTitle, value, type, key, holder) => {
        return(
            <div className="flex justify-center items-center gap-1 mb-[1rem] px-3 w-full h-auto">
                <label htmlFor={key} className="w-auto">
                    {labelTitle}
                </label>
                <input
                    id={key}
                    type={type}
                    name={key}
                    placeholder={holder}
                    required
                    spellCheck="false"
                    className="w-full"
                    value={value}
                    onChange={(e) => {
                    const formatted = toTitleCase(e.target.value)
                    setEmployerData({ 
                        ...employerData, 
                        [e.target.name]: labelTitle === "Location:" || labelTitle === "Name:" ? formatted : e.target.value 
                    })
                }}
                />
            </div>
        )
    }
    const inputAdminRow = (labelTitle, value, type, key, holder) => {
        return(
            <div className="flex justify-center items-center gap-1 mb-[1rem] px-3 w-full h-auto">
                <label htmlFor={`admin-${key}`} className="w-auto">
                    {labelTitle}
                </label>
                <div className="relative w-full">
                    <input
                        id={`admin-${key}`}
                        type={type}
                        name={key}
                        spellCheck="false"
                        placeholder={holder}
                        required
                        value={value}
                        onChange={(e) =>{
                            setAdminData({ 
                                ...adminData,
                                [e.target.name]: e.target.value,
                                name: employerData.name,
                                email: employerData.email,
                                phone: employerData.phone,
                                location: employerData.location
                            })
                            setType(e.target.value)
                        }}
                        onFocus={() => setActiveInput(true)}
                        onBlur={() => {
                            setActiveInput(false);
                        }}
                        style={(!isUsernameAvailable && key === "username") ? { borderColor: "red" } : {}}
                    />
                    {key === "password" && (
                        <button 
                            className="absolute top-1/2 right-2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer"
                            type="button"
                            onClick={() => setShowPass((prev) => !prev)}
                        >
                            {showPass ? <Eye size={18} /> : <EyeClosed size={18}/>}
                        </button>
                   )}
                </div>
            </div>
        )
    }
    return(
        <>
            {inputRow("Name:", employerData.name, "text", "name" , "ex: Juan Magtinay")}
            {!isEmailAvailable && (
                <p className="text-red-600 text-[0.75rem] w-full mt-1 px-3">
                    Email already exists.
                </p>
            )}
            {inputRow("Email:", employerData.email, "email", "email", "user@gmail.com")}
            {inputRow("Location:", employerData.location, "text", "location", "Bagong Pook Rosario Batangas")}
            <div className="text-center">
                <label htmlFor="phone" className="w-full">
                    Phone Number
                </label>
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    maxLength={11}
                    pattern="[0-9]{11}"
                    placeholder="e.g. 09123456789"
                    value={employerData.phone}
                    onChange={(e) =>{
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "")
                        setEmployerData({ ...employerData, [e.target.name]: onlyNums})
                    }}
                />
            </div>
            <div className="flex justify-between items-center mb-[1rem] px-3 w-full h-auto">
                <div className="text-center">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        required
                        name="gender"
                        className="py-3 px-2"
                        value={employerData.gender}
                        onChange={(e) =>
                        setEmployerData({ ...employerData, [e.target.name]: e.target.value })
                        }
                    >
                        <option value="">Select gender</option>
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>

                <div className="text-center">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        required
                        name="status"
                        className="py-3 px-2"
                        value={employerData.status}
                        onChange={(e) =>
                        setEmployerData({ ...employerData, [e.target.name]: e.target.value })
                        }
                    >
                        <option value="Active">Active</option>
                        <option value="Deactive">DeActive</option>
                    </select>
                </div>

                <div className="text-center">
                    <label htmlFor="role" className="w-auto">
                        Role
                    </label>
                    <select
                        id="role"
                        required
                        name="role"
                        className="py-3 px-2"
                        value={employerData.role}
                        onChange={(e) =>
                        setEmployerData({ ...employerData, [e.target.name]: e.target.value })
                    }
                >
                        <option value="">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="Cashier">Cashier</option>
                        <option value="Barista">Barista</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
            </div>
            {(employerData.role === "Admin" && !adminList.some(key => key.id === adminData.id)) && (
                <>
                    {activeInput &&
                        (
                        <p className={`text-[0.75rem] w-full mt-1 px-3 ${!isUsernameAvailable ? "text-red-600" : " italic text-[#8c6244]"}
                        `}>
                            {(!isUsernameAvailable)
                                ? "Username already exists."
                                : "Reminder: Username must end with .admin!"
                            }
                        </p>
                    )}
                    {inputAdminRow("Username:", adminData?.username, "text", "username", "example.admin")}
                    {showPasswordValidationError && (
                        <p className="text-red-600 text-[0.75rem] w-full mt-1 px-3">
                            Password must be at least 8 characters and include an uppercase
                            letter, a number, and a special character.
                        </p>
                    )}
                    {inputAdminRow("Password:", adminData?.password, showPass ? "text" : "password", "password", "********")}
                </>
            )}
        </>
    )
}

export default EmployerForm