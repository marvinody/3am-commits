import firebase from '../firebase';
const LOAD_PICS = 'LOAD_PICS'

let lastSnapshot = null

const getSnapshot = () => {
  const db = firebase.firestore();
  const commitsRef = db.collection('commits');
  if (lastSnapshot === null) {
    return commitsRef
      .orderBy('date_committed', 'desc')
      .orderBy('git_id')
      .limit(20)
      .get()
  } else {
    const last = lastSnapshot.docs[lastSnapshot.docs.length - 1].data()
    return commitsRef
      .orderBy('date_committed', 'desc')
      .orderBy('git_id')
      .startAfter(last.date_committed, last.git_id)
      .limit(20)
      .get()
  }
}

export const getCommits = () => async dispatch => {

  const snapshot = await getSnapshot()
  let commits = []
  snapshot.forEach(doc =>
    commits = [...commits, doc.data()]
  )
  dispatch({
    type: LOAD_PICS,
    commits,
  })
  lastSnapshot = snapshot
}

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PICS:
      return [...state, ...action.commits]
    default:
      return state
  }
}
