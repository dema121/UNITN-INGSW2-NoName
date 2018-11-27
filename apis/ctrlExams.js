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
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    if (!checkParamRequired(req.body.name, "name", res)) return;
    if (!checkParamRequired(req.body.taskNumbers, "taskNumbers", res)) return;
    
    let newExam = {
        name: req.body.name,
        description: req.body.description,
        createdBy: currentUser.id,
        deadline: req.body.deadline,
        taskNumbers: req.body.taskNumbers,
        teacherassistants: [],
        tasks: [],
        members: [],
        visible: false
    }
    
    newExam = db.DAOexams.add(newExam);

    res.status(201).json(newExam);
};

const ctrlExamGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }

    let exam = db.DAOexams.findById(req.params.id);
    if (exam.createdBy != currentUser.id && !exam.teacherassistants.includes(currentUser.id) && !exam.members.includes(currentUser.id)) {
        res.status(403).json("Not authorized to view this item");
        return;
    }
    res.status(200).json(exam);
};


function checkParamRequired(paramValue, paramName, response) {
    if (!paramValue) {
        response.status(400).json(paramName + " is required");
        return false;
    }
    return true;
}



module.exports = {
    ctrlExamsGET,
    ctrlExamsPOST,
    ctrlExamGET
};