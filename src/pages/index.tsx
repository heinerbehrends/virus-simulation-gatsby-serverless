import React from "react"
import SimplePlot from "../components/simplePlot"
import { simpleSimulation } from "../simpleSim/simpleSim"

export default function Home() {
  const virusCounts = simpleSimulation({
    virusCount: 100,
    birthProb: 0.1,
    clearProb: 0.05,
    maxPop: 1000,
    repetitions: 300,
  })
  return <SimplePlot data={virusCounts} />
}
