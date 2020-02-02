import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux';
import { getAnalytics } from '../store';
import '../css/Charts.css'

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


const Charts = ({ getAnalytics, analytics }) => {
  useEffect(() => {
    getAnalytics()
  }, [getAnalytics])
  const hours = engHours()
  console.log({ analytics })
  if (analytics.length === 0) {
    return (<div>
      Loading...
    </div>)
  }
  return (
    <div className='analytics'>
      <Line
        data={{
          labels: hours,
          datasets: [{
            label: 'Fuck',
            data: analytics[0].data[0].cursesOnHour,
            fill: false,
            // backgroundColor:
            // [
            // 'rgba(221, 221, 221, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',
            //   'rgba(255, 206, 86, 0.2)',
            //   'rgba(75, 192, 192, 0.2)',
            //   'rgba(153, 102, 255, 0.2)',
            //   'rgba(255, 159, 64, 0.2)'
            // ],
            borderColor:
              'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)'
            // ],
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
    </div>
  );
}

const mapState = state => ({
  analytics: state.analytics
})

const mapDispatch = dispatch => ({
  getAnalytics: () => dispatch(getAnalytics())
})

export default connect(mapState, mapDispatch)(Charts);
