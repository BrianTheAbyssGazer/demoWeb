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
exports.registerUser = exports.getUser = void 0;
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise();
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM user WHERE email = ?", [email]);
        return result[0];
    });
}
exports.getUser = getUser;
function registerUser(email, password, username) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('registering...');
        try {
            const result = yield pool.query('INSERT INTO user (email, password, username) VALUES (?,?,?)', [email, password, username]);
            console.log('registering.');
            console.log(result);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    });
}
exports.registerUser = registerUser;
//# sourceMappingURL=db.js.map