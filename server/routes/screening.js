const express = require("express");
const mysql = require("mysql");
const createError = require("http-errors");
const {database} = require("../config.json");


const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions --- 
function create({body},res,next){
    const movie_id = body.movie_id;
    if(!movie_id) return next(createError(400, "Missing Movie ID"));

    let sqlQuery = `INSERT INTO screening (screen, movie_id, show_date, show_time) 
                    VALUES (?, ?, ?, ?);`;
    let values = [body.screen, movie_id, body.show_date, body.show_time]
    db.query(sqlQuery, values, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function readAll(req,res,next){
    let sqlQuery = `SELECT * FROM screening`
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        res.json(results);
    });
}

function update({body, params},res,next){
    const movie_id = body.movie_id;
    if(!movie_id) return next(createError(400, "Missing Movie ID"));

    let sqlQuery = `UPDATE screening SET screen = ?, movie_id = ?, show_date = ?, show_time = ?, WHERE id = ?; `;
    let values = [body.screen, movie_id, body.show_date, body.show_time, params.id]

    db.query(sqlQuery, values, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function del({params},res,next){
    let sqlQuery = `DELETE from screening WHERE id = ?`
    let value = [params.id]
    db.query(sqlQuery, value, (err,results) => {
        // console.log(results);
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