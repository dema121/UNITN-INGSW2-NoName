const request = require('supertest');
const app = require('../api').app;

const authTokenTest = "fakeToken123";
const existingExamID = '1';
const notExistingExamID = '-1';

/**
 * TEST IF LOGGED IN
 */
test('GET /tasks should return 401 without token', (done) => {
    request(app)
        .get('/v1/tasks/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});

// TEST WITH LOGIN WITHOUT EXAMID
test('GET /tasks should return 400 with token without examid', (done) => {
    request(app)
        .get('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
// TEST WITH LOGIN & EXAMID ESISTENTE
test('GET /tasks should return 200 with token', (done) => {
    request(app)
        .get('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .query({ examId: existingExamID })
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});

// TODO: TEST WITH LOGIN & EXAMID INESISTENTE

//Test inserimento task con tutti i campi e il token
test('POST /tasks should return 201 with all the fields & the token', (done) => {
    request(app)
        .post('/v1/tasks/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .body({ examId: existingExamID })
        .body({ text: 'aa' })
        .body({ description: 'aaa' })
        .body({ type: 'single' })
        .body({ defaultAnswers: ['a', 'b'] })
        .body({ rightAnswers: 'a' })
        .body({ peerReview: false })
        .body({ deadline: -1 })
        .body({ reviewDeadline: -1 })
        .expect(201)
        .end((err, res) => {
            done(err);
        });
});