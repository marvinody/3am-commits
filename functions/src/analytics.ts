import { bucket, getHour } from "./utils"
import { Commit } from "./GithubApi"

type analytics = {
  date: number // unix timestamp
  cursesAtHour: number[] // 0 -> 12am,... number is curses at that hour
}

export const computeAnalytics = (commits: Commit[]): analytics => {
  const timeBuckets = bucket(commits, commit =>
    Number(getHour(commit.date_committed))
  )

  return {
    date: Date.now(),
    cursesAtHour: timeBuckets.map(b => b.length),
  }
}
