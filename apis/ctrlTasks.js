const db = require('../db/db.js');

const ctrlTasksGET = function(req, res) {
    //controllo se l'utente è loggato
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    //parametri richiesti
    if(!checkParamRequired(req.query.examId, "exam id", res)) return;

    //TODO: controllare se examID esiste nel db
    let exam = db.DAOexams.findById(req.query.examId);
    if( !exam ) {
        res.status(404).json("Exam doesn't exist");
        return;
    }

    //prendo le tasks e le restituisco
    let tasks = db.DAOtasks.findByExamId(req.query.examId);
    res.status(200).json(tasks);
};

const ctrlTasksPOST = function(req, res) {
    //controllo se l'utente è loggato
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    //parametri richiesti
    if(!checkParamRequired(req.body.examId, "exam id", res)) return;
    if(!checkParamRequired(req.body.text, "text", res)) return;
    if(!checkParamRequired(req.body.type, "type", res)) return;
    if(!checkParamRequired(req.body.peerReview, "peer review", res)) return;

    //creo la nuova task
    let newTask = {
        "examId":req.body.examId,
        "text":req.body.text,
        "description":req.body.description,
        "type":req.body.type,
        "defaultAnswers":req.body.defaultAnswers,
        "rightAnswers":req.body.rightAnswers,
        "peerReview":req.body.peerReview,
        "deadline":req.body.deadline,
        "reviewDeadline":req.body.reviewDeadline
    }

    //la inserisco nel db
    newTask = db.DAOtasks.add(newTask);
    res.status(201).json(newExam);
};

const ctrlTaskGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
}

const ctrlTaskPUT = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
}

const ctrlTaskDELETE = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
}


function checkParamRequired(paramValue, paramName, response) {
    if (!paramValue) {
        response.status(400).json(paramName + " is required");
        return false;
    }
    return true;
}





module.exports = {
    ctrlTasksGET,
    ctrlTasksPOST,
    ctrlTaskGET,
    ctrlTaskPUT,
    ctrlTaskDELETE
};