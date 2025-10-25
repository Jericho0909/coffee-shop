import emailjs from "@emailjs/browser";

export const sendVerificationCode = async (userEmail, userName, code) => {
    try {
        await emailjs.send(
            "service_2hzvriq", // Service ID
            "template_f9sxdnh", // Template ID
            {
                user_name: userName,
                user_email: userEmail,
                code: code,
            },
            "b9hTKBN3fLX9sV6_Y" // Public Key
        )


        return true
    } catch (error) {
        console.error("Failed to send email:", error);
        return false
    }
}
