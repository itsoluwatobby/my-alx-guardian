export const initAppState = {
  loading: false, isError: false, success: false, error: '', res: {}
}

export const initCategory: CreateCategoryRequest = {
  title: '', description: '', authorId: '', banner: '',
  category: { type: 'Forums', name: '' },
}

export const initPagination = {
  pages: { previous: null, current: null, next: null },
  length: 0, pagesLeft: 0, numberOfPages: 0,
};

export const initUserDetails: UserType = {
  location: { address: '', country: '' },
  _id: '', firstName: '', lastName: '', email: '',
  profilePicture: '', cohort: '', provider: '' as Provider,
  title: '', skills: [] as string[], bio: '', verified: false,
  activeAccounts: [] as UserSocialAccounts[],
  createdAt: '', updatedAt: '',
}

export const initPost: PostType = {
  userId: '', _id: '', body: '', picture: '',
  likes: [] as string[], category: { type: '' as CategoryType, name: '' },
  isRepost: false, sharedCount: 0, reposts: [], createdAt: '',
  updatedAt: '', commentCount: 0,
}
