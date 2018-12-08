const request = require('supertest');
const app = require('../api').app;

const authTokenTest = "fakeToken123";

/**
 * TEST IF LOGGED IN
 */
test('GET /teacherassistants should return 401 without token', (done) => {
    request(app)
        .get('/v1/teacherassistants/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});
test('POST /teacherassistants should return 401 without token', (done) => {
    request(app)
        .post('/v1/teacherassistants/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});
test('DELETE /teacherassistants/{id} should return 401 without token', (done) => {
    request(app)
        .delete('/v1/teacherassistants/2')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});

test('GET /teacherassistants should return 400 without examId query param', (done) => {
    request(app)
        .get('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
test('GET /teacherassistants should return 404 with invalid examId query param', (done) => {
    request(app)
        .get('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .query({
            examId: 'trololol'
        })
        .expect(404)
        .end((err, res) => {
            done(err);
        });
});
test('GET /teacherassistants should return 200 with examId query param', (done) => {
    request(app)
        .get('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .query({
            examId: 1
        })
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
            } else {
                let teacherassistants = res.body;
                let validResponse = (teacherassistants instanceof Array && isUser(teacherassistants[0]));
                done(validResponse ? '' : 'Not an array of users');
            }
        });
});


test('POST /teacherassistants should return 400 without userId & examId in body', (done) => {
    request(app)
        .post('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
test('POST /teacherassistants should return 400 without userId in body', (done) => {
    request(app)
        .post('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .send({
            examId: 1
        })
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
test('POST /teacherassistants should return 400 without examId in body', (done) => {
    request(app)
        .post('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .send({
            userId: 2
        })
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
test('POST /teacherassistants should return 404 with invalid examId in body', (done) => {
    request(app)
        .post('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .send({
            examId: 'trololol',
            userId: 2
        })
        .expect(404)
        .end((err, res) => {
            done(err);
        });
});
test('POST /teacherassistants should return 404 with invalid userId in body', (done) => {
    request(app)
        .post('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .send({
            examId: 1,
            userId: 'trololol'
        })
        .expect(404)
        .end((err, res) => {
            done(err);
        });
});
test('POST /teacherassistants/ should return 403 on exam that are not owned', (done) => {
    request(app)
        .post('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .send({
            examId: 2,
            userId: 1
        })
        .expect(403)
        .end((err, res) => {
            done(err);
        });
});
test('POST /teacherassistants should return 201 with examId & userId in body', (done) => {
    request(app)
        .post('/v1/teacherassistants/')
        .set("Authorization", "Bearer " + authTokenTest)
        .send({
            examId: 1,
            userId: 3
        })
        .expect(201)
        .end((err, res) => {            
            if (err) {
                done(err);
            } else {
                let teacherassistant = res.body;
                let validResponse = (isUser(teacherassistant));
                if (validResponse) {
                    request(app)
                        .get('/v1/teacherassistants/')
                        .set("Authorization", "Bearer " + authTokenTest)
                        .query({
                            examId: 1
                        })
                        .end((err, res) => {
                            let tas = res.body;
                            validResponse = validResponse && (tas.findIndex(ta => ta.id == 3) >= 0);
                            done(validResponse ? '' : 'User not added');
                        })
                } else {
                    done('Not returned the user');
                }
            }
        });
});


test('DELETE /teacherassistants/3 should return 400 without examId in query params', (done) => {
    request(app)
        .delete('/v1/teacherassistants/3')
        .set("Authorization", "Bearer " + authTokenTest)
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
test('DELETE /teacherassistants/3 should return 404 with invalid examId in query params', (done) => {
    request(app)
        .delete('/v1/teacherassistants/3')
        .set("Authorization", "Bearer " + authTokenTest)
        .query({
            examId: 'trololol'
        })
        .expect(404)
        .end((err, res) => {
            done(err);
        });
});
test('DELETE /teacherassistants/trolol should return 404 with invalid userId', (done) => {
    request(app)
        .delete('/v1/teacherassistants/trolol')
        .set("Authorization", "Bearer " + authTokenTest)
        .query({
            examId: 1
        })
        .expect(404)
        .end((err, res) => {
            done(err);
        });
});
test('DELETE /teacherassistants/3 should return 403 on exam that are not owned', (done) => {
    request(app)
        .delete('/v1/teacherassistants/3')
        .set("Authorization", "Bearer " + authTokenTest)
        .query({
            examId: 2
        })
        .expect(403)
        .end((err, res) => {
            done(err);
        });
});
test('DELETE /teacherassistants/3 should return 200 with examId in query params', (done) => {
    request(app)
        .delete('/v1/teacherassistants/3')
        .set("Authorization", "Bearer " + authTokenTest)
        .query({
            examId: 1,
            userId: 3
        })
        .expect(200)
        .end((err, res) => {            
            if (err) {
                done(err);
            } else {
                request(app)
                    .get('/v1/teacherassistants/')
                    .set("Authorization", "Bearer " + authTokenTest)
                    .query({
                        examId: 1
                    })
                    .end((err, res) => {
                        let tas = res.body;
                        let validResponse = !(tas.findIndex(ta => ta.id == 3) >= 0);
                        done(validResponse ? '' : 'User not deleted');
                    })
            }
        });
});


function isUser(obj) {
    return obj instanceof Object && !(obj instanceof Array)
        && obj.id && obj.email;
}