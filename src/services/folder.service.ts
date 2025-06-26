import BaseService from "./base.service"
import { ICreateFolder, IFolder, IFolders, IResponse } from "./serviceTypes"

export default class FolderService extends BaseService {
  constructor() {
    super("folder")
  }

  async getFolders() {
    return await this.get<IFolders>("")
  }

  async createFolder(data: ICreateFolder) {
    return await this.post<ICreateFolder, IFolder>("", data)
  }

  async updateFolder(data: ICreateFolder) {
    return await this.patch<ICreateFolder, IFolder>("", data)
  }

  async deleteFolder() {
    return await this.delete<IResponse>("")
  }
}
