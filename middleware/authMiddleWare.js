const firebase = require ("../firebase");

const authMiddleWare = (req, res, next) => {
    const { token } = req.headers;
    if(!token) {
        return res.status(404).json({
            message: "Provide a Token"
        });
    }
    return firebase.auth().verifyIdToken(token)
    .then(() => next())
    .catch((err) => res.status(401).json({
        message: err
    }));
};

module.exports = authMiddleWare;