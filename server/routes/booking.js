const express = require("express");
const mysql = require("mysql");
const {database} = require("../config.js");
const createError = require("http-errors");

const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions --- 

function create({body}, res, next) {
    if(!body) return next(createError(400, "Missing request body"));
    const screening_id = body.screening_id;
    if(!screening_id) return next(createError(400, "Missing a screening_id"));
    
    let sqlQuery = `INSERT INTO booking(fullname, email, no_adult, no_child, no_concession, screening_id) VALUES (?, ?, ?, ?, ?, ?);`;

    if(!body.no_child){body.no_child = 0}
    if(!body.no_adult){body.no_adult = 0}
    if(!body.no_concession){body.no_concession = 0}
    let create = [body.fullname, body.email, body.no_adult, body.no_child, body.no_concession, screening_id];

    db.query(sqlQuery, create, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.status(201).send("Booking Created");
    });
}

function readID({params}, res, next) {
    const id = params.id;
    if (!id) return next(createError(400, `Missing request id!`));

    let sqlQuery = "SELECT * FROM booking WHERE id = ?;";
    let read = [id];
    db.query(sqlQuery, read, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.json(results);
    });
}

function readAll(req, res, next) {
    let sqlQuery = "SELECT * FROM booking;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.json(results);
    });
}

function update({body, params}, res, next) {
    const id = params.id;
    if (!id) return next(createError(400, `Missing request id!`));

    let sqlQuery = `UPDATE booking SET fullname = ?, email = ?, no_adult = ?, no_child = ?, no_concession = ?, screening_id = ? WHERE id = ?;`;

    if(!body.no_child){body.no_child = 0}
    if(!body.no_adult){body.no_adult = 0}
    if(!body.no_concession){body.no_concession = 0}
    let update = [body.fullname, body.email, body.no_adult, body.no_child, body.no_concession, body.screening_id, id];

    db.query(sqlQuery, update, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        if(results.affectedRows !== 1) return next(createError(400, "Booking not updated, id may not exist in database"));
        return res.status(204).send("Booking Updated");
    });
}

function del({params}, res, next) {
    const id = params.id;
    if(!id) return next(createError(400, "Missing request id!"));

    let sqlQuery = `DELETE FROM booking WHERE id = ?;`;
    let del = [id];

    db.query(sqlQuery, del, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        if(results.affectedRows !== 1) return next(createError(400, "Booking not deleted, id may not exist in database"));
        return res.status(204).send("Booking Deleted");
    });
}

// --- End Points ---

// Create
router.post("/create", create);

// Read
router.get("/read/:id", readID);
router.get("/read", readAll);

// Update
router.put("/update/:id", update);

// Delete
router.delete("/delete/:id", del);

module.exports = router;