const express = require("express");
const mysql = require("mysql");
const {database} = require("../config.json");

const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions --- 

function create({body}, res) {
    let sqlQuery = `INSERT INTO email_form(fullname, title, body, email) VALUES ('?', '?', '?', '?');`;
    let create = [body.fullname, body.title, body.body, body.email];
    db.query(sqlQuery, create, (err, results) => {
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

function update({body, params}, res) {
    let sqlQuery = `UPDATE email_form SET fullname = '?', title = '?', body = '?', email = '?' WHERE id = ?;`;
    let update = [body.fullname, body.title, body.body, body.email, params.id];
    db.query(sqlQuery, update, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function del({params}, res) {
    let sqlQuery = `DELETE FROM email_form WHERE id = ?`;
    let del = [params.id];
    db.query(sqlQuery, del, (err, results) => {
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
router.delete("/delete/:id", del);

module.exports = router;