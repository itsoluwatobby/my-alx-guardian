// <reference guardian.ts>

type Children = {
  children: React.ReactNode;
}

type Theme = 'light' | 'dark';

type GuardianContextType = {
  theme: Theme;
  showTitle: boolean;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setShowTitle: React.Dispatch<React.SetStateAction<boolean>>;
}

type Toggle = 'OPEN' | 'CLOSE'
type ExpandDetailsType = { id: string; toggle: Toggle; }

type FooterTypes = {
  name: string;
  subs: string[];
  subName?: string;
  platforms?: string[];
}

type ApiValue<T> = (string | number | boolean | T) | (string | number | boolean | T)[]
type SubApiRes = Record<string, ApiValue> | Record<string, ApiValue>[]

type ApiResponseType<E, K> = Record<(string | E), (K | SubApiRes)>

type AppStateType = {
  loading: boolean;
  isError: boolean;
  success: boolean;
  res: ApiResponseType;
}

type Provider = 'Local' | 'Google' | 'Github';
type UserInfoType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  provider: Provider;
}

type UserCredentialsType = Pick<UserInfoType, 'email' | 'password'>;

type NewPasswordCredentials = Pick<UserInfoType, 'password' | 'confirmPassword'>;

type TypingEvent = 'typing' | 'notTyping'

// -------------- AUTHENTICATION -------------
type ResponseTemplate = { statuscode: number; message: string; }

type RegistrationResponse = ResponseTemplate & {
  data: { id: string; email: string; }
}

type ErrorResponse = ResponseTemplate & { error: object; }

type LoginRequest = { email: string; password: string; }
type LoginResponse = ResponseTemplate & {
  data: {
    id: string;
    email: string;
    provider: Provider;
    accessToken: string;
  }
}

type AccountActivationRequest = { email: string; otp: string; }
type AccountActivationResponse = ResponseTemplate & {
  data: { id: string; email: string; verified: boolean; }
}
type VerifyOTPRequest = AccountActivationRequest
type VerifyOTPResponse = ResponseTemplate & {
  data: { email: string; }
}

type LogoutRequest = { userId: string }
type LogoutResponse = ResponseTemplate & {
  data: { id: string }
}

type ForgotPasswordRequest = Pick<LoginRequest, 'email'>
type ForgotPasswordResponse = RegistrationResponse
type PasswordResetRequest = { email: string; newPassword: string; }
type PasswordResetResponse = RegistrationResponse

type ResendOTPRequest = Pick<PasswordResetRequest, 'email'>;
type ResendOTPResponse = { id: string; email: string; }

// --------------- USERS -----------------
type UserSocialAccounts = { platform: string; handle: string; followers: number; };
type UserType = {
  location: { address: string; country: string; },
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  cohort: string;
  provider: Provider;
  title: string;
  skills: string[];
  bio: string;
  verified: boolean;
  activeAccounts: UserSocialAccounts[];
  createdAt: string;
  updatedAt: string;
}

type GetUserResponse = ResponseTemplate & { data: UserType; }
type GetUsersResponse = ResponseTemplate & { data: UserType[]; }

type UpdateUserRequest = {
  id: string;
  location?: { address: string; country: string; },
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  cohort?: string;
  provider?: Provider;
  title?: string;
  skills?: string[];
  bio?: string;
  activeAccounts?: UserSocialAccounts[];
}
type UpdateUserResponse = GetUserResponse

type DeleteUserRequest = { id: string }
type DeleteUserResponse = ResponseTemplate & { data: DeleteUserRequest }

type Pagination = {
  pages: {
    previous: number | null;
    current: number | null;
    next: number | null;
  }
  length: number;
  pagesLeft: number;
  numberOfPages: number
}

// ------------ POST -------------
type CategoryType = 'General' | 'Cohorts' | 'Forums';

type PostType = {
  userId: string;
  _id: string;
  title: string;
  body: string;
  picture: string;
  likes: string[];
  category: { type: CategoryType; name?: string; };
  isRepost: boolean;
  sharedCount: number;
  reposts: [];
  createdAt: string;
  updatedAt: string;
}

type CreatePostRequest = Pick<PostType, 'userId' | 'title' | 'body' | 'category'>;
type CreatePostResponse = ResponseTemplate & { data: PostType }

type GetPosts = ResponseTemplate & {
  data: { pageable: Pagination; data: PostType[]; }
}

type GetPostResponse = CreatePostResponse

type UpdatePostRequest = { id: strimg; } & Omit<PostType, '_id'>
type UpdatePostResponse = CreatePostResponse

type PostLikeRequest = { userId: string; postId: string }
type PostLikeResponse = CreatePostResponse

type SharePostRequest = PostLikeRequest & {
  platform: { name: string; link: string }
}

type RepostRequest = PostLikeRequest
type RepostResponse = CreatePostResponse

type DeletePostRequest = Pick<PostLikeRequest, 'postId'>
type DeletePostResponse = ResponseTemplate & { data: string }

type SearchPostResponse = ResponseTemplate & { data: PostType[] }

// ------------ COMMENT -------------

type CommentType = {
  userId: string;
  postId: string;
  comment: string;
  likes: string[];
  _id: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
}

type CreateCommentRequest = Pick<CommentType, 'userId' | 'postId' | 'comment'>;
type CreateCommentResponse = ResponseTemplate & { data: CommentType }

type GetComments = ResponseTemplate & {
  data: { pageable: Pagination; data: CommentType[]; }
}

type GetCommentResponse = CreateCommentResponse

type UpdateCommentRequest = { id: strimg; } & Pick<CommentType, 'userId' | 'comment' | 'postId'>
type UpdateCommentResponse = CreateCommentResponse

type CommentLikeRequest = { userId: string; id: string }
type CommentLikeResponse = CreateCommentResponse

type TagCommentRequest = { postId: string; userId: string; id: string; comment: string; }
type TagCommentResponse = CreateCommentResponse

type DeleteCommentRequest = CommentLikeRequest
type DeleteCommentResponse = ResponseTemplate & { data: string }

type SearchCommentResponse = ResponseTemplate & { data: CommentType[] }

// ------------ CATEGORY -------------

type CategoryObjType = {
  authorId: string;
  banner?: string;
  title?: string;
  description?: string;
  category: { type: CategoryType; name?: string; };
  _id: string;
  members: [];
  updates: [];
  modifiedBy: { userId: string; };
  createdAt: string;
  updatedAt: string;
}

type CreateCategoryRequest = Pick<CategoryObjType, 'authorId' | 'category' | 'banner' | 'title' | 'description'>;
type CreateCategoryResponse = ResponseTemplate & { data: CategoryObjType }

type GetCategories = ResponseTemplate & {
  data: { pageable: Pagination; data: CategoryObjType[]; }
}

type GetCategoryResponse = CreateCategoryResponse

type GetMembersResponse = GetUsersResponse

type UpdateCategoryRequest = { id: strimg; } & CreateCategoryRequest
type UpdateCategoryResponse = CreateCategoryResponse

type UpdateDescriptionRequest = { userId: string; id: string; description: string; }
type UpdateDescriptionResponse = CreateCategoryResponse

type JoinLeaveCategoryRequest = Omit<UpdateDescriptionRequest, 'description'>
type JoinLeaveCategoryResponse = CreateCategoryResponse

type DeleteCategoryRequest = JoinLeaveCategoryRequest
type DeleteCategoryResponse = ResponseTemplate & { data: string }

type SearchCategoryResponse = ResponseTemplate & { data: CategoryObjType[] }
