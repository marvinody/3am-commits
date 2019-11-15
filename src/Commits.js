import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Commit from './Commit';
import { getCommits } from './store';
const Commits = ({ commits, getCommits }) => {
  useEffect(() => {
    getCommits()
  }, [getCommits])
  return (
    <div className='commits'>
      {commits.map(commit => (<Commit {...commit} />))}
    </div>
  )
}

const mapState = state => ({
  commits: state.commits,
})

const mapDispatch = dispatch => ({
  getCommits: () => dispatch(getCommits()),
})

export default connect(mapState, mapDispatch)(Commits)
