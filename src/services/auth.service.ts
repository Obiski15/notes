import BaseService from "./base.service"
import { IAuth, ILogin, IRegister } from "./serviceTypes"

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
}
