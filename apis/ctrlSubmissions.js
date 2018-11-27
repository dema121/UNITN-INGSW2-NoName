const db = require('../db/db.js');

const ctrlSubmissionsGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    if (!req.query.taskId) {
        res.status(400).json("taskId required");
        return;
    }
    //TODO: 403 response
    let submissions=db.DAOsubmissions.findSubmissions(req.query.taskId,req.query.userId);
    res.status(200).json(submissions);
};

const ctrlSubmissionsPOST = function(req,res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    if (!req.body.taskId){
        res.status(400).json("taskId required");
        return;
    }
    /*TODO
    if(!db.DAOsubmissions.findTask(req.body.taskId)){
        res.status(403).json("Not authorized to do this action, deadline reached or user not assigned to the current exam/task");
    }
    */
    //TODO: 403 response
    let newSubmission={
        taskId:req.body.taskId,
        userId:currentUser.id,
        date: Date.now()/1000 | 0,
        peerReviewUserId:"",
        answerOpen:req.body.answerOpen,
        answerChoices:req.body.answerChoices
    }
    newSubmission=db.DAOsubmissions.add(newSubmission);
    res.status(201).json(newSubmission);
};

const ctrlSubmissionGET = function(req,res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    //console.log(req.params);
    if (!req.params.id) {
        res.status(400).json("id required")
    }
    let submission=db.DAOsubmissions.findById(req.params.id);
    
    //TODO: 403 response
    res.status(200).json(submission);
}


module.exports = {
    ctrlSubmissionsGET,
    ctrlSubmissionsPOST,
    ctrlSubmissionGET
};