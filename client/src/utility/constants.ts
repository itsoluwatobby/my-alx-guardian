
export const MAX_LENGTH = {
  MIN_TEXT: 120,
  MAX_TEXT: 150,
  MAX_FILE_SIZE: 800_000,
  VIDEO_LENGTH: 10,
  TIMEOUT: 10_000,
  MIN_TIMEOUT: 5_000,
  MAX_TIMEOUT: 300_000,
  DEBOUNCE: 750,
} as const;

export const Provider: Record<Provider, Provider> = {
  Local: 'Local',
  Google: 'Google',
  Github: 'Github',
};

export const CategoryEnum: Record<CategoryType, CategoryType> = {
  Forums: 'Forums',
  Cohorts: 'Cohorts',
  General: 'General',
};
