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

    let sqlQuery = `INSERT INTO post(movie_id, title, body, rating, fullname) VALUES (?, ?, ?, ?, ?);`;
    let create = [body.movie_id, body.title, body.body, body.rating, body.fullname];

    db.query(sqlQuery, create, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.status(201).send("Post Created");
    });
}

function readAll(req, res, next) {
    let sqlQuery = "SELECT * FROM post;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.json(results);
    });
}

function readID({params}, res, next) {
    const id = params.id;
    if(!id) return next(createError(400, `Missing request id!`));
    if(typeof(id) !== "number") return next();

    let sqlQuery = "SELECT * FROM post WHERE id = ?;";
    let read = [id];
    db.query(sqlQuery, read, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.json(results);
    });
}


function update({body, params}, res, next) {
    const id = params.id;
    if(!id) return next(createError(400, `Missing request id!`));

    let sqlQuery = `UPDATE post SET movie_id = ?, title = ?, body = ?, rating = ?, fullname = ? WHERE id = ?;`;
    let update = [body.movie_id, body.title, body.body, body.rating, body.fullname, id];

    db.query(sqlQuery, update, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        return res.status(204).send("Post Updateded");
    });
}

function del({params}, res, next) {
    const id = params.id;
    if(!id) return next(createError(400, "Missing request id!"));

    let sqlQuery = `DELETE FROM post WHERE id = ?`;
    let del = [id];

    db.query(sqlQuery, del, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        if(results.affectedRows !== 1) return next(createError(400, "Email not deleted, id may not exist in database"));
        return res.status(204).send("Post Deleted");
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