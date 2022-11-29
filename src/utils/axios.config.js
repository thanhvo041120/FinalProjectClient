import axios from "axios";

const rootInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEAPIURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

rootInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

rootInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const config = err.config;
    if (
      config.url === process.env.REACT_APP_BASEAPIURL + "/auth/login" ||
      config.url === process.env.REACT_APP_BASEAPIURL + "/auth/logout" ||
      config.url === process.env.REACT_APP_BASEAPIURL + "/auth/refresh" ||
      config.url === process.env.REACT_APP_BASEAPIURL + "/auth/register"
    ) {
      return err;
    }
    if (err.response.status === 401) {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BASEAPIURL + "/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
            },
          }
        );
        if (res.status === 201) {
          localStorage.setItem("access_token", res.data.data.access_token);
          localStorage.setItem("refresh_token", res.data.data.refresh_token);
          return rootInstance(config);
        }

      } catch (_error) {
        return _error.message;
      }
    }
    return err;
  }
);

export default rootInstance;
