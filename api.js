const express = require('express')
const bearerToken = require('express-bearer-token');
const bodyParser = require("body-parser");
const app = express()
const PORT = process.env.PORT || 3000

const db = require('./db/db.js');
 

app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World! Visit <a href="/team">/team</a> for team members'))

const controllers = {
   users: require('./apis/ctrlUsers.js'),
   exams: require('./apis/ctrlExams.js'),
   tasks: require('./apis/ctrlTasks.js'),
   submissions: require('./apis/ctrlSubmissions.js'),
   reviews: require('./apis/ctrlReviews.js')
}

app.get('/v1/users', controllers.users.ctrlUsersGET);
app.post('/v1/users', controllers.users.ctrlUsersPOST);

app.get('/v1/exams', controllers.exams.ctrlExamsGET);
app.post('/v1/exams', controllers.exams.ctrlExamsPOST);

app.get('/v1/exams/:id', controllers.exams.ctrlExamGET);
app.put('/v1/exams/:id', controllers.exams.ctrlExamPUT);
app.delete('/v1/exams/:id', controllers.exams.ctrlExamDELETE);


app.get('/v1/submissions', controllers.submissions.ctrlSubmissionsGET);
app.post('/v1/submissions', controllers.submissions.ctrlSubmissionsPOST);

app.get('/v1/submissions/:id',controllers.submissions.ctrlSubmissionGET);

app.put('/v1/submissions/:id/reviewer',controllers.submissions.ctrlSubmissionPUT);

let httpServer = app.listen(PORT, () => console.log('Example app listening on port:'+ PORT))

module.exports = {
   app,
   httpServer
};