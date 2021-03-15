import React from "react"
import { render, screen } from "@testing-library/react"
import SimplePlot from "./simplePlot"
import { simpleSimulation } from "../simpleSim/simpleSim"
import ResizeObserver from "../__mocks__/ResizeObserver"

describe("simplePlot component", () => {
  test("renders a plot", () => {
    // add the mock ResizeObserver to the window object
    window.ResizeObserver = ResizeObserver
    const virusCounts = simpleSimulation({
      virusCount: 100,
      birthProb: 0.1,
      clearProb: 0.05,
      maxPop: 1000,
      repetitions: 300,
    })
    const { container } = render(<SimplePlot data={virusCounts} />)
    const wrapper = container.querySelector(".recharts-wrapper")
    expect(wrapper).toBeTruthy()
  })
})
