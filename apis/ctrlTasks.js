const db = require('../db/db.js');

//TODO: controllare tipo dei dati forniti

//restituisco i task di un esame
const ctrlTasksGET = function(req, res) {
    //controllo se l'utente è loggato
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    //parametri richiesti
    if(!checkParamRequired(req.query.examId, "exam id", res)) return;

    //controllo se examId esiste nel db
    let exam = db.DAOexams.findById(req.query.examId);
    if( !exam ) {
        res.status(404).json("Exam doesn't exist");
        return;
    }

    //prendo le tasks e le restituisco
    let tasks = db.DAOtasks.findByExamId(req.query.examId);
    res.status(200).json(tasks);
};


//inserisco un nuovo task
const ctrlTasksPOST = function(req, res) {
    //controllo se l'utente è loggato
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }

    //parametri richiesti
    if(!checkParamRequired(req.body.examId, "exam id", res)) return;
    if(!checkParamRequired(req.body.text, "text", res)) return;
    if(!checkParamRequired(req.body.type, "type", res)) return;
    if(!checkParamRequired(req.body.peerReview, "peer review", res)) return;

    //controllo che l'esame esista
    let exam = db.DAOexams.findById(req.body.examId);
    if( !exam ) {
        res.status(404).json("Exam not found");
        return;
    }

    //creo la nuova task
    let newTask = {
        "examId":req.body.examId,
        "text":req.body.text,
        "description":req.body.description,
        "type":req.body.type,
        "defaultAnswers":req.body.defaultAnswers,
        "rightAnswers":req.body.rightAnswers,
        "peerReview":req.body.peerReview,
        "deadline":req.body.deadline,
        "reviewDeadline":req.body.reviewDeadline
    }
    //la inserisco nel db
    db.DAOtasks.add(newTask);
    res.status(201).json(newTask);
};


//restituisco un task da un taskId
const ctrlTaskGET = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }

    //se la task non esiste mando l'errore
    let task = db.DAOtasks.findById(req.params.taskId);
    if( !task ) {
        res.status(404).json("Not existing task ID");
        return;
    }

    //se va tutto bene mando la task
    res.status(200).json(task);
}


//aggiorno un task da un taskId
const ctrlTaskPUT = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
    
    //se la task non esiste mando l'errore
    let task = db.DAOtasks.findById(req.params.taskId);
    if( !task ) {
        res.status(404).json("Task not found");
        return;
    }
    
    //TODO: controllo se l'utente è TA o proprietario

    if(req.body.examId) {
        //controllo che il nuovo esame esista
        let exam = db.DAOexams.findById(req.body.examId);
        if( !exam ) {
            res.status(404).json("Exam not found");
            return;
        } else {
            task.examId = req.body.exam;
        }
    }
    if(req.body.text) {
        task.text = req.body.text;
    }
    if(req.body.description) {
        task.description = req.body.description;
    }
    if(req.body.type) {
        task.type = req.body.type;
    }
    if(req.body.defaultAnswers) {
        task.defaultAnswers = req.body.defaultAnswers;
    }
    if(req.body.rightAnswers) {
        task.rightAnswers = req.body.rightAnswers;
    }
    if(req.body.peerReview) {
        task.peerReview = req.body.peerReview;
    }
    if(req.body.deadline) {
        task.deadline = req.body.deadline;
    }
    if(req.body.reviewDeadline) {
        task.reviewDeadline = req.body.reviewDeadline;
    }

    //se va tutto bene mando la task
    res.status(200).json(task);
}


//elimino un task da un taskId
const ctrlTaskDELETE = function(req, res) {
    let currentUser = db.DAOusers.findByToken(req.token);
    if (!currentUser) {
        res.status(401).json('User not logged in');
        return;
    }
}



function checkParamRequired(paramValue, paramName, response) {
    if (!paramValue) {
        response.status(400).json(paramName + " is required");
        return false;
    }
    return true;
}

function checkParamType(paramValue, requestType, paramName, response) {
    if (typeof(paramValue) != requestType) {
        response.status(400).json(paramName + " is of the wrong type");
        return false;
    }
    return true;
}





module.exports = {
    ctrlTasksGET,
    ctrlTasksPOST,
    ctrlTaskGET,
    ctrlTaskPUT,
    ctrlTaskDELETE
};