import axios, { RawAxiosRequestHeaders } from "axios"

const axiosInstance = (clientUrl: string, headers?: RawAxiosRequestHeaders) =>
  axios.create({
    timeout: 30000,
    baseURL: `/api/v1/${clientUrl}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    withCredentials: true,
  })

export default axiosInstance
