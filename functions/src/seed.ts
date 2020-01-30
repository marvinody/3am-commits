import firebase from "./sudo-firebase"
import GitHub from "./sudo-github"
;(async function() {
  const commits = await GitHub.searchAllCommits("fuck")
  const collection = firebase.firestore().collection("commits")

  commits.forEach(commit => {
    collection.add(commit)
  })
})()
