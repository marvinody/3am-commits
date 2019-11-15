import axios from 'axios';
interface Commit {
  api_url: string;
  html_url: string;
  git_id: string;
  message: any;
  author: Author;
  date_committed: string;
}
interface Author {
  login: string;
  avatar_url: string;
  profile_url: string;
}

interface GitHubApi {
  searchCommits: (query: string) => Promise<Commit[]>
  searchAllCommits: (query: string) => Promise<Commit[]>
}

const commitReducer = (commitData): Commit => ({
  api_url: commitData.url,
  html_url: commitData.html_url,
  git_id: commitData.node_id,
  message: commitData.commit.message,
  author: authorReducer(commitData.committer),
  date_committed: commitData.commit.committer.date
})

const authorReducer = (authorData: { login: string; avatar_url: string; html_url: string; }): Author => ({
  login: authorData.login,
  avatar_url: authorData.avatar_url,
  profile_url: authorData.html_url,
})

export default (token: string) => {
  const ax = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 5000,
  });

  return {
    async searchCommits(query: string): Promise<Commit[]> {
      try {
        // grab commits with search term in it, sorted by date
        const { data, headers } = await ax.get(`search/commits`, {
          params: {
            q: query,
            sort: 'committer-date',
            per_page: '100'
          },
          headers: {
            "Accept": "application/vnd.github.cloak-preview"
          }
        });

        const commits = data.items.filter(commitData => commitData.committer)
        // and just give them
        console.log(headers)
        return commits.map(commitReducer)
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
          sort: 'committer-date',
          per_page: '100'
        },
        headers: {
          "Accept": "application/vnd.github.cloak-preview"
        }
      };
      const OlderThanToday = () => {
        const date = (new Date()).toISOString()
        return (commitData) => commitData.commit.committer.date < date
      }

      const hasCommitter = () => commitData => commitData.committer

      const transformData = data =>
        data.items
          .filter(hasCommitter())
          .filter(OlderThanToday())
          .map(commitReducer)

      try {
        let { data, headers } = await ax.get(`search/commits`, config)
        commits = commits.concat(
          ...transformData(data)
        )
        while (headers.link) {
          const url = parseNextPage(headers)
          const stuff = await ax.get(url, config)
          data = stuff.data
          headers = stuff.headers
          commits = commits.concat(
            ...transformData(data)
          )
        }
      } catch (err) {
        console.error(err)
      } finally {
        return Promise.resolve(commits)
      }
    }
  }
}

const parseNextPage = (headers: { link: any; }): string => {
  const links = headers.link.split(',')
  const badLink = links.find((link: string) => link.includes('rel="next"'))
  const matches = badLink.match(/<(.*?)>; rel="next"/)
  return matches[1]
}
