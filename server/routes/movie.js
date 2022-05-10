const express = require("express");
const mysql = require("mysql");
const config = require("../config.js");


const router = express.Router();
const db = mysql.createConnection(config.database);
db.connect();

// --- Functions --- 

// --- End Points ---

module.exports = router;