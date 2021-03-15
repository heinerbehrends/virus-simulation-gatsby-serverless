type randomFn = {
  (): number
}
export type simpleVirus = {
  readonly birthProb: number
  readonly clearProb: number
  readonly doesReproduce: { (popDensity: number): boolean }
  readonly doesSurvive: { (): boolean }
}

export function createSimpleVirus(
  birthProb: number,
  clearProb: number,
  random0to1: randomFn
): simpleVirus {
  // the methods are called in the simple patient implementation
  function doesReproduce(popDensity: number) {
    return random0to1() < birthProb * (1 - popDensity)
  }
  function doesSurvive() {
    return random0to1() > clearProb
  }

  return Object.freeze({
    birthProb,
    clearProb,
    doesSurvive,
    doesReproduce,
  })
}

type virusPopulationArg = {
  virusCount: number
  birthProb: number
  clearProb: number
}

export function createVirusPopulation({
  virusCount,
  birthProb,
  clearProb,
}: virusPopulationArg): simpleVirus[] {
  return Array(virusCount).fill(
    createSimpleVirus(birthProb, clearProb, Math.random)
  )
}
