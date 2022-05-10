const express = require("express");
const mysql = require("mysql");
const {database} = require("../config.json");


const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions --- 

// --- End Points ---

module.exports = router;