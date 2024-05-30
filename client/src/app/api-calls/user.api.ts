import { guardianAuthenticatedAPI } from "../config";
import { USER } from "../endpoints/user.endpoints";
import localStore from '../../utility/localStorage';

const {
  get, getUsers, update, deleteUser
} = USER;

class UserAPI{
  
  loggedInId: string;

  constructor() {
    this.loggedInId = localStore.getStorage('my-id');
  }

  async getUser(userId: string): Promise<GetUserResponse> {
    const response = await guardianAuthenticatedAPI[get.method](`${get.url}/${userId}?activeId=${this.loggedInId}`) as { data: GetUserResponse };
    return response.data
  }

  async searchUsers(query: string): Promise<GetUsersResponse> {
    const response = await guardianAuthenticatedAPI[getUsers.method](
      `${getUsers.url}/?query=${query}&activeId=${this.loggedInId}`
    ) as { data: GetUsersResponse };
    return response.data
  }

  async updateUser(userObj: UpdateUserRequest): Promise<UpdateUserResponse> {
    const response = await guardianAuthenticatedAPI[update.method](`${update.url}/?activeId=${this.loggedInId}`, userObj) as { data: UpdateUserResponse };
    return response.data
  }

  async deleteAccount(userObj: DeleteUserRequest): Promise<DeleteUserResponse> {
    const response = await guardianAuthenticatedAPI[deleteUser.method](`${deleteUser.url}/?activeId=${this.loggedInId}`, userObj) as { data: DeleteUserResponse };
    return response.data
  }
}

export const userAPI = new UserAPI();
