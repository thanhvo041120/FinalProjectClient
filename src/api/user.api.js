import rootInstance from "utils/axios.config";
import axios from "axios";

export const registerAccount = async (data) => {
  try {
    const URL = process.env.REACT_APP_BASEAPIURL + "/auth/register";
    const response = await axios.post(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const loginAccount = async (data) => {
  try {
    const URL = process.env.REACT_APP_BASEAPIURL + "/auth/login";
    const response = await axios.post(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const logoutAccout = async () => {
  try {
    const URL = process.env.REACT_APP_BASEAPIURL + "/auth/logout";
    await axios.post(
      URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
      }
    );
  } catch (error) {
    return error.response;
  }
};
export const getUserProfile = async (accountId) => {
  try {
    const URL = `/users/profile/${accountId}`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const updateUserProfile = async (data, accountId, userId) => {
  try {
    const URL =`/users/update/${accountId}/${userId}`;
    const response = await rootInstance.patch(URL, data);
    return response;
  } catch (error) {
    console.log("🚀 ~ file: user.api.js:54 ~ updateUserProfile ~ error", error)
    return error.response;
  }
};

export const getUserByWallet = async (walletAddress)=> {
  try {
    const URL = `/users/getUserByWallet/${walletAddress}`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export const changePassword = async (data, accountId) => {
  try {
    const URL = `/auth/changePassword/${accountId}`;
    const response = await rootInstance.post(URL, data);
    return response.response;
  } catch (error) {
    return error;
  }
}

export const resetPassword = async (data, accountId) => {
  try {
    const URL = `/auth/reset/${accountId}`;
    const response = await rootInstance.post(URL, data);
    console.log("🚀 ~ file: user.api.js:83 ~ resetPassword ~ response", response)
    return response;
  } catch (error) {
    return error;
  }
}
export const findAllAccount = async () => {
  try {
    const URL = `/auth/all`;
    const response = await rootInstance.get(URL);
    return response.data; 
  } catch (error) {
    return error;
  }
}

