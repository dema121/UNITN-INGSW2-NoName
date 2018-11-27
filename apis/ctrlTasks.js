const db = require('../db/db.js');

const ctrlTasksGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    if(!checkParamRequired(req.query.examId, "exam id", res)) return;

    let tasks = db.DAOtasks.findByExamId(req.query.examId);
    res.status(200).json(tasks);
};

const ctrlTasksPOST = function(req, res) {
    
};


function checkParamRequired(paramValue, paramName, response) {
    if (!paramValue) {
        response.status(400).json(paramName + " is required");
        return false;
    }
    return true;
}





module.exports = {
    ctrlTasksGET,
    ctrlTasksPOST
};