const request = require('supertest');
const app = require('../api').app;

const authTokenTest = "fakeToken123";

/**
 * TEST LOGGED IN
 */
test('GET /exams should return 401 without token', (done) => {
    request(app)
        .get('/v1/exams/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});
test('POST /exams should return 401 without token', (done) => {
    request(app)
        .post('/v1/exams/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});
test('GET /exams/{id} should return 401 without token', (done) => {
    request(app)
        .get('/v1/exams/1')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});
test('PUT /exams/{id} should return 401 without token', (done) => {
    request(app)
        .put('/v1/exams/1')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});
test('DELETE /exams/{id} should return 401 without token', (done) => {
    request(app)
        .delete('/v1/exams/1')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});


/**
 * Data
 */

let getExamByIdRequest = function(id) {
    return request(app)
        .get('/v1/exams/' + id)
        .set('Authorization', 'Bearer ' + authTokenTest);
}

test('GET /exams should return 200', (done) => {
    request(app)
        .get('/v1/exams/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});
test('POST /exams should return 201', (done) => {
    let obj = {
        name: "New",
        taskNumbers: 10,
    }
    request(app)
        .post('/v1/exams/')
        .send(obj)
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(201)
        .end((err, res) => {
            getExamByIdRequest(res.body.id)
                .expect(200)
                .end((err, res) => {
                    //TODO: check obj equality
                    done(err);
                });
        });
});
test('GET /exams/{id} should return 200', (done) => {
    getExamByIdRequest("1")
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});
test('PUT /exams/{id} should return 200', (done) => {
    let obj = {
        description: "Prova desc"
    }
    request(app)
        .get('/v1/exams/1')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            getExamByIdRequest(res.body.id)
                .expect(200)
                .end((err, res) => {
                    //TODO: check obj equality
                    done(err);
                });
        });
});
test('DELETE /exams/{id} should return 200', (done) => {
    let examId = "1";
    request(app)
        .delete('/v1/exams/' + examId)
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            getExamByIdRequest(examId)
                .expect(404)
                .end((err, res) => {
                    done(err);
                });
        });
});
