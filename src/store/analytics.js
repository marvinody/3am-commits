import firebase from '../firebase';
const LOAD_ANALYTICS = 'LOAD_ANALYTICS'


const getSnapshot = () => {
  const db = firebase.firestore();
  const commitsRef = db.collection('analytics');
  return commitsRef
    .orderBy('date', 'desc')
    .limit(20)
    .get()
}

export const getAnalytics = () => async dispatch => {

  const snapshot = await getSnapshot()
  let analytics = []
  snapshot.forEach(doc =>
    analytics = [...analytics, doc.data()]
  )
  dispatch({
    type: LOAD_ANALYTICS,
    analytics,
  })
}

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ANALYTICS:
      return action.analytics
    default:
      return state
  }
}
