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
const ctrlProfileLoginPOST = function(req, res){
    
    if (!checkParamRequired(req.body.email, "email", res)) return;
    if (!checkParamRequired(req.body.password, "password", res)) return;
    
    let user = db.DAOusers.findByMailPassword(req.body.email, req.body.password);
    if(isEmpty(user, res)) return;
    user.token = token();
    res.status(200).json(currentUser);
}

var rand = function() {
    return Math.random().toString(36).substr(2);
};

var token = function() {
    return rand() + rand();
};

function checkParamRequired(paramValue, paramName, response) {
    if (!paramValue) {
        response.status(400).json(paramName + " is required");
        return false;
    }
    return true;
}
function isEmpty(user, response) {
    for(var key in user) {
        if(user.hasOwnProperty(key))
            return false;
    }
    response.status(401).json("inexistent user");
    return true;
}

module.exports = {
    ctrlProfileGET,
    ctrlProfileLoginPOST
};