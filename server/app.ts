import { AddressInfo } from "net";
import * as path from 'path';
import { registerUser, getUser } from './db'
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const debug = require('debug')('my express app');
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'client')));

// Registration endpoint
app.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    const result = await registerUser(email, password, username);
    // Check if the email is already registered
    if (result) res.status(201).json({ message: 'Registration successful' });
    else res.status(400).json({ message: 'This email has already been registered' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Find the member by email (In a real app, you would compare hashed passwords)
    const result = await getUser(email);
    if (result[0]) {
        console.log(result[0].username, result[0].password);
        if (password === result[0].password) {
            res.status(200).json({ message: result[0].username });
        }
        else res.status(401).json({ message: 'Incorrect email or password. Please try again.' });
    }
    else res.status(401).json({ message: 'Incorrect email or password. Please try again.' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err[ 'status' ] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err['status'] || 500).json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to users
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500).json({
        message: err.message,
        error: err
    });
});

app.set('port', process.env.PORT || 4000);

const server = app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${(server.address() as AddressInfo).port}`);
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});
