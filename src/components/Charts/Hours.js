import React from 'react'
import { Line } from 'react-chartjs-2'
import colors from './colors'
import { capitalize } from './utils'

const engHours = () => {
  return Array(24).fill(0)
    .map((_, i) => i)
    .map(h => {
      if (h === 0) return '12 AM'
      if (h === 12) return '12 PM'
      if (h < 12) return `${h} AM`
      return `${h - 12} PM`
    })
}

const LineWrapper = ({ analytics }) => {
  const hours = engHours()
  return (
    <Line
      data={{
        labels: hours,
        datasets: analytics[0].data.map(data => ({
          label: capitalize(data.curse),
          data: data.cursesOnHour,
          fill: false,
          borderColor: colors[data.curse].color,
          borderWidth: 1,
        }))
      }}
      options={{
        scales: {
          yAxes: [{
            scaleLabel: 'Count',
            display: true,
          }],
          xAxes: [{
            display: true,
            scaleLabel: 'Time'
          }]
        }
      }}>

    </Line>
  )
}

export default LineWrapper
