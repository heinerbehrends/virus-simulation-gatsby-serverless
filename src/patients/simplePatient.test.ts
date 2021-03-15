import { createPatient } from "./simplePatient"
import { createVirusPopulation } from "../viruses/simpleVirus"

describe("simplePatient", () => {
  it(`returns an object with a method getPopDensity that 
  accepts a virus population and returns 
  the population divided by the maximum population`, () => {
    const viruses = createVirusPopulation({
      birthProb: 0.1,
      clearProb: 0.05,
      virusCount: 1000,
    })
    const patient = createPatient(viruses, 2000)
    expect(patient.getPopDensity(viruses)).toEqual(0.5)
    const patient2 = createPatient(viruses, 4000)
    expect(patient2.getPopDensity(viruses)).toEqual(0.25)
  })

  it(`returns an object with a method getVirusCount 
  that returns the size of the population`, () => {
    const patient = createPatient(
      createVirusPopulation({ birthProb: 0.5, clearProb: 0.1, virusCount: 50 }),
      100
    )
    expect(patient.getVirusCount()).toEqual(50)
  })

  it(`returns an object with a method 
  getViruses that returns an array of viruses`, () => {
    const patient = createPatient(
      createVirusPopulation({ birthProb: 0.5, clearProb: 0.1, virusCount: 50 }),
      100
    )
    expect(Array.isArray(patient.getViruses())).toEqual(true)
    expect(patient.getViruses()).toHaveLength(50)
    const {
      birthProb,
      clearProb,
      doesSurvive,
      doesReproduce,
    } = patient.getViruses()[0]
    expect(birthProb).toBeTruthy()
    expect(clearProb).toBeTruthy()
    expect(doesSurvive).toBeTruthy()
    expect(doesReproduce).toBeTruthy()
  })

  it(`returns an object with a method updatePatient that returns a new patient
      with updated viruses without mutating the original array`, () => {
    const patient = createPatient(
      createVirusPopulation({ birthProb: 0.5, clearProb: 0.1, virusCount: 50 }),
      100
    )
    expect(patient.getVirusCount()).toEqual(50)
    const newPatient = patient.updatePatient()
    expect(newPatient.getVirusCount()).toBeGreaterThan(50)
    expect(patient.getVirusCount()).toEqual(50)
  })
})
