import React from "react"

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Legend,
  CartesianGrid,
  Tooltip,
} from "recharts"

type plotPoint = {
  // the value of the x-axis
  name: string
  // the value of the y-axis
  value: number
}
type simplePlotProps = {
  data: number[]
}

function SimplePlot({ data }: simplePlotProps): JSX.Element {
  function createPlotData(listOfVirusCounts: number[]): plotPoint[] {
    return listOfVirusCounts.map((virusCount, index) => ({
      name: index.toString(),
      value: virusCount,
    }))
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height={480}>
        <LineChart
          width={730}
          height={250}
          data={createPlotData(data)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SimplePlot
