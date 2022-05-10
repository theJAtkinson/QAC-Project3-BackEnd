const express = require("express");
const mysql = require("mysql");
const config = require("../config.js");

const router = express.Router();
const db = mysql.createConnection(config.database);
db.connect();

// --- Functions --- 

function create({body}, res, next) {
    if (!body) {
        return res.status(400).send("Missing request body");
    }

    let sqlQuery = `INSERT INTO booking(fullname, email, no_adult, no_child, no_concession) VALUES ('?', '?', ?, ?, ?);`;
    let create = [body.fullname, body.email, body.no_adult, body.no_child, body.no_concession];

    db.query(sqlQuery, create, (err, results) => {
        // console.log(results);
        // console.log(err);
        if (!err) {
            return res.status(201).send("Booking Created");
        } else {
            return next(err);
        }
    });
}

function readAll(req, res) {
    let sqlQuery = "SELECT * FROM booking;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
        res.json(results);
    });
}

function update({body, params}, res) {
    const id = params.id;
    if (!id) {
        return res.status(400).send(`No booking found with id ${id}`);
    }

    let sqlQuery = `UPDATE booking SET fullname = '?', email = '?', no_adult = ?, no_child = ?, no_concession = ? WHERE id = ?;`;
    let update = [body.fullname, body.email, body.no_adult, body.no_child, body.no_concession, id];

    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function del(req, res) {
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
router.delete("/delete/:id", del);

module.exports = router;