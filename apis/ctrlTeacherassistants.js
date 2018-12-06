const db = require('../db/db.js');

const ctrlTasGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    if (!checkParamRequired(req.query.examId, "examId", res)) return;
    let exam = db.DAOexams.findById(req.query.examId);
    if (!exam) {
        res.status(404).json('Exam not found');
        return;
    }

    let teacherassistans = db.DAOusers.findByIds(exam.teacherassistants);
    res.status(200).json(teacherassistans);
};

const ctrlTasPOST = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    if (!checkParamRequired(req.body.userId, "userId", res)) return;
    if (!checkParamRequired(req.body.examId, "examId", res)) return;
    
    let exam = db.DAOexams.findById(req.body.examId);
    if (!exam) {
        res.status(404).json('Exam not found');
        return;
    }
    let user = db.DAOusers.findById(req.body.userId);
    if (!user) {
        res.status(404).json('User not found');
        return;
    }
    
    if (!exam.teacherassistants.includes(user.id)) {
        exam.teacherassistants.push(user.id);
    }
    exam = db.DAOexams.update(exam);

    res.status(201).json(exam);
};

const ctrlTaDELETE = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    if (!checkParamRequired(req.params.id, "taId", res)) return;
    if (!checkParamRequired(req.query.examId, "examId", res)) return;

    let exam = db.DAOexams.findById(req.query.examId);
    if (!exam) {
        res.status(404).json('Exam not found');
        return;
    }
    let ta = db.DAOusers.findById(req.params.id);
    if (!ta || !exam.teacherassistants.includes(ta.id)) {
        res.status(404).json('Teacher assistant not found');
        return;
    }

    if (exam.createdBy != currentUser.id && !exam.teacherassistants.includes(currentUser.id)) {
        res.status(403).json("Not authorized to view this item");
        return;
    }

    exam.teacherassistants.splice(exam.teacherassistants.indexOf(ta.id),1);
    exam = db.DAOexams.update(exam);

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
    ctrlTasGET,
    ctrlTasPOST,
    ctrlTaDELETE
};