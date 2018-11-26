const db = require('../db/db.js');

const ctrlExamsGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    let searchTxt = req.query.text;
    let exams = db.DAOexams.findByUserId(currentUser.id, searchTxt);
    res.status(200).json(exams);
};

const ctrlExamsPOST = function(req, res) {
    
};



module.exports = {
    ctrlExamsGET,
    ctrlExamsPOST
};