import { DateTime } from 'luxon'
import React from 'react'
import './Commit.css'
export default function Commit(props) {
  const dt = DateTime.fromISO(props.date_committed)
  return (
    <div className='commit'>
      <div className='author'>
        <div className='avatar'>
          <a href={props.author.profile_url}>
            <img src={props.author.avatar_url}></img>
          </a>
        </div>
        <div className='info'>
          <div className='link'>
            <a href={props.author.profile_url}>{props.author.login}</a>
          </div>
          <div className='commit-time'>
            <span title={dt.toLocaleString()}>{dt.toRelative()}</span>
          </div>
        </div>
      </div>
      <div className='message'>
        <a href={props.html_url}>{props.message}</a>
      </div>
    </div>
  )
}
