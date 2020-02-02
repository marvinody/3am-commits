export const bucket = <T>(arr: T[], fn: (element: T) => number): T[][] => {
  const makeArr = (n: number) =>
    Array(n)
      .fill(0)
      .map(() => [])

  let buckets: T[][] = []
  for (const element of arr) {
    const curBucket = fn(element)
    if (curBucket > buckets.length - 1) {
      const newBuckets = makeArr(curBucket - buckets.length + 1)
      buckets = buckets.concat(newBuckets)
    }
    buckets[curBucket] = buckets[curBucket].concat(element)
  }

  return buckets
}

export const getHour = (s: string): string => {
  const match = s.match(/T(\d{2})/)
  if (match) {
    return match[1]
  }
  throw new Error("INVALID TIME")
}
