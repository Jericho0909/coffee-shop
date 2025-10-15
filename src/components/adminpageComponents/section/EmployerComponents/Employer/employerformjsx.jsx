import { useContext, useState } from "react"
import AuthValidationContext from "../../../../../context/authvalidationContext"
import toTitleCase from "../../../../../utils/toTitleCase"
const EmployerForm = ({employerData, setEmployerData, adminData, setAdminData, setType}) => {
    const {
        showPasswordValidationError,
        isUsernameAvailable,
    } = useContext(AuthValidationContext)
    const [ activeInput, setActiveInput ] = useState(false)
    const inputRow = (labelTitle, value, type, key) => {
        return(
            <div className="flex justify-center items-center gap-1 mb-[1rem] px-3 w-full h-auto">
                <label htmlFor={key} className="w-auto">
                    {labelTitle}
                </label>
                <input
                id={key}
                type={type}
                name={key}
                required
                spellCheck="false"
                className="w-full"
                value={value}
                onChange={(e) => {
                    const formatted = toTitleCase(value)
                    setEmployerData({ ...employerData, [e.target.name]: type === "type" ? formatted : e.target.value });
                    setAdminData({ ...adminData, [e.target.name]: type === "type" ? formatted : e.target.value })
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
                <input
                    id={`admin-${key}`}
                    type={type}
                    name={key}
                    spellCheck="false"
                    placeholder={holder}
                    required
                    value={value}
                    onChange={(e) =>{
                        setAdminData({ ...adminData, [e.target.name]: e.target.value });
                        setType(e.target.value)
                    }}
                    onFocus={() => setActiveInput(true)}
                    onBlur={() => {
                        setActiveInput(false);
                    }}
                    style={(!isUsernameAvailable && key === "username") ? { borderColor: "red" } : {}}
                />
            </div>
        )
    }
    return(
        <>
            {inputRow("Name:", employerData.name, "text", "name")}
            {inputRow("Email:", employerData.email, "email", "email")}
            {inputRow("Location:", employerData.location, "text", "location")}
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
                    onChange={(e) =>
                    setEmployerData({ ...employerData, [e.target.name]: e.target.value })
                    }
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
            {employerData.role === "Admin" && (
                <>
                    {(activeInput) &&
                        (
                        <p className={`text-[0.75rem] w-full mt-1 px-3 ${!isUsernameAvailable ?         "text-red-600" : " italic text-[#8c6244]"}
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
                    {inputAdminRow("Password:", adminData?.password, "password", "password", "")}
                </>
            )}
        </>
    )
}

export default EmployerForm