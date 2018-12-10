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
   reviews: require('./apis/ctrlReviews.js'),
   profile: require('./apis/ctrlProfile.js'),
   teacherassistans: require('./apis/ctrlTeacherassistants.js')
}

app.get('/v1/users', controllers.users.ctrlUsersGET);
app.get('/v1/users/:id', controllers.users.ctrlUserGETbyId);
app.post('/v1/users', controllers.users.ctrlUsersPOST);
app.delete('/v1/users/:id', controllers.users.ctrlUserDELETEbyId);
app.put('/v1/users/:id', controllers.users.ctrlUserPUT);

app.get('/v1/exams', controllers.exams.ctrlExamsGET);
app.post('/v1/exams', controllers.exams.ctrlExamsPOST);
app.get('/v1/exams/:id', controllers.exams.ctrlExamGET);
app.put('/v1/exams/:id', controllers.exams.ctrlExamPUT);
app.delete('/v1/exams/:id', controllers.exams.ctrlExamDELETE);

app.get('/v1/tasks', controllers.tasks.ctrlTasksGET);
app.post('/v1/tasks', controllers.tasks.ctrlTasksPOST);
app.get('/v1/tasks/:taskID', controllers.tasks.ctrlTaskGET);
app.put('/v1/tasks/:taskID', controllers.tasks.ctrlTaskPUT);
app.delete('/v1/tasks/:taskID', controllers.tasks.ctrlTaskDELETE);

app.get('/v1/profile',controllers.profile.ctrlProfileGET);
app.post('/v1/login',controllers.profile.ctrlProfileLoginPOST);

app.get('/v1/submissions', controllers.submissions.ctrlSubmissionsGET);
app.post('/v1/submissions', controllers.submissions.ctrlSubmissionsPOST);
app.get('/v1/submissions/:id',controllers.submissions.ctrlSubmissionGET);
app.put('/v1/submissions/:id/reviewer',controllers.submissions.ctrlSubmissionReviewerPUT);
app.put('/v1/submissions/:id/mark',controllers.submissions.ctrlSubmissionMarkPUT);

app.get('/v1/teacherassistants', controllers.teacherassistans.ctrlTasGET);
app.post('/v1/teacherassistants', controllers.teacherassistans.ctrlTasPOST);
app.delete('/v1/teacherassistants/:id', controllers.teacherassistans.ctrlTaDELETE);

if (process.env.NODE_ENV !== 'test') {
   app.listen(PORT, () => console.log('Example app listening on port:'+ PORT))
}

module.exports = {
   app
};