/* eslint-disable @typescript-eslint/no-explicit-any */
import { guardianAuthenticatedAPI } from "../config";
import { POST } from "../endpoints/posts.endpoint";
import localStore from '../../utility/localStorage';

const {
  get, search, getPosts, update, deletePost, create, toggleLike, repost, share
} = POST;

class PostAPI{
  
  loggedInId: string;

  constructor() {
    this.loggedInId = localStore.getStorage('my-id');
  }

  async createPost(newPost: CreatePostRequest): Promise<CreatePostResponse> {
    const response = await guardianAuthenticatedAPI[create.method](`${create.url}/?activeId=${this.loggedInId}`, newPost) as { data: CreatePostResponse };
    return response.data
  }
  
  async updatePost(updatePost: UpdatePostRequest): Promise<UpdatePostResponse> {
    const response = await guardianAuthenticatedAPI[update.method](`${update.url}/?activeId=${this.loggedInId}`, updatePost) as { data: UpdatePostResponse };
    return response.data
  }
  
  async getPost(postId: string): Promise<GetPostResponse> {
    const response = await guardianAuthenticatedAPI[get.method](`${get.url}/${postId}?activeId=${this.loggedInId}`) as { data: GetPostResponse };
    return response.data
  }
  
  async findPosts(query: PostQuery): Promise<GetPosts> {
    let res = '';
    Object.entries(query).forEach(([key, val]) => {
      res += `${key}=${val}&`;
    });
    const response = await guardianAuthenticatedAPI[getPosts.method](
      `${getPosts.url}/?${res}activeId=${this.loggedInId}`
    ) as { data: GetPosts };
    return response.data
  }
  
  async likePost(postObj: PostLikeRequest): Promise<PostLikeResponse> {
    const response = await guardianAuthenticatedAPI[toggleLike.method](`${toggleLike.url}/?activeId=${this.loggedInId}`, postObj) as { data: PostLikeResponse };
    return response.data
  }
  
  async makeRepost(postObj: PostLikeRequest): Promise<PostLikeResponse> {
    const response = await guardianAuthenticatedAPI[repost.method](`${repost.url}/?activeId=${this.loggedInId}`, postObj) as { data: PostLikeResponse };
    return response.data
  }
  
  async sharePost(postObj: SharePostRequest): Promise<any> {
    const response = await guardianAuthenticatedAPI[share.method](`${share.url}/?activeId=${this.loggedInId}`, postObj) as { data: any };
    return response.data
  }
  
  async searchPost(query: string): Promise<SearchPostResponse> {
    const response = await guardianAuthenticatedAPI[search.method](`${search.url}/?search=${query}&activeId=${this.loggedInId}`) as { data: SearchPostResponse };
    return response.data
  }
  
  async delete_post(postObj: DeletePostRequest): Promise<DeletePostResponse> {
    const response = await guardianAuthenticatedAPI[deletePost.method](`${deletePost.url}/?activeId=${this.loggedInId}`, postObj) as { data: DeletePostResponse };
    return response.data
  }
}

export const postAPI = new PostAPI();
