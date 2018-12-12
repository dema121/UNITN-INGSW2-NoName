const request = require('supertest');
const app = require('../api').app;

const authTokenTest = "fakeToken123";
const existingExamID = '1';
const notExistingExamID = '-1';

//TEST IF LOGGED IN
test('GET /tasks should return 401 without token', (done) => {
    request(app)
        .get('/v1/tasks/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});



//TEST TASKS GET
// test with login & without examId
test('GET /tasks should return 400 with token without examid', (done) => {
    request(app)
        .get('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
// test with login &  existing examId
test('GET /tasks should return 200 with token with existing examId', (done) => {
    request(app)
        .get('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .query({ examId: existingExamID })
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});
// test with login & not existing examId
test('GET /tasks should return 404 with token with not existing examId', (done) => {
    request(app)
        .get('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .query({ examId: notExistingExamID })
        .expect(404)
        .end((err, res) => {
            done(err);
        });
});



//TEST TASKS POST
//Test inserimento task con tutti i campi e il token
test('POST /tasks should return 201 with all the fields & the token', (done) => {
    let obj = {
        examId: 1,
        text: 'aa',
        description: 'aaa',
        type: 'single',
        defaultAnswers: ['a', 'b'],
        rightAnswers: 'a',
        peerReview: 'false',
        deadline: -1,
        reviewDeadline: -1
    }
    request(app)
        .post('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .send(obj)
        .expect(201)
        .end((err, res) => {
            done(err);
        });
});
//Test inserimento dei soli campi necessari e il token
test('POST /tasks should return 201 with all the fields & the token', (done) => {
    let obj = {
        examId: 1,
        text: 'aa',
        type: 'single',
        peerReview: 'false'
    }
    request(app)
        .post('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .send(obj)
        .expect(201)
        .end((err, res) => {
            done(err);
        });
});
//Test con solo il token
test('POST /tasks should return 400 without any field and with the token', (done) => {
    request(app)
        .post('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
//Test inserimento solo di alcuni campi
test('POST /tasks should return 400 with not all the necessary fields and with the token', (done) => {
    let obj = {
        type: 'single',
        peerReview: 'false'
    }
    request(app)
        .post('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .send(obj)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});



//TEST TASKS/ID GET
//Test get con id valido
test('GET /tasks/id should return 200 with token and existing id', (done) => {
    request(app)
        .get('/v1/tasks/1')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});
//Test get con id non valido
test('GET /tasks/id should return 404 with token and not existing id', (done) => {
    request(app)
        .get('/v1/tasks/-1')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(404)
        .end((err, res) => {
            done(err);
        });
});




