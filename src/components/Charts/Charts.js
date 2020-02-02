import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAnalytics } from '../../store';
import './Charts.css'
import Hours from './Hours'
import Days from './Days'



const Charts = ({ getAnalytics, analytics }) => {
  useEffect(() => {
    getAnalytics()
  }, [getAnalytics])
  console.log({ analytics })
  if (analytics.length === 0) {
    return (<div>
      Loading...
    </div>)
  }
  return (
    <div className='analytics'>
      <Hours analytics={analytics}></Hours>
      <Days analytics={analytics}></Days>
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
