import { bucket, getHour } from "./utils"
import { Commit } from "./GithubApi"

type analytic = {
  curse: string
  cursesOnHour: number[] // 0 -> 12am,... value is curses at that hour
  cursesOnDay: number[] // 0 -> monday, ... value is curses on that day
}

type analytics = {
  date: number // unix timestamp
  data: analytic[]
}

export const computeAnalytics = (
  curses: { curse: string; commits: Commit[] }[]
): analytics => {
  return {
    date: Date.now(),
    data: curses.map(curse => {
      const timeBuckets = bucket(curse.commits, commit =>
        Number(getHour(commit.date_committed))
      )
      const dayBuckets = bucket(curse.commits, commit =>
        new Date(commit.date_committed).getDay()
      )
      return {
        curse: curse.curse,
        cursesOnHour: timeBuckets.map(b => b.length),
        cursesOnDay: dayBuckets.map(b => b.length),
      }
    }),
  }
}
