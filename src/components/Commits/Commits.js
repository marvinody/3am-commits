import './Commits.css';

import _ from 'lodash';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';

import { getCommits } from '../../store';
import Commit from './Commit';
import Loading from '../Loading'

const Commits = ({ commits, getCommits }) => {
  useEffect(() => {
    getCommits()
  }, [getCommits])
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={getCommits}
      hasMore={true}
      loader={<Loading />}
      initialLoad={false}
      className='infinite-scroll'
    >

      <div className='commits'>
        {commits.map(commit => (<Commit {...commit} key={commit.git_id} />))}
      </div>
    </InfiniteScroll>
  )
}

const mapState = state => ({
  commits: state.commits,
})

const mapDispatch = dispatch => ({
  getCommits: _.debounce((page) => {
    dispatch(getCommits())
  }, 250)
})


export default connect(mapState, mapDispatch)(Commits)
