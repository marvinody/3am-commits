import firebase from "./sudo-firebase"
import GitHub from "./sudo-github"
import { computeAnalytics } from "./analytics"
;(async function() {
  const fucks = await GitHub.searchAllCommits("fuck")
  const shits = await GitHub.searchAllCommits("shit")
  console.log(fucks.length, shits.length)

  // const commitsColl = firebase.firestore().collection("commits")
  const analyticsColl = firebase.firestore().collection("analytics")

  // commits.forEach(commit => {
  //   // commitsColl.add(commit)
  // })
  const analytics = computeAnalytics([
    {
      curse: "fuck",
      commits: fucks,
    },
    {
      curse: "shit",
      commits: shits,
    },
  ])
  await analyticsColl.doc(String(analytics.date)).set(analytics)
})().catch(console.error)
