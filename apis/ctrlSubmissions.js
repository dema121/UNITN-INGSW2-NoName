const db = require('../db/db.js');

// /v1/submissions GET
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

// /v1/submissions POST
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

// /v1/submissions/subId GET
const ctrlSubmissionGET = function(req,res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    //console.log(req.params);
    if (!req.params.id) {
        res.status(400).json("id required");
        return;
    }
    let submission=db.DAOsubmissions.findById(req.params.id);
    if(!submission){
        res.status(404).json('Submission not found');
        return;
    }
    
    //TODO: 403 response
    res.status(200).json(submission);
}

// /v1/submissions/subId/reviewer PUT
const ctrlSubmissionPUT = function(req,res){
    let currentUser = db.DAOusers.findByToken(req.token);
    if(!currentUser){
        res.status(401).json('User not logged in');
        return;
    }
    if (!req.params.id) {
        res.status(400).json("id required");
        return;
    }
    if(!req.body.userId){
        res.status(400).json("subId required");
        return;        
    }
    let submission=db.DAOsubmissions.findById(req.params.id);
    if(!submission){
        res.status(404).json('Submission not found');
        return;
    }
    let user=db.DAOusers.findById(req.body.userId);
    if(!user){
        res.status(404).json('User not found');
        return;
    }
    submission.peerReviewUserId=req.body.userId;

    res.status(200).json(submission);
}
// /v1/submissions/subId/mark PUT
// /v1/reviews GET
// /v1/reviews POST


module.exports = {
    ctrlSubmissionsGET,
    ctrlSubmissionsPOST,
    ctrlSubmissionGET,
    ctrlSubmissionPUT
};