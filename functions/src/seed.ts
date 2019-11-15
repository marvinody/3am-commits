import GithubApi from './GithubApi'
import firebase from './sudo-firebase'
(async function () {
  const gh = GithubApi('')
  const commits = await gh.searchAllCommits('fuck')
  const collection = firebase.firestore().collection('commits');

  commits.forEach(commit => {
    collection.add(commit);
  })
})()
