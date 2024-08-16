import axios from "axios";
import { APIS, REACT_APP_ENVIRONMENT } from "../config";
import { getToken } from "./helpers";

const headers = {
  "Content-Type": "Application/json",
  "Access-Control-Allow-Origin": "*",
}

const instance = axios.create({
  baseURL: REACT_APP_ENVIRONMENT === "DEV" ? APIS.dev : REACT_APP_ENVIRONMENT === "QA" ? APIS.QA : REACT_APP_ENVIRONMENT === "PROD" ? APIS.prod : APIS.local,
  headers: headers,

  // use key withCredentials true if you work with cookie from server
  // withCredentials:true
});

instance.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;