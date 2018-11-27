const db = require('../db/db.js');

const ctrlSubmissionsGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    if(!req.query.taskId){
        res.status(400).json("taskId required");
    }
    //TODO: 403 response
    let submissions=db.DAOsubmissions.findSubmissions(req.query.taskId,req.query.userId);
    res.status(200).json(submissions);
}




module.exports = {
    ctrlSubmissionsGET
};