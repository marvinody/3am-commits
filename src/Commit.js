import React from 'react'
import './Commit.css'
export default function Commit(props) {
  return (
    <div className='commit'>
      <div className='author'>
        <a className='avatar' href={props.author.profile_url}>
          <img src={props.author.avatar_url}></img>
        </a>
        <a href={props.author.profile_url}>{props.author.login}</a>
      </div>
      <a href={props.html_url}>{props.message}</a>
    </div>
  )
}
