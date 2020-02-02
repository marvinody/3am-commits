import React from 'react'
import { Line } from 'react-chartjs-2'
import { fuck } from './colors'

const LineWrapper = ({ analytics, hours }) => {
  return (
    <Line
      data={{
        labels: hours,
        datasets: [{
          label: 'Fuck',
          data: analytics[0].data[0].cursesOnHour,
          fill: false,
          borderColor: fuck.borderColor,
          borderWidth: 1
        }]
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
