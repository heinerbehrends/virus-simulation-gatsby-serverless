import { runSimpleSim } from "./simpleSim"

describe("simpleSim", () => {
  it(`produces a list of virus counts, that is growing and smaller than maxPop`, () => {
    const listOfVirusCounts = runSimpleSim({
      virusCount: 100,
      birthProb: 0.1,
      clearProb: 0.05,
      maxPop: 1000,
      repetitions: 300,
    })
    const maxVirusCount = Math.max(...listOfVirusCounts)
    expect(maxVirusCount).toBeGreaterThan(100)
    expect(maxVirusCount).toBeLessThan(1000)
    expect(listOfVirusCounts).toHaveLength(300)
  })
})
