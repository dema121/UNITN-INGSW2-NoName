const request = require('supertest');
const app = require('../api').app ;
const httpServer = require('../api').httpServer;

const authTokenTest = "fakeToken123";

test('GET /users should return 401 without token', (done) => {
    request(app)
        .get('/v1/users/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
}); 

test('GET /users should return 200', (done) => {
    request(app)
        .get('/v1/users/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});
test('POST /users should return 401 without token', (done) => {
    request(app)
        .post('/v1/users/')
        .expect(400)
        .end((err, res) => {
            done(err);
        });
});
let getUserByIdRequest = function(id) {
    return request(app)
        .get('/v1/users/'+ id)
        .set('Authorization', 'Bearer ' + authTokenTest);
}
test('POST /users should return 201', (done) => {
    let obj = {
        username: "NewUsername",
        name: "NewUser",
        surname: "NewSurname",
        email: "NewEmail@a.com",
        password: "NewPassword"
    }
    request(app)
        .post('/v1/users/')
        .send(obj)
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(201)
        .end((err, res) => {
            getUserByIdRequest(res.body.id)
                .expect(200)
                .end((err, res) => {
                    //TODO: check obj equality
                    done(err);
                });
        });
});
test('DELETE /users/id should return 200', (done) =>{
    request(app)
        .delete('/v1/users/1')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});
test('DELETE /users/id should return 403 if the user has no the authorization', (done) =>{
    request(app)
        .delete('/v1/users/2')
        .expect(403)
        .end((err, res) => {
            done(err);
        });
});
test('DELETE /users/id should return 401 if the user has is no logged in', (done) =>{
    request(app)
        .delete('/v1/users/2')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});