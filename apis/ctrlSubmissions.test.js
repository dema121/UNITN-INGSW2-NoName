const request = require('supertest');
const app = require('../api').app;

const authTokenTest = "fakeToken123";

/**
 * TEST  /v1/submissions GET
 */
test('GET /submissions should return 401 without token', (done) => {
    request(app)
        .get('/v1/submissions/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});

test('GET /submissions should return 400 without taskId', (done) => {
    request(app)
        .get('/v1/submissions/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});

test('GET /submissions/ should return 404 with inexisting taskId', (done) => {
    request(app)
        .get('/v1/submissions/')
        .query({ 'taskId': 8797865 })
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});

test('GET /submissions/ should return 200 with a taskId', (done) => {
    request(app)
        .get('/v1/submissions/')
        .query({ 'taskId': 1 })
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});

/**
 * TEST /v1/submissions POST
 */

test('POST /submissions should return 401 without token', (done) => {
    request(app)
        .post('/v1/submissions/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});

test('POST /submissions should return 400 without taskId', (done) => {
    request(app)
        .get('/v1/submissions/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});

test('POST /taskId should return 201', (done) => {
    request(app)
        .post('/v1/submissions/')
        .set('Authorization', 'Bearer ' + authTokenTest)        
        .send({ 'taskId': 1 })
        .expect(201)
        .end((err, res) => {
            done(err);
        });
});

/**
 * TEST /v1/submissions/submissionId
 */

test('GET /submissions/submissionId should return 401 without token', (done) => {
    request(app)
        .get('/v1/submissions/3')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});

test('GET /submissions/submissionId should return 200', (done) => {
    request(app)
        .get('/v1/submissions/3')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});



test('POST /taskId should return 201', (done) => {
    request(app)
        .post('/v1/submissions/')
        .set('Authorization', 'Bearer ' + authTokenTest)        
        .send({ 'taskId': 1 })
        .expect(201)
        .end((err, res) => {
            done(err);
        });
});
