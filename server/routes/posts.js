const express = require("express");
const mysql = require("mysql");
const {database} = require("../config.json");

const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions ---
 
function create(req, res) {
    let sqlQuery = `INSERT INTO post(movie_id, title, body, rating, fullname) VALUES (${req.body.movie_id}, '${req.body.title}', '${req.body.body}', ${req.body.rating}, '${req.body.fullname}');`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function readAll(req, res) {
    let sqlQuery = "SELECT * FROM post;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
        res.json(results);
    });
}

function update(req, res) {
    let sqlQuery = `UPDATE post SET movie_id = ${req.body.movie_id}, title = '${req.body.title}', body = '${req.body.body}', rating = ${req.body.rating}, fullname = '${req.body.fullname}' WHERE id = ${req.params.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function deleteP(req, res) {
    let sqlQuery = `DELETE FROM post WHERE id = ${req.params.id}`;
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
router.delete("/delete/:id", deleteP);

module.exports = router;