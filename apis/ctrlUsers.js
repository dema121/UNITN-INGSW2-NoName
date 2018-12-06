const db = require('../db/db.js');

const ctrlUsersGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token) ;
    if (!currentUser)
    {
        res.status(401).json("user not logged in");
        return;
    }
    let users;
    if (!req.query.email && !req.query.text)
    {
        users = db.DAOusers.all();
    } 
    else 
    {
        users = db.DAOusers.findByFilters(req.query.email, req.query.text);
    }
    res.status(200).json(users);
    return;
};

const ctrlUserGETbyId = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token) ;
    if (!currentUser)
    {
        res.status(401).json("user not logged in");
        return;
    }
    let user;
    user = db.DAOusers.findById(req.params.id);
    if (!user){
        res.status(404).json("user not found");
        return;
    }
    user.password = undefined;
    res.status(200).json(user);
    return;
}

const ctrlUsersPOST = function(req, res) {
    if ((!req.body.username) || (!req.body.name) || (!req.body.surname) || (!req.body.email) || (!req.body.password))
    {
        res.status(400).json("missing parameters");
        return ;
    }
    let newUser = {
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
    }
    newUser = db.DAOusers.add(newUser);
    res.status(201).json(newUser);
    return;
};

const ctrlUserDELETEbyId = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser)
    {
        res.status(401).json("user not logged in");
        return;
    }
    let user;
    user = db.DAOusers.findById(req.params.id);
    if (!user){
        res.status(404).json("user not found");
        return;
    }
    if (currentUser.id != user.id)
    {
        res.status(403).json("not authorized to do this action");
        return;
    }
    let state = db.DAOusers.delete(user.id);
    if (state)
    {
        res.status(200).json('user deleted');
        return;
    }
    res.status(500).json('internal error');
    return;
}



module.exports = {
    ctrlUsersGET,
    ctrlUsersPOST,
    ctrlUserGETbyId,
    ctrlUserDELETEbyId
};