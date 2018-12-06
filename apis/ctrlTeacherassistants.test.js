const request = require('supertest');
const app = require('../api').app;
const httpServer = require('../api').httpServer;

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

afterAll(function () {
    httpServer.close();
});