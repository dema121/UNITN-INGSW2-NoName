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
    if(!user) {
        res.status(401).json('Inexistent User');
        return;
    }
    user.accessToken = token();
    db.DAOusers.updateUser(user);
    user.password = undefined;
    res.status(200).json(user);
}

const ctrlProfileLogoutPOST = function(req, res){
    let user = db.DAOusers.findByToken(req.token);
    if(!user){
        res.status(401).json('User not logged in');
        return;
    }
    user.accessToken = undefined;
    db.DAOusers.updateUser(user);
    res.status(200).json('user logout successfully');
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

module.exports = {
    ctrlProfileGET,
    ctrlProfileLoginPOST,
    ctrlProfileLogoutPOST
};