/* eslint-disable @typescript-eslint/no-explicit-any */
import { guardianAuthenticatedAPI } from "../config";
import localStore from '../../utility/localStorage';
import { CATEGORY } from "../endpoints/category.endpoints";

const {
  get, search, getCategories, update, deleteCategory, create, joinOrLeaveCategory, getMembers
} = CATEGORY;

class CategoryAPI{
  
  loggedInId: string;

  constructor() {
    this.loggedInId = localStore.getStorage('my-id');
  }

  async createCategory(newCategory: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const response = await guardianAuthenticatedAPI[create.method](`${create.url}/?activeId=${this.loggedInId}`, newCategory) as { data: CreateCategoryResponse };
    return response.data
  }
  
  async updateCategory(updateCategory: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const response = await guardianAuthenticatedAPI[update.method](`${update.url}/?activeId=${this.loggedInId}`, updateCategory) as { data: UpdateCategoryResponse };
    return response.data
  }
  
  async updateCategoryDescription(updateDescription: UpdateDescriptionRequest): Promise<UpdateCategoryResponse> {
    const response = await guardianAuthenticatedAPI[update.method](
      `${update.url}/?activeId=${this.loggedInId}`,
      updateDescription,
    ) as { data: UpdateCategoryResponse };
    return response.data
  }
  
  async getCategory(categoryId: string): Promise<GetCategoryResponse> {
    const response = await guardianAuthenticatedAPI[get.method](`${get.url}/${categoryId}?activeId=${this.loggedInId}`) as { data: GetCategoryResponse };
    return response.data
  }
  
  async findCategorys(query: CategoryQuery): Promise<GetCategories> {
    const { pageNumber, limit, type } = query;
    const categoryQuery = `pageNumber=${pageNumber}&limit=${limit}&userId=${type}`
    const response = await guardianAuthenticatedAPI[getCategories.method](
      `${getCategories.url}/?${categoryQuery}&activeId=${this.loggedInId}`
    ) as { data: GetCategories };
    return response.data
  }
  
  async joinOrLeaveCategory(categoryObj: JoinLeaveCategoryRequest): Promise<JoinLeaveCategoryResponse> {
    const response = await guardianAuthenticatedAPI[joinOrLeaveCategory.method](`${joinOrLeaveCategory.url}/?activeId=${this.loggedInId}`, categoryObj) as { data: JoinLeaveCategoryResponse };
    return response.data
  }
  
  async members(categoryId: string): Promise<GetMembersResponse> {
    const response = await guardianAuthenticatedAPI[getMembers.method](
      `${getMembers.url}/${categoryId}/?activeId=${this.loggedInId}`,
    ) as { data: GetMembersResponse };
    return response.data
  }
  
  async searchCategory(query: string): Promise<SearchCategoryResponse> {
    const response = await guardianAuthenticatedAPI[search.method](`${search.url}/?search=${query}&activeId=${this.loggedInId}`) as { data: SearchCategoryResponse };
    return response.data
  }
  
  async delete_category(category: DeleteCategoryRequest): Promise<DeleteCategoryResponse> {
    const response = await guardianAuthenticatedAPI[deleteCategory.method](`${deleteCategory.url}/?activeId=${this.loggedInId}`, category) as { data: DeleteCategoryResponse };
    return response.data
  }
}

export const commentAPI = new CategoryAPI();
