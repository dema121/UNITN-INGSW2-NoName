const db = require('../db/db.js');


const ctrlProfileGET = function(req, res){
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    currentUser.password = undefined;
    res.status(200).json(currentUser);
}

module.exports = {
    ctrlProfileGET
};