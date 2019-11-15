import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../css/Commits.css';
import { getCommits } from '../store';
import Commit from './Commit';
const Commits = ({ commits, getCommits }) => {
  useEffect(() => {
    getCommits()
  }, [getCommits])
  return (
    <div className='commits'>
      {commits.map(commit => (<Commit {...commit} key={commit.git_id} />))}
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
