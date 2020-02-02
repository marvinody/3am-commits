import React from 'react'
import { Bar } from 'react-chartjs-2'
import { colors, fontSizes } from './config'
import { capitalize } from './utils'

const engDays = () => {
  return 'Sun Mon Tues Wed Thurs Fri Sat'.split(' ')
}

const BarWrapper = ({ analytics }) => {
  const days = engDays()
  return (
    <div className='chart'>
      <Bar
        data={{
          labels: days,
          datasets: analytics[0].data.map(data => ({
            label: capitalize(data.curse),
            data: data.cursesOnDay,
            fill: true,
            borderColor: colors[data.curse].color,
            borderWidth: 1,
            backgroundColor: colors[data.curse].bg
          }))
        }}
        options={{
          title: {
            display: true,
            text: "Curses Per Day",
            fontSize: fontSizes.title,
          },
          scales: {
            xAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'Weekday',
                fontSize: fontSizes.xAxes,
              }
            }],
            yAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'Count',
                fontSize: fontSizes.yAxes,
              }
            }]
          }
        }}>
      </Bar>
    </div>
  )
}

export default BarWrapper
