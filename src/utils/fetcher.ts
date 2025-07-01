import Axios, { AxiosRequestConfig } from "axios";
import { serverBaseURL } from "../constants/constant";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuthValue } from "../hooks/common/useAuthValue";

export const fetcher = async (config: AxiosRequestConfig) => {
  const { url, method, data, headers } = config;

  const authStateString: any = await AsyncStorage.getItem('authState');
  const authSaveDataJson = JSON.parse(authStateString)

  // console.log("authSaveDataJson?.tokenL ", authSaveDataJson?.token);

  // console.log(!!authSaveDataJson?.token ? `${authSaveDataJson?.token}` : undefined,'fetcher...');

  // console.log("authSaveDataJson?.token: ", authSaveDataJson?.token);


  return await Axios.request({
    baseURL: serverBaseURL as string,
    url,
    method: method ?? 'GET',
    data,
    ...config,
    headers: {
      Authorization: !!authSaveDataJson?.token ? `${authSaveDataJson?.token}` : undefined,
      // Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBmOTg0ODY3ZTBhZDRhYTcyYjRjMDMiLCJlbWFpbCI6InNoYWh6YWQyMDE0MTVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMyMjcxNDcyLCJleHAiOjE3MzIzMTQ2NzJ9.8Xhp4CK3gMqQcnrkK19FDZHQFV7ngbESX4ht1To0LMg',
      ...config?.headers,
      ...headers,
    },
  });
};