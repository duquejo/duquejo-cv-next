import { EventType } from '@/interfaces/general';

export interface Event {
  id: string;
  type: EventType | string;
  actor: Actor;
  repo: EventRepo;
  payload: Payload;
  public: boolean;
  created_at: string;
}

export interface Actor {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
}

export interface Payload {
  repository_id?: number;
  push_id?: number;
  size?: number;
  distinct_size?: number;
  ref?: null | string;
  head?: string;
  before?: string;
  commits?: Commit[];
  ref_type?: string;
  master_branch?: string;
  description?: string;
  pusher_type?: string;
  action?: string;
  number?: number;
  pull_request?: PullRequest;
}

export interface Commit {
  sha: string;
  author: Author;
  message: string;
  distinct: boolean;
  url: string;
}

export interface Author {
  email: string;
  name: string;
}

export interface PullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: User;
  body: null;
  created_at: string;
  updated_at: string;
  closed_at: null | string;
  merged_at: null | string;
  merge_commit_sha: null | string;
  assignee: null;
  milestone: null;
  draft: boolean;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: Base;
  base: Base;
  _links: Links;
  author_association: string;
  auto_merge: null;
  active_lock_reason: null;
  merged: boolean;
  mergeable: null;
  rebaseable: null;
  mergeable_state: string;
  merged_by: User | null;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

export interface Links {
  self: Comments;
  html: Comments;
  issue: Comments;
  comments: Comments;
  review_comments: Comments;
  review_comment: Comments;
  commits: Comments;
  statuses: Comments;
}

export interface Comments {
  href: string;
}

export interface Base {
  label: string;
  ref: string;
  sha: string;
  user: User;
  repo: BaseRepo;
}

export interface BaseRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: User;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: UserType;
  site_admin: boolean;
}

export enum UserType {
  User = 'User',
}

export interface EventRepo {
  id: number;
  name: string;
  url: string;
}

export interface BlogEventPayload extends Payload {
  blog_slug?: string;
  blog_title?: string;
  blog_category?: string;
  blog_tags?: string[];
}
