/**
 * @file github.ts
 * @description GitHub 服务类型定义
 * @author YYC³ Team
 * @version 1.0.0
 */

export interface GitHubConfig {
  token: string;
  owner?: string;
  repo?: string;
  baseUrl?: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  owner?: string;
  description?: string;
  private?: boolean;
  isPrivate?: boolean;
  fork?: boolean;
  stars?: number;
  forks?: number;
  issues?: number;
  watchers?: number;
  stargazersCount?: number;
  forksCount?: number;
  openIssuesCount?: number;
  language?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  pushedAt?: Date | string;
  defaultBranch: string;
  url?: string;
  htmlUrl: string;
  apiUrl?: string;
  cloneUrl?: string;
  size?: number;
  topics?: string[];
  archived?: boolean;
  disabled?: boolean;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  labels: GitHubLabel[];
  assignees: GitHubUser[];
  milestone?: GitHubMilestone;
  createdAt: Date | string;
  updatedAt: Date | string;
  closedAt?: Date | string;
  user: GitHubUser;
  url: string;
}

export interface GitHubPullRequest {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed' | 'merged';
  draft: boolean;
  merged: boolean;
  mergeable?: boolean;
  mergeableState?: string;
  user: GitHubUser;
  head: {
    ref: string;
    sha: string;
  };
  base: {
    ref: string;
    sha: string;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
  mergedAt?: Date | string;
  closedAt?: Date | string;
  labels: GitHubLabel[];
  assignees: GitHubUser[];
  reviewers: GitHubUser[];
}

export interface GitHubLabel {
  id: number;
  name: string;
  color: string;
  description?: string;
}

export interface GitHubUser {
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  type: 'User' | 'Organization';
}

export interface GitHubMilestone {
  id: number;
  number: number;
  title: string;
  description?: string;
  state: 'open' | 'closed';
  openIssues: number;
  closedIssues: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  dueOn?: Date | string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: Date | string;
  };
  committer?: {
    name: string;
    email: string;
    date: Date | string;
  };
  url?: string;
  htmlUrl?: string;
}

export interface GitHubBranch {
  name: string;
  commit?: GitHubCommit;
  commitSha?: string;
  isProtected?: boolean;
  protected?: boolean;
}

// 额外的类型导出
export interface GitHubOperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}

export interface RepoSearchParams {
  query?: string;
  org?: string;
  language?: string;
  sort?: 'stars' | 'forks' | 'updated' | 'created';
  order?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  perPage: number;
  hasMore: boolean;
  hasNextPage?: boolean;
}
