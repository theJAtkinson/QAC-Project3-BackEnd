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
    let sqlQuery = `INSERT INTO booking(fullname, email, no_adult, no_child, no_concession) VALUES ('${body.fullname}', '${body.email}', ${body.no_adult}, ${body.no_child}, ${body.no_concession});`;

    db.query(sqlQuery, (err, results) => {
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

function update(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send(`No booking found with id ${id}`);
    }
    let sqlQuery = `UPDATE booking SET fullname = '${req.body.fullname}', email = '${req.body.email}', no_adult = ${req.body.no_adult}, no_child = ${req.body.no_child}, no_concession = ${req.body.no_concession} WHERE id = ${id};`;
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