import React from 'react'
import { Line } from 'react-chartjs-2'
import { colors, fontSizes } from './config'
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
    <div className='chart'>
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
          title: {
            display: true,
            text: 'Curses Per Hour',
            fontSize: fontSizes.title,
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Count',
                fontSize: fontSizes.yAxes,
              },
            }],
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time',
                fontSize: fontSizes.xAxes,
              }
            }]
          }
        }}>
      </Line>
    </div>
  )
}

export default LineWrapper
