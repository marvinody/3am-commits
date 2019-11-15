import React, { Component } from 'react';
import firebase from './firebase';
export default class stuff extends Component {
  constructor() {
    super()
    this.state = {
      commits: []
    }
  }
  async componentDidMount() {
    try {
      const db = firebase.firestore();
      const commitsRef = db.collection('commits');
      const snapshot = await commitsRef.limit(20).get()
      snapshot.forEach(doc => {
        this.setState((prev) => ({
          commits: [...prev.commits, doc.data()]
        }))
      })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <div>
        {this.state.commits.map(commit => (<div>
          <a href={commit.html_url}>{commit.message}</a>
        </div>))}
      </div>
    )
  }
}
