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
        else{
            return false
        }

    }

    return{
        isUsernameExists,
        isPasswordValid
    }
}

export default authValidation