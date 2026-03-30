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
  owner: string;
  description?: string;
  private: boolean;
  fork: boolean;
  stars: number;
  forks: number;
  issues: number;
  watchers: number;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
  pushedAt?: Date;
  defaultBranch: string;
  url: string;
  htmlUrl: string;
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
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
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
  createdAt: Date;
  updatedAt: Date;
  mergedAt?: Date;
  closedAt?: Date;
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
  createdAt: Date;
  updatedAt: Date;
  dueOn?: Date;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: Date;
  };
  committer: {
    name: string;
    email: string;
    date: Date;
  };
  url: string;
}

export interface GitHubBranch {
  name: string;
  commit: GitHubCommit;
  protected: boolean;
}
