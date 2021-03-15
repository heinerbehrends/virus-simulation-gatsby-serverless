import { mapAccum, curry } from "ramda"
import { createPatient, patient } from "../patients/simplePatient"
import { createVirusPopulation } from "../viruses/simpleVirus"

type simpleSimArgs = {
  virusCount: number
  birthProb: number
  clearProb: number
  maxPop: number
  repetitions: number
}
type mapFn = {
  (patient: patient): [patient, number]
}

function simpleSimulation(
  mapFunction: mapFn,
  { virusCount, birthProb, clearProb, maxPop, repetitions }: simpleSimArgs
): number[] {
  const viruses = createVirusPopulation({ virusCount, birthProb, clearProb })
  const patient = createPatient(viruses, maxPop)
  const emptyList = [...Array(repetitions)]
  // mapAccum is like a combination of map and reduce.
  // It applies a function (mapPatient) to each item in the empty list
  // passing an accumulating parameter (the patient)
  // to each iteration. Returns a tuple of the final state of
  // the accumulator (the patient) and an array of virus counts.
  const [, virusCounts] = mapAccum(mapFunction, patient, emptyList)
  return virusCounts
}

// curry the simpleSim function so that the mapFunction
// can be applied before the rest of the parameters
const curriedSimulation = curry(simpleSimulation)
// for each iteration update the patient
// and write the virus count to the list
function mapPatientToVirusCount(patient: patient): [patient, number] {
  return [patient.updatePatient(), patient.getVirusCount()]
}

export const runSimpleSim = curriedSimulation(mapPatientToVirusCount)
