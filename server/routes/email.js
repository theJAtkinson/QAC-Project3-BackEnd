const express = require("express");
const mysql = require("mysql");
const {database} = require("../config.json");

const router = express.Router();
const db = mysql.createConnection(config.database);
db.connect();

// --- Functions --- 

function create(req, res) {
    let sqlQuery = `INSERT INTO email_form(fullname, title, body, email) VALUES ('${req.body.fullname}', '${req.body.title}', '${req.body.body}', '${req.body.email}');`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function readAll(req, res) {
    let sqlQuery = "SELECT * FROM email_form;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
        res.json(results);
    });
}

function update(req, res) {
    let sqlQuery = `UPDATE email_form SET fullname = '${req.body.fullname}', title = '${req.body.title}', body = '${req.body.body}', email = '${req.body.email}' WHERE id = ${req.params.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function deleteE(req, res) {
    let sqlQuery = `DELETE FROM email_form WHERE id = ${req.params.id}`;
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
router.delete("/delete/:id", deleteE);

module.exports = router;