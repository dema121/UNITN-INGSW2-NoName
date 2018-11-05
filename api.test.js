const app = require('./api').app

const PORT = process.env.PORT || 3000
const url = "http://localhost:" + PORT;
//const url = 'https://noname-unitn-ingsw2.herokuapp.com'
const fetch = require("node-fetch");

it('team page works with get', () => {
    expect.assertions(1);
    return fetch(url + "/team")
        .then(response => expect(response.status).toEqual(200))
});