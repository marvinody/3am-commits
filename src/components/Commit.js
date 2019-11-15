import React from 'react'
import '../css/Commit.css'
export default function Commit(props) {
  return (
    <div className='commit'>
      <div className='author'>
        <div className='avatar'>
          <a href={props.author.profile_url}>
            <img src={props.author.avatar_url}></img>
          </a>
        </div>
        <div className='link'>
          <a href={props.author.profile_url}>{props.author.login}</a>
        </div>
      </div>
      <div className='message'>
        <a href={props.html_url}>{props.message}</a>
      </div>
    </div>
  )
}
