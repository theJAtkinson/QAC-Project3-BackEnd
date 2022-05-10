const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"root",
        database:"cinema"
    }
);


module.exports = router;