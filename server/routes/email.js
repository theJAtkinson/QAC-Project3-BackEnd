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


function addEmail(req, res) {
    let sqlQuery = `INSERT INTO email_form(fullname, title, body, email) VALUES ('${req.body.fullname}', '${req.body.title}', '${req.body.body}', '${req.body.email}');`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function readEmails(req, res) {
    let sqlQuery = "SELECT * FROM email_form;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
        res.json(results);
    });
}

function updateEmail(req, res) {
    let sqlQuery = `UPDATE email_form SET fullname = '${req.body.fullname}', title = '${req.body.title}', body = '${req.body.body}', email = '${req.body.email}' WHERE id = ${req.params.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function deleteEmail(req, res) {
    let sqlQuery = `DELETE FROM email_form WHERE id = ${req.params.id}`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

// end points

//default
router.get("", readEmails);

// Create
router.post("/create", addEmail);

// Read
router.get("/read", readEmails);

// Update
router.put("/update/:id", updateEmail);

// Delete
router.delete("/delete/:id", deleteEmail);

module.exports = router;