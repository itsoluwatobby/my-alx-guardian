// <reference guardian.ts>

type Children = {
  children: React.ReactNode;
}

type Theme = 'light' | 'dark';
type TypingEvent = 'typing' | 'notTyping' | 'pass'
type DebouncedType = { val: string; isTyping: boolean, event: TypingEvent }

type GuardianContextType = {
  theme: Theme;
  showTitle: boolean;
  loggedInUserId: string;
  currentPost: Partial<PostType>;
  currentUser: Partial<UserType>;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setShowTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedInUserId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPost: React.Dispatch<React.SetStateAction<Partial<PostType>>>;
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
  error: string;
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
}

type UserCredentialsType = Pick<UserInfoType, 'email' | 'password'>;

type NewPasswordCredentials = Pick<UserInfoType, 'password' | 'confirmPassword'>;

type TypingEvent = 'typing' | 'notTyping'

// -------------- AUTHENTICATION -------------
type ResponseTemplate = { statuscode: number; message: string; }

type RegistrationRequest = Omit<UserInfoType, 'confirmPassword'> & { provider: Provider; }
type RegistrationResponse = ResponseTemplate & {
  data: { id: string; email: string; }
}

type ThirdPartyRequest = Omit<UserInfoType, 'confirmPassword' | 'password'> & {
  picture: string, provider: Provider;
}

type ErrorResponse = {
  response: {
    data: ResponseTemplate & { error: object; }
  }
}

type Entries = 'entry1' | 'entry2' | 'entry3' | 'entry4' | 'entry5' | 'entry6'
type OTPValues = Record<Entries, string>;

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
  body: string;
  picture: string;
  likes: string[];
  category: { type: CategoryType; name?: string; };
  isRepost: boolean;
  sharedCount: number;
  reposts: [];
  createdAt: string;
  updatedAt: string;
  commentCount: number;
}

type CreatePostRequest = Pick<PostType, 'userId' | 'body' | 'category'>;
type CreatePostResponse = ResponseTemplate & { data: PostType }

type GetPosts = ResponseTemplate & {
  data: { pageable: Pagination; data: PostType[]; }
}

type PostQuery = { pageNumber: number; limit: number; userId?: string; }
type GetPostResponse = CreatePostResponse

type UpdatePostRequest = { id: strimg; } & Omit<PostType, '_id'>;
type UpdatePostResponse = CreatePostResponse

type PostLikeRequest = { userId: string; postId: string }
type PostLikeResponse = CreatePostResponse

type PlatformNames = 'Whatsapp' | 'Twitter' | 'LinkedIn' | 'Facebook' | 'Copied' | 'pass'
type Platform = { name: PlatformNames; link: string }
type SharePostRequest = PostLikeRequest & {
  platform: Platform;
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

type CommentQuery = { pageNumber: number; limit: number; postId: string; }
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

type DeleteCommentRequest = DeleteUserRequest
type DeleteCommentResponse = ResponseTemplate & { data: string }

// type SearchCommentResponse = ResponseTemplate & { data: CommentType[] }

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

type CategoryQuery = { pageNumber: number; limit: number; type: Exclude<CategoryType, 'General'>; }
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

type DeleteCategoryRequest = DeleteUserRequest
type DeleteCategoryResponse = ResponseTemplate & { data: string }

type SearchCategoryResponse = ResponseTemplate & { data: CategoryObjType[] }
