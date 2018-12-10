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
    //TODO: 403 response (not authorized to do this action)
    let submissions=db.DAOsubmissions.findSubmissions(req.query.taskId,req.query.userId);    
    if(submissions.length==0){
        res.status(404).json('Submission not found');
        return;
    }
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
    //TODO: 403 response not authorized to do this action
    
    let task=db.DAOtasks.findByExamId(req.body.taskId);
    if(!task){
        res.status(404).json("task not found");
        return;
    }
    let exam=db.DAOexams.findById(task.examId);
    //403 User not assigned to the current exam/task
    /*
    let newUser = (exam.members.filter(newUser => exam.members == currentUser.id)[0]);
    if(!newUser){
        res.status(403).json("User not assigned to the current exam/task");
        return;
    }
    */

    //TODO:403 deadline reached
    /*if(exam.deadline<Date.now()/1000 | 0){
        res.status(403).json("Deadline reached");
        return;
    }*/

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
const ctrlSubmissionReviewerPUT = function(req,res){
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
    //TODO: 403 response
    /*let task=db.DAOtasks.findByExamId(submission.taskId);
    let exam=db.DAOexams.findById(task.examId);
    let newUser = exam.teacherassistants.filter(exam => exam.teacherassistants == currentUser.id)[0]; 
    if((!newUser)&&(currentUser.id!=exam.createdBy)){
        res.status(403).json("Not authorized to do this action");
        return;
    }*/
    
    submission.peerReviewUserId=req.body.userId;

    res.status(200).json(submission);
}
// /v1/submissions/subId/mark PUT
const ctrlSubmissionMarkPUT = function(req,res){
    let currentUser = db.DAOusers.findByToken(req.token);
    if(!currentUser){
        res.status(401).json('User not logged in');
        return;
    }
    if(!req.body.subId){
        res.status(400).json("subId required");
        return;        
    }
    if(!req.body.mark){
        res.status(400).json("mark required");
        return;        
    }
    let submission=db.DAOsubmissions.findById(req.params.id);
    if(!submission){
        res.status(404).json('Submission not found');
        return;
    }
    if((req.body.mark<0)||(req.body.mark>31)){
        res.status(400).json('Bad request - mark cannot be applied');
        return;
    }
    submission.mark=req.body.mark;
    res.status(200).json(submission);
}

module.exports = {
    ctrlSubmissionsGET,
    ctrlSubmissionsPOST,
    ctrlSubmissionGET,
    ctrlSubmissionReviewerPUT,
    ctrlSubmissionMarkPUT
};