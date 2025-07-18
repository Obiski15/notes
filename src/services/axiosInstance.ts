import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios"

interface CustomConfig extends InternalAxiosRequestConfig {
  retry?: true
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const axiosInstance = (clientUrl: string, headers?: RawAxiosRequestHeaders) => {
  const instance = axios.create({
    timeout: 30000,
    baseURL: `${BASE_URL}/api/${clientUrl}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    withCredentials: true,
  })

  instance.interceptors.response.use(
    res => res,

    async err => {
      if (err instanceof AxiosError) {
        const originalRequest = err.config as CustomConfig

        if (
          err.response?.status === 401 &&
          !originalRequest.retry &&
          !err.response.config.url?.includes("/api/auth/refresh-token")
        ) {
          originalRequest.retry = true

          try {
            await axios.post(`${BASE_URL}/api/auth/refresh-token`, null, {
              withCredentials: true,
            })

            return instance(originalRequest)
          } catch (error) {
            return Promise.reject(error)
          }
        }
      }

      return Promise.reject(err)
    }
  )

  return instance
}

export default axiosInstance
