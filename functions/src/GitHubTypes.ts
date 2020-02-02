export interface Commit {
  api_url: string
  html_url: string
  git_id: string
  message: any
  author: Author
  date_committed: string
}
export interface Author {
  login: string
  avatar_url: string
  profile_url: string
}

export interface GitHubSearch {
  items: GitHubSearchEntry[]
}

export interface GitHubSearchEntry {
  url: string
  html_url: string
  node_id: string
  committer: null | GitHubCommitter
  commit: GitHubCommit
}

export interface GitHubCommit {
  message: string
  committer: {
    name: string
    date: string
    email: string
  }
}

export interface GitHubCommitter {
  login: string
  avatar_url: string
  html_url: string
}

export interface GitHubApi {
  searchCommits: (query: string) => Promise<Commit[]>
  searchAllCommits: (query: string) => Promise<Commit[]>
}

export type GitHubCredentials = {
  token: string
}
