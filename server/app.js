'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
require("dotenv").config();
const app = express();
const open = require("open");
const bodyParser = require('body-parser');
const { requiresAuth } = require('express-openid-connect');
const cookieParser = require('cookie-parser');
const request = require("request");
const cors = require('cors')
app.use(cors());
app.use(express.static('docs'));

app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Require employee routes
const citiesRoutes = require('./routes/cities.routes');
const City = require("./models/city.model");

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

// using as middleware
app.use('/api/v1/cities', citiesRoutes);

app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.NODEJS_IP || '127.0.0.1');
app.set('view engine', 'hbs');
app.set('views', 'docs/views');


const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: 'http://localhost:8000',
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: 'https://djs93.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(function (req, res, next) {
    // check if client sent cookie
    let cookie = req.cookies.jwtToken;
    if (cookie === undefined) {
        let token;
        // no: set a new cookie
        let options = { method: 'POST',
            url: 'https://djs93.us.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: `{"client_id":"${process.env.AUTH0_CLIENT_ID}","client_secret":"${process.env.AUTH0_CLIENT_SECRET}","audience":"http://localhost:8000","grant_type":"client_credentials"}` };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            token = JSON.parse(body).access_token;
            console.log(body);
            res.cookie('jwtToken',token, { maxAge: 900000});
            next(); // <-- important!
        });
    } else {
        // yes, cookie was already present
        console.log('cookie exists', cookie);
        next(); // <-- important!
    }
});

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    if(req.oidc.isAuthenticated()){
        res.render('protected',{showLogout: true});
    }
    else{
        res.render('home');
    }
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/edit/:id', requiresAuth(), (req, res) => {
    City.findById(req.params.id, function(err, city) {
        if (err)
            res.send(err);
        res.render('edit',{showLogout: true, city: city[0], id: req.params.id});
    });
});

app.post('/edit', requiresAuth(), (req, res) => {
    const {id, fldName, fldLat, fldLong, fldCountry, fldAbbreviation, fldCapitalStatus, fldPopulation} = req.body;
    City.update(id, {fldName, fldLat, fldLong, fldCountry, fldAbbreviation, fldCapitalStatus, fldPopulation}, function (err, city){
        if(err){
            res.render('edit', {showLogout: true, city: {fldName, fldLat, fldLong, fldCountry, fldAbbreviation, fldCapitalStatus, fldPopulation}, id: id,
            message: err, messageClass: 'alert-danger'});
        }
        else {
            res.render('protected', {showLogout: true, message: "City successfully edited!", messageClass: 'alert-success'});
        }
    });
});

app.post('/delete', requiresAuth(), (req, res) => {
    const {id} = req.body;
    City.delete(id, function (err, city){
        if(err){
            res.render('protected', {showLogout: true,
                message: err, messageClass: 'alert-danger'});
        }
        else {
            res.render('protected', {showLogout: true, message: "City successfully deleted!", messageClass: 'alert-success'});
        }
    });
});

app.post('/create_new', requiresAuth(), (req, res) => {
    City.create({fldName:null,fldLat:null,fldLong:null,fldCountry:null,fldAbbreviation:null,fldCapitalStatus:null,fldPopulation:null}, function (err, new_id){
        if(err){
            res.render('protected', {showLogout: true,
                message: err, messageClass: 'alert-danger'});
        }
        else {
            res.render('edit', {showLogout: true, id: new_id, creating_new:true});
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('%s: Node server started on %s ...', Date(Date.now()), app.get('port'));
    open("http://localhost:8000");
});
