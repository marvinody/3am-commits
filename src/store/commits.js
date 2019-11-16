import firebase from '../firebase';
const LOAD_PICS = 'LOAD_PICS'


export const getCommits = () => async dispatch => {
  const db = firebase.firestore();
  const commitsRef = db.collection('commits');
  const snapshot = await commitsRef.orderBy('date_committed', 'desc').limit(20).get()
  let commits = []
  snapshot.forEach(doc =>
    commits = [...commits, doc.data()]
  )
  dispatch({
    type: LOAD_PICS,
    commits,
  })
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
