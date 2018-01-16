const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();
const bodyParser = require('body-parser');
const users = require('../users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users/register', function(req, res){
    console.log('/users/register')
    let data = users.register(req.body);
    console.log('after crate user')
    let statusCode = data.status == 'success' ? 200: 422;
    let message = data.message
    res.status(statusCode).send({message});
});

app.post('/users/authenticate', function(req, res){
    let user = users.login(req.body);
    if(user) {
        res.status(200).send(user);
    } else {
        // else return error
        res.status(401).send({error: 'Username or password is incorrect'});
    }
});

app.get('/users', function(req, res){
    res.status(200).send(users.getAll());
});

app.get('/users/:username', function(req, res){
    res.status(200).send(users.get(req.params.username));
});

app.delete('/users/:username', function(req, res){
    res.status(200).send(users.delete(req.params.username));
});

app.get('/groups', function(req, res){
    res.status(200).send([]);
});

app.listen(port);
console.log("server started on port " + port);