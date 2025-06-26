import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios"

import axiosInstance from "./axiosInstance"

export default abstract class BaseService {
  protected clientUrl: string
  protected apiInstance: AxiosInstance

  constructor(url: string, headers?: Record<string, string>) {
    this.clientUrl = url
    this.apiInstance = axiosInstance(this.clientUrl, headers)
  }

  protected async handleRequest<IResponse>(
    request: Promise<AxiosResponse<IResponse>>
  ) {
    try {
      return (await request).data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data
      }

      throw error
    }
  }

  protected async get<IResponse>(url: string, config?: AxiosRequestConfig) {
    return this.handleRequest<IResponse>(this.apiInstance.get(url, config))
  }

  protected async post<IRequest, IResponse>(
    url: string,
    data?: IRequest,
    config?: AxiosRequestConfig
  ) {
    return this.handleRequest<IResponse>(
      this.apiInstance.post(url, data, config)
    )
  }

  protected async patch<IRequest, IResponse>(
    url: string,
    data?: IRequest,
    config?: AxiosRequestConfig
  ) {
    return this.handleRequest<IResponse>(
      this.apiInstance.patch(url, data, config)
    )
  }

  protected async delete<IResponse>(url: string, config?: AxiosRequestConfig) {
    return this.handleRequest<IResponse>(this.apiInstance.delete(url, config))
  }
}
