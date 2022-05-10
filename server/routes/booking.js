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

function addBooking(req, res) {
    let sqlQuery = `INSERT INTO booking(fullname, email, no_adult, no_child, no_concession) VALUES ('${req.body.fullname}', '${req.body.email}', ${req.body.no_adult}, ${req.body.no_child}, ${req.body.no_concession});`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function readBookings(req, res) {
    let sqlQuery = "SELECT * FROM booking;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        res.json(results);
    });
}

function updateBooking(req, res) {
    let sqlQuery = `UPDATE booking SET fullname = '${req.body.fullname}', email = '${req.body.email}', no_adult = ${req.body.no_adult}, no_child = ${req.body.no_child}, no_concession = ${req.body.no_concession} WHERE id = ${req.params.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function deleteBooking(req, res) {
    let sqlQuery = `DELETE FROM booking WHERE id = ${req.params.id}`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

//default
router.get("", readBookings);

// Create
router.post("/create", addBooking);

// Read
router.get("/read", readBookings);

// Update
router.put("/update/:id", updateBooking);

// Delete
router.delete("/delete/:id", deleteBooking);

module.exports = router;