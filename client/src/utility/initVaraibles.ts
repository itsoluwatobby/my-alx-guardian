export const initAppState = {
  loading: false, isError: false, success: false, error: '', res: {}
}

export const initCategory: CreateCategoryRequest = {
  title: '', description: '', authorId: '', banner: '',
  category: { type: 'Forums', name: '' },
}
