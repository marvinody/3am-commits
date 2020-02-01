import axios from "axios"
import {
  GitHubSearch,
  GitHubApi,
  GitHubCommitter,
  GitHubSearchEntry,
  Author,
  Commit,
  GitHubCredentials,
} from "./GitHubTypes"
export * from "./GitHubTypes"

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
    timeout: 8000,
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
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
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
          console.log("next page", { url })
          const stuff = await ax.get(url, config)
          data = stuff.data
          headers = stuff.headers

          commits = commits.concat(...transformData(data))
        }
      } catch (err) {
        console.error(err)
      } finally {
        console.log("COMMITS IN FN:", commits)
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
