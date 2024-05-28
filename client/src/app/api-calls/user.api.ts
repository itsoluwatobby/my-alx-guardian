import { guardianAuthenticatedAPI } from "../config";
import { USER } from "../endpoints/user.endpoints";

const {
  get, getUsers, update, deleteUser
} = USER;

export const getUser = async (userId: string, loggedIn: string): Promise<GetUserResponse> => {
  const response = await guardianAuthenticatedAPI[get.method](`${get.url}/${userId}?activeId=${loggedIn}`) as { data: GetUserResponse };
  return response.data
}

export const findUsers = async (query: string, loggedIn: string): Promise<GetUsersResponse> => {
  const response = await guardianAuthenticatedAPI[getUsers.method](
    `${getUsers.url}/?query=${query}activeId=${loggedIn}`
  ) as { data: GetUsersResponse };
  return response.data
}

export const updateUser = async (userObj: UpdateUserRequest, loggedIn: string): Promise<UpdateUserResponse> => {
  const response = await guardianAuthenticatedAPI[update.method](`${update.url}/?activeId=${loggedIn}`, userObj) as { data: UpdateUserResponse };
  return response.data
}

export const deleteAccount = async (userId: string, loggedIn: string): Promise<DeleteUserResponse> => {
  const response = await guardianAuthenticatedAPI[deleteUser.method](`${deleteUser.url}/${userId}?activeId=${loggedIn}`) as { data: DeleteUserResponse };
  return response.data
}