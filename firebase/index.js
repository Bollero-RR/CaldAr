const admin = require("firebase-admin");

const serviceAccount = require("../caldar-app.json");

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = firebaseApp;