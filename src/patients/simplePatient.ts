import { simpleVirus } from "../viruses/simpleVirus"

export type patient = {
  getPopDensity: { (virusArr: simpleVirus[]): number }
  getVirusCount: { (): number }
  getViruses: { (): simpleVirus[] }
  updatePatient: { (): patient }
}

export function createPatient(viruses: simpleVirus[], maxPop: number): patient {
  function getPopDensity(virusArr) {
    return virusArr.length / maxPop
  }
  function getVirusCount() {
    return viruses.length
  }
  function getViruses() {
    return viruses
  }
  // gets called by the simple simulation
  function updatePatient() {
    // filter the viruses that die
    const survivingViruses = viruses.filter(virus => virus.doesSurvive())
    // calculate the population density of the surviving viruses
    const popDensity = getPopDensity(survivingViruses)
    // return a new patient with updated virus population
    return createPatient(
      // add the viruses that replicate
      survivingViruses.concat(
        viruses.filter(virus => virus.doesReproduce(popDensity))
      ),
      maxPop
    )
  }

  return Object.freeze({
    getPopDensity,
    getVirusCount,
    getViruses,
    updatePatient,
  })
}
