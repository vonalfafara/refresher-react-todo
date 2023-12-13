import axios from "axios";

function http(options = {}) {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      Accept: "application/json",
      ...options,
    },
  });

  return api;
}

export default http;
