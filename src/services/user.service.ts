import BaseService from "./base.service"
import { IUser } from "./serviceTypes"

export default class UserService extends BaseService {
  constructor() {
    super("/")
  }

  async getUser() {
    return this.get<IUser>("/user")
  }
}
