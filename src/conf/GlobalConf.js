import Axios from "axios";
import { getToken } from "../utils/AuthHelp";


export const rootUrl = process.env.REACT_APP_ROOT_URL;

//export const rootUrl = `https://${window.location.hostname}:443/`;

export const Http = Axios.create({
  baseURL: rootUrl,
});

Http.interceptors.request.use(async (config) => {
  const token = getToken();
 // config.headers["Content-Type"]= 'application/json'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



//"Content-Type": "multipart/form-data" 