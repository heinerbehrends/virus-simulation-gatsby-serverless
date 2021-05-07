// import { mapAccum } from "ramda"
const { mapAccum } = require("ramda")
// const { mapAccum } = require('ramda')
// import { createPatient, patient } from "../src/patients/simplePatient"
const { createPatient, patient } = require("../src/patients/simplePatient")
// import { createVirusPopulation } from "../src/viruses/simpleVirus"
const { createVirusPopulation } = require("../src/viruses/simpleVirus")

// type simpleSimArgs = {
//   virusCount: number
//   birthProb: number
//   clearProb: number
//   maxPop: number
//   repetitions: number
// }

export function simpleSimulation({
  virusCount,
  birthProb,
  clearProb,
  maxPop,
  repetitions,
}) {
  function updatePatientGetVirusCount(patient) {
    return [patient.updatePatient(), patient.getVirusCount()]
  }

  const viruses = createVirusPopulation({ virusCount, birthProb, clearProb })
  const patient = createPatient(viruses, maxPop)
  const listOfUndefined = [...Array(repetitions)]
  // mapAccum is like a combination of map and reduce.
  // The accumulating parameter part is the patient object and the function is patient.update()
  // The map function (mapPatient) records the virus counts to the empty list by calling patient.getVirusCount()
  // Returns a tuple of the final state of the patient and the array of virus counts.
  const [, virusCounts] = mapAccum(
    updatePatientGetVirusCount,
    patient,
    listOfUndefined
  )
  return virusCounts
}

exports.handler = async function () {
  return {
    statusCode: 200,
    body: "yeah",
  }
}
