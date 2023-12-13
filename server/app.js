"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const db_1 = require("./db");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const debug = require('debug')('my express app');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
// Registration endpoint
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    const result = yield (0, db_1.registerUser)(email, password, username);
    // Check if the email is already registered
    if (result)
        res.status(201).json({ message: 'Registration successful' });
    else
        res.status(400).json({ message: 'This email has already been registered' });
}));
// Login endpoint
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Find the member by email (In a real app, you would compare hashed passwords)
    const result = yield (0, db_1.getUser)(email);
    if (result[0]) {
        console.log(result[0].username, result[0].password);
        if (password === result[0].password) {
            res.status(200).json({ message: result[0].username });
        }
        else
            res.status(401).json({ message: 'Incorrect email or password. Please try again.' });
    }
    else
        res.status(401).json({ message: 'Incorrect email or password. Please try again.' });
}));
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('404 Not Found');
    res.status(404);
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});
app.set('port', process.env.PORT || 4000);
const server = app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${server.address().port}`);
    debug(`Express server listening on port ${server.address().port}`);
});
//# sourceMappingURL=app.js.map