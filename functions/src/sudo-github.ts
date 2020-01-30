import GithubApi from "./GithubApi"

const credentials = require("../github-credentials.json")

const gh = GithubApi(credentials)

export default gh
