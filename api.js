const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
 
var members = [
    {id: 1, name:"Demattè Andrea"},
    {id: 2, name:"Mazzucchi Gianluca"},
    {id: 3, name:"Meroni Giacomo"},
    {id: 4, name:"Oniarti Alessandro"},
    {id: 5, name:"Pisetta Alex"}
];
 
 
app.get('/', (req, res) => res.send('Hello World! Visit <a href="/team">/team</a> for team members'))
 
app.get('/team', (req, res) => {
   res.json(members)
})

app.listen(PORT, () => console.log('Example app listening on port:'+ PORT))

module.exports = {app};