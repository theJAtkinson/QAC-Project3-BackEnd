const express = require("express");
const mysql = require("mysql");
const config = require("../config.js");

const router = express.Router();
const db = mysql.createConnection(config.database);
db.connect();

// --- Functions --- 

function create(req, res) {
    let sqlQuery = `INSERT INTO booking(fullname, email, no_adult, no_child, no_concession) VALUES ('${req.body.fullname}', '${req.body.email}', ${req.body.no_adult}, ${req.body.no_child}, ${req.body.no_concession});`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function readAll(req, res) {
    let sqlQuery = "SELECT * FROM booking;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
        res.json(results);
    });
}

function update(req, res) {
    let sqlQuery = `UPDATE booking SET fullname = '${req.body.fullname}', email = '${req.body.email}', no_adult = ${req.body.no_adult}, no_child = ${req.body.no_child}, no_concession = ${req.body.no_concession} WHERE id = ${req.params.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function deleteB(req, res) {
    let sqlQuery = `DELETE FROM booking WHERE id = ${req.params.id}`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

// --- End Points ---

// Create
router.post("/create", create);

// Read
router.get("/read", readAll);

// Update
router.put("/update/:id", update);

// Delete
router.delete("/delete/:id", deleteB);

module.exports = router;