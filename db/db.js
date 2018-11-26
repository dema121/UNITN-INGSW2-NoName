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
        
    },
    findByToken(token) {        
        return db.users.filter(user => user.accessToken == token)[0];
    },
    findById(userId) {        
        return db.users.filter(user => user.id == userId)[0];
    },
    all() {
        return db.users;
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


module.exports = {
    DAOusers,
    DAOexams,
    DAOtasks,
    DAOsubmissions,
    DAOreviews
};