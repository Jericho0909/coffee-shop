const authValidation = () => {
    const isUsernameExists = (username, data) => {
        const checker = data.some(key => key.username === username)
        if(checker){
            return true
        }
        return false
    }

    const isPasswordValid = (password) => {
        const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

        if(pattern.test(password)){
            return true
        }
        return false
    }

    const isEmailExits = (email, list) => {
        const checker = list.some(key => key.email === email)
        if(checker){
            return true
        }
        return false
    }

    return{
        isUsernameExists,
        isPasswordValid,
        isEmailExits
    }
}

export default authValidation