const request = require('supertest');
const app = require('../api').app;

const authTokenTest = "fakeToken123";


test('GET /profile should return 401 without token', (done) => {
    request(app)
        .get('/v1/profile/')
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});

test('GET /profile should return 200 with token', (done) => {
    request(app)
        .get('/v1/profile/')
        .set('Authorization', 'Bearer ' + authTokenTest)
        .expect(200)
        .end((err, res) => {
            let user = res.body;
            if(user instanceof Object && !(user instanceof Array) && user.id == 1){                
                done(err);
            }
            
            
        });
});

test('POST /login should return 200 with right credential', (done) => {
    let obj = {
        email: 'a@a.com',
        password: 'ASD'
    }    
    request(app)
        .post('/v1/login/')
        .send(obj)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            if(isUser(res.body) && res.body.id == 1){
                done();
                return;
            }
            done("not the right user");
        });
});

test('POST /login should return 401 without right credential', (done) => {
    let obj = {
        email: 'asd@a.com',
        password: 'ASD'
    }    
    request(app)
        .post('/v1/login/')
        .send(obj)
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});

test('POST /logout should return 200 with the right token', (done) => {
    let token = {
        accessToken: 'fakeToken123'
    }    
    request(app)
        .post('/v1/logout/')
        .send(token)
        .expect(200)
        .end((err, res) => {
            done(err);
        });
});

test('POST /logout should return 401 with the wrong token', (done) => {
    let token = {
        accessToken: 'fakeToken1234'
    }    
    request(app)
        .post('/v1/logout/')
        .send(token)
        .expect(401)
        .end((err, res) => {
            done(err);
        });
});

function isUser(obj) {
    return obj instanceof Object && !(obj instanceof Array)
        && obj.id && obj.email;
}
