const express = require("express");
const mysql = require("mysql");
const createError = require("http-errors");
const {database} = require("../config.json");

const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions --- 

function create({body}, res, next) {
    if(!body) return next(createError(400, "Missing request body"));

    let sqlQuery = `INSERT INTO email_form(fullname, title, body, email) VALUES (?, ?, ?, ?);`;
    let create = [body.fullname, body.title, body.body, body.email];

    db.query(sqlQuery, create, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.status(201).send("Email Created");
    });
}

function readID({params}, res, next) {
    const id = params.id;
    if (!id) return next(createError(400, `Missing request id!`));
    if(typeof(id) !== "number") return next();

    let sqlQuery = "SELECT * FROM email_form WHERE id = ?;";
    let read = [id];
    db.query(sqlQuery, read, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.json(results);
    });
}

function readAll(req, res, next) {
    let sqlQuery = "SELECT * FROM email_form;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);/
        if(err) return next(err);
        return res.json(results);
    });
}

function update({body, params}, res, next) {
    const id = params.id;
    if (!id) return next(createError(400, "Missing request id!"));

    let sqlQuery = `UPDATE email_form SET fullname = ?, title = ?, body = ?, email = ? WHERE id = ?;`;
    let update = [body.fullname, body.title, body.body, body.email, id];
    db.query(sqlQuery, update, (err, results) => {
        console.log(results);
        console.log(err);
        if(err) return next(err);
        if(results.affectedRows !== 1) return next(createError(400, "Email not updated, id may not exist in database"));
        return res.status(204).send("Email Created");
    });
}

function del({params}, res, next) {
    const id = params.id;
    if(!id) return next(createError(400, "Missing request id!"));

    let sqlQuery = `DELETE FROM email_form WHERE id = ?`;
    let del = [id];

    db.query(sqlQuery, del, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        if(results.affectedRows !== 1) return next(createError(400, "Email not deleted, id may not exist in database"));
        return res.status(204).send("Email Deleted");
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