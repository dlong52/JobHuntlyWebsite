const admin = require("firebase-admin");
const serviceAccount = require("./jobhuntly-a8600-firebase-adminsdk-53hy3-7e13f6809e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
