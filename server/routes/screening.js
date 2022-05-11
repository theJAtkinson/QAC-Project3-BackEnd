const express = require("express");
const mysql = require("mysql");
const createError = require("http-errors");
const {database} = require("../config.json");


const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions --- 
function create(req,res,next){
    let sqlQuery = `INSERT INTO screening (screen, movie_id, show_date, show_time) 
                    VALUES (${req.body.screen}, ${req.body.movie_id}, ${req.body.show_date},
                    ${req.body.show_time});`;
    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
}

function readAll(req,res,next){
    let sqlQuery = `SELECT * FROM screening`
    db.query(sqlQuery, (err, results) => {
        console.log(results);
        res.json(results);
    });
}

function update(req,res,next){
    let sqlQuery = `UPDATE screening SET screen = ${req.body.screen}, movie_id = ${req.body.movie_id}, show_date = ${req.body.show_date}, show_time = ${req.body.show_time}, WHERE id = ${req.params.id}; `;

    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
}

function del(req,res,next){
    let sqlQuery = `DELETE from screening WHERE id = ${req.params.id}`
    db.query(sqlQuery, (err,results) => {
        console.log(results);
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