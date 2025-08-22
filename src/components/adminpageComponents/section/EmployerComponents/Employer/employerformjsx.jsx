import { useContext } from "react"
import AuthValidationContext from "../../../../../context/authvalidationContext"
const EmployerForm = ({employerData, setEmployerData, adminData, setAdminData}) => {
    const {
            showPasswordValidationError,
            isUsernameAvailable,
            endsWithAdmin
    } = useContext(AuthValidationContext)
    return(
        <>
            <div className="flex justify-center items-center gap-1 mb-[1rem] px-3 w-full h-auto">
                <label htmlFor="employerName" className="w-auto">
                    Name:
                </label>
                <input
                id="employerName"
                type="text"
                name="name"
                required
                spellCheck="false"
                className="w-full"
                value={employerData.name}
                onChange={(e) => {
                    setEmployerData({ ...employerData, [e.target.name]: e.target.value });
                    setAdminData({ ...adminData, [e.target.name]: e.target.value })
                }}
                />
            </div>
            <div className="flex justify-center items-center gap-1 mb-[1rem] px-3 w-full h-auto">
                <label htmlFor="emailEmployer" className="w-auto">
                Email:
                </label>
                <input
                id="emailEmployer"
                type="email"
                name="email"
                required
                spellCheck="false"
                className="w-full"
                value={employerData.email}
                onChange={(e) =>
                    setEmployerData({ ...employerData, [e.target.name]: e.target.value })
                }
                />
            </div>
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
                    {(!endsWithAdmin || !isUsernameAvailable
                    ) && (
                        <p className="text-red-600 text-[0.75rem] w-full mt-1 px-3">
                            {!isUsernameAvailable
                                ? "Username already exists."
                                : "Username must end with .admin"
                            }
                        </p>
                    )}


                    <div className="flex justify-center items-center gap-1 mb-[1rem] px-3 w-full h-auto">
                        <label htmlFor="usernameAdmin" className="w-auto">
                            Username:
                        </label>
                        <input
                            id="usernameAdmin"
                            type="text"
                            name="username"
                            spellCheck="false"
                            placeholder="example.admin"
                            required
                            value={adminData?.username || ""}
                            onChange={(e) =>
                                setAdminData({ ...adminData, [e.target.name]: e.target.value })
                            }
                            style={!isUsernameAvailable ? { borderColor: "red" } : {}}
                        />
                    </div>

                    {showPasswordValidationError && (
                        <p className="text-red-600 text-[0.75rem] w-full mt-1 px-3">
                            Password must be at least 8 characters and include an uppercase
                            letter, a number, and a special character.
                        </p>
                    )}

                    <div className="flex justify-center items-center gap-1 mb-[1rem] px-3 w-full h-auto">
                        <label htmlFor="passwordAdmin" className="w-auto">
                            Password:
                        </label>
                        <input
                            id="passwordAdmin"
                            type="password"
                            name="password"
                            required
                            value={adminData?.password || ""}
                            onChange={(e) =>
                                setAdminData({ ...adminData, [e.target.name]: e.target.value })
                            }
                            style={showPasswordValidationError ? { borderColor: "red" } : {}}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default EmployerForm