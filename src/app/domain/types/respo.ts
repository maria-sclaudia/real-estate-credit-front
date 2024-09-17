export type User = {
  name: string;
  login: string;
  followers: number;
  following: number;
  location: string;
  avatar_url: string;
  bio: string;
};

export type Repository = {
  name: string;
  html_url: string;
  stargazers_count: number;
};

export type RepositorySort = {
  column: string;
  direction: SortDirection;
};

export type SortDirection = 'asc' | 'desc';
