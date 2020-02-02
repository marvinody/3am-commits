import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAnalytics } from '../../store';
import './Charts.css'
import Line from './Line'
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
      <Line analytics={analytics} hours={hours}></Line>
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
