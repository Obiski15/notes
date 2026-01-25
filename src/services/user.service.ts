import { IUser } from "../types"
import BaseService from "./base.service"

export default class UserService extends BaseService {
  constructor() {
    super("/")
  }

  async getUser() {
    return this.get<IUser>("/user")
  }
}
