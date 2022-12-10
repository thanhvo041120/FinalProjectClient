import rootInstance from "utils/axios.config";

export const sendBorrowSuccessMail = async (data) => {
    try {
        const URL = `/mail/sendToUser`
        const response = await rootInstance.post(URL, data);
        console.log("🚀 ~ file: mail.api.js:7 ~ sendBorrowSuccessMail ~ response", response)
        return response;
    } catch (error) {
        return error
    }
}
