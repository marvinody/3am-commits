import axios from "axios"
interface Commit {
  api_url: string
  html_url: string
  git_id: string
  message: any
  author: Author
  date_committed: string
}
interface Author {
  login: string
  avatar_url: string
  profile_url: string
}

interface GitHubSearch {
  items: GitHubSearchEntry[]
}

interface GitHubSearchEntry {
  url: string
  html_url: string
  node_id: string
  committer: null | GitHubCommitter
  commit: GitHubCommit
}

interface GitHubCommit {
  message: string
  committer: {
    name: string
    date: string
    email: string
  }
}

interface GitHubCommitter {
  login: string
  avatar_url: string
  html_url: string
}

interface GitHubApi {
  searchCommits: (query: string) => Promise<Commit[]>
  searchAllCommits: (query: string) => Promise<Commit[]>
}

type GitHubCredentials = {
  client_id: string
  client_secret: string
}

const commitReducer = (commitData: GitHubSearchEntry): Commit => ({
  api_url: commitData.url,
  html_url: commitData.html_url,
  git_id: commitData.node_id,
  message: commitData.commit.message,
  author: authorReducer(commitData.committer),
  date_committed: commitData.commit.committer.date,
})

const authorReducer = (authorData: GitHubCommitter | null): Author => ({
  login: authorData ? authorData.login : "No Author",
  avatar_url: authorData
    ? authorData.avatar_url
    : "https://i.stack.imgur.com/frlIf.png",
  profile_url: authorData ? authorData.html_url : "https://github.com",
})

// expects an iso string for the date
const OlderThanToday = (date: string) => (commitData: GitHubSearchEntry) =>
  commitData.commit.committer.date < date

const hasCommitter = (commitData: GitHubSearchEntry) => commitData.committer

const transformData = (data: GitHubSearch) =>
  data.items
    .filter(hasCommitter)
    .filter(OlderThanToday(new Date().toISOString()))
    .map(commitReducer)

export default (credentials: GitHubCredentials): GitHubApi => {
  const ax = axios.create({
    baseURL: "https://api.github.com/",
    timeout: 5000,
  })

  return {
    async searchCommits(query: string): Promise<Commit[]> {
      try {
        // grab commits with search term in it, sorted by date
        const { data, headers, request } = await ax.get(`search/commits`, {
          params: {
            q: query,
            sort: "committer-date",
            per_page: "100",
            client_id: credentials.client_id,
            client_secret: credentials.client_secret,
          },
          headers: {
            Accept: "application/vnd.github.cloak-preview",
          },
        })
        return transformData(data)
      } catch (err) {
        // otherwise no good
        console.error(err)
        return Promise.resolve([])
      }
    },
    async searchAllCommits(query: string): Promise<Commit[]> {
      let commits: Commit[] = []
      const config = {
        params: {
          q: query,
          sort: "committer-date",
          per_page: "100",
        },
        headers: {
          Accept: "application/vnd.github.cloak-preview",
        },
      }

      try {
        let { data, headers } = await ax.get(`search/commits`, config)
        commits = commits.concat(...transformData(data))
        while (headers.link) {
          const url = parseNextPage(headers)
          const stuff = await ax.get(url, config)
          data = stuff.data
          headers = stuff.headers
          commits = commits.concat(...data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        return Promise.resolve(commits)
      }
    },
  }
}

const parseNextPage = (headers: { link: any }): string => {
  const links = headers.link.split(",")
  const badLink = links.find((link: string) => link.includes('rel="next"'))
  const matches = badLink.match(/<(.*?)>; rel="next"/)
  return matches[1]
}
