const admin = require("firebase-admin");

const serviceAccount = require("../admin-firebase-creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.databaseURL
});
export default admin
