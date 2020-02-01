import firebase from "./sudo-firebase"
import GitHub from "./sudo-github"
import { computeAnalytics } from "./analytics"
;(async function() {
  const commits = await GitHub.searchAllCommits("fuck")
  console.log(commits.length)
  // const commitsColl = firebase.firestore().collection("commits")
  const analyticsColl = firebase.firestore().collection("analytics")

  // commits.forEach(commit => {
  //   // commitsColl.add(commit)
  // })
  const analytics = computeAnalytics(commits)
  await analyticsColl.doc(String(analytics.date)).set(analytics)
})()
