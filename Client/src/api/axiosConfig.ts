// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const token = currentUser.token || null;
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors
    throw error.response.data;
  }
);
export default axiosClient;
