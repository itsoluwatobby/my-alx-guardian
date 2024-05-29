/* eslint-disable @typescript-eslint/no-explicit-any */
import { guardianAuthenticatedAPI } from "../config";
import localStore from '../../utility/localStorage';
import { COMMENT } from "../endpoints/comments.endpoints";

const {
  get, getComments, update, deleteComment, create, toggleLike, tagComment
} = COMMENT;

class CommentAPI{
  
  loggedInId: string;

  constructor() {
    this.loggedInId = localStore.getStorage('my-id');
  }

  async createComment(newComment: CreateCommentRequest): Promise<CreateCommentResponse> {
    const response = await guardianAuthenticatedAPI[create.method](
      `${create.url}/?activeId=${this.loggedInId}`,
      newComment,
    ) as { data: CreateCommentResponse };
    return response.data
  }
  
  async updateComment(updateComment: UpdateCommentRequest): Promise<UpdateCommentResponse> {
    const response = await guardianAuthenticatedAPI[update.method](
      `${update.url}/?activeId=${this.loggedInId}`,
      updateComment,
    ) as { data: UpdateCommentResponse };
    return response.data
  }
  
  async getComment(userId: string): Promise<GetCommentResponse> {
    const response = await guardianAuthenticatedAPI[get.method](`${get.url}/${userId}?activeId=${this.loggedInId}`) as { data: GetCommentResponse };
    return response.data
  }
  
  async findComments(query: CommentQuery): Promise<GetComments> {
    const { pageNumber, limit, postId } = query;
    const commentQuery = `commentNumber=${pageNumber}&limit=${limit}&userId=${postId}`
    const response = await guardianAuthenticatedAPI[getComments.method](
      `${getComments.url}/?${commentQuery}&activeId=${this.loggedInId}`
    ) as { data: GetComments };
    return response.data
  }
  
  async likeComment(commentObj: CommentLikeRequest): Promise<CommentLikeResponse> {
    const response = await guardianAuthenticatedAPI[toggleLike.method](`${toggleLike.url}/?activeId=${this.loggedInId}`, commentObj) as { data: CommentLikeResponse };
    return response.data
  }
  
  async tagComment(commentObj: TagCommentRequest): Promise<TagCommentResponse> {
    const response = await guardianAuthenticatedAPI[tagComment.method](`${tagComment.url}/?activeId=${this.loggedInId}`, commentObj) as { data: TagCommentResponse };
    return response.data
  }
  
  async delete_comment(commentObj: DeleteCommentRequest): Promise<DeleteCommentResponse> {
    const response = await guardianAuthenticatedAPI[deleteComment.method](`${deleteComment.url}/?activeId=${this.loggedInId}`, commentObj) as { data: DeleteCommentResponse };
    return response.data
  }
}

export const commentAPI = new CommentAPI();
