import { AddressInfo } from "net";
import * as path from 'path';
import { registerUser, getUser } from './db';
import { Express, json } from 'express';
import { NextFunction, Request, Response } from "express-serve-static-core";
import { STATUS_CODES } from "http";
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const debug = require('debug')('my express app');
const app:Express = express();
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'client')));

// Registration endpoint
app.post('/api/register', async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await registerUser(email, hashedPassword, username);
    console.log(hashedPassword);
    // Check if the email is already registered
    if (result) {
        res.status(201).json({ message: 'Registration successful' });
        res.cookie('email', email, { maxAge: 1000 * 60 * 60, secure: true, httpOnly: true });
        res.cookie('username', username, { maxAge: 1000 * 60 * 60, secure: true });
    }
    else {
        res.status(400).json({ message: 'This email has already been registered' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    // Find the member by email (In a real app, you would compare hashed passwords)
    const result = await getUser(email);
    if (result[0]) {
        console.log(result[0].username, result[0].password);
        if (await bcrypt.compare(password, result[0].password)) {
            res.status(200).json({ message: result[0].username });
            res.cookie('email', email, { maxAge: 1000 * 60 * 60, secure: true });
            res.cookie('username', username, { maxAge: 1000 * 60 * 60, secure: true });
        }
        else res.status(401).json({ message: 'Incorrect email or password. Please try again.' });
    }
    else res.status(401).json({ message: 'Incorrect email or password. Please try again.' });
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error('404 Not Found');
    res.status(404);
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.set('port', process.env.PORT || 4000);

const server = app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${(server.address() as AddressInfo).port}`);
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});
