const db = {
    users: [],
    exams: [],
    tasks: [],
    submissions: [],
    reviews: []
};

db.users = require("./basicData/dbUsers.json");
db.exams = require("./basicData/dbExams.json");
db.tasks = require("./basicData/dbTasks.json");
db.submissions = require("./basicData/dbSubmissions.json");
db.reviews = require("./basicData/dbReviews.json");

const DAOusers = {
    add(user) {
        user.id = uuid();
        db.users.push(user);
        return user;
    },
    findByToken(token) {        
        return db.users.filter(user => user.accessToken == token)[0];
    },
    findById(userId) {        
        return db.users.filter(user => user.id == userId)[0];
    },
    delete(userId){
        let user = this.findById(userId);
        if (!user){
            return false;
        }
        let index = db.users.indexOf(user);
        db.users.splice(index, 1);
        user = this.findById(userId);
        if (!user){
            return true;
        }
        return false ;
    },
    all() {
        return db.users;
    },
    findByFilters(email, text){
        let users ;
        if (!email)
        {
            users = db.users;
        } else 
        {
            users = db.users.filter(user => (user.email.indexOf(email)) >= 0 ) ;
        }
        if (text)
        {
            users = users.filter(user => (user.name.indexOf(text)) >= 0 || user.surname.indexOf(text) >= 0) ;
        }
        return users ;
    }
};

const DAOexams = {    
    add(user) {
        
    },
    findById(examId) {        
        return db.exams.filter(exam => exam.id == examId)[0];
    },
    findByUserId(examId, text) {
        let exams = db.exams.filter(exam => exam.createdBy == examId || exam.teacherassistants.indexOf(userId) >= 0 || exam.members.indexOf(userId));
        if (text) {
            //TODO: filter
            //exams.filter(exam => exam.name == text)
        }
        return exams;
    },
    all() {
        return db.exams;
    }
};

const DAOtasks = {
    
};

const DAOsubmissions = {

};

const DAOreviews = {
    
};


function uuid(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

module.exports = {
    DAOusers,
    DAOexams,
    DAOtasks,
    DAOsubmissions,
    DAOreviews
};