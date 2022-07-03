//imports installed packages
const express = require('express'); //express server
require('express-async-errors'); //async error handlers
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
//validation error to be used on line: 70
const { ValidationError } = require('sequelize');

//create a variable and check if the current environment is production
const { environment } = require('./config');
const isProduction = environment === 'production';

//initialize the express application
const app = express();

//connect morgan middleware for logging info of reqs and res'
app.use(morgan('dev'));

//add cookie parsers for parking cookies
app.use(cookieParser());
//use express.json to parse json bodies
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
//adds _csrf cookie taht is HTTP-only
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);


//------------------------------importing and setting up a test route
// backend/app.js
const routes = require('./routes');

// ...

app.use(routes); // Connect all the routes

//-------------------------------error handlers-----------------------

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});


//formats all errors before sending response
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        //title: err.title || 'Server Error', //commented out from the auth-me walkthrough
        message: err.message,
        statusCode: res.statusCode,
        errors: err.errors,
        //stack: isProduction ? null : err.stack //commented out from the auth-me walkthrough
    });
});

//--------------------------------ending of error handlers
//export the app
module.exports = app;
