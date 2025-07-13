import BaseService from "./base.service"
import {
  IAuth,
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
  IResponse,
} from "./serviceTypes"

export default class AuthService extends BaseService {
  constructor() {
    super("/")
  }

  async login(data: ILogin) {
    return await this.post<ILogin, IAuth>("/login", data)
  }

  async register(data: IRegister) {
    return await this.post<IRegister, IAuth>("/register", data)
  }

  async forgotPassword(data: IForgotPassword) {
    return await this.post<IForgotPassword, IResponse>("/forgot-password", data)
  }

  async resetPassword({
    resetToken,
    password,
    confirm_password,
  }: IResetPassword) {
    return await this.post<Omit<IResetPassword, "resetToken">, IResponse>(
      `/reset-password/${resetToken}`,
      { confirm_password, password }
    )
  }
}
