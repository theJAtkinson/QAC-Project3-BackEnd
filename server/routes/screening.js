const express = require("express");
const mysql = require("mysql");
const config= require("../config.js");


const router = express.Router();
const db = mysql.createConnection(config.database);
db.connect();

// --- Functions --- 
router.post("/screening/create",function(req,res,next){
    let sqlQuery = `INSERT INTO screening (screen, movie_id, show_date, show_time) 
                    VALUES (${req.body.screen}, ${req.body.movie_id}, ${req.body.show_date},
                    ${req.body.show_time});`;
    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
})

router.get("/screening/readAll",function(req,res,next){
    let sqlQuery = `SELECT * FROM screening`
    db.query(sqlQuery, (err, results) => {
        console.log(results);
        res.json(results);
    });
})

router.put("/update/:id",function(req,res,next){
    let sqlQuery = `UPDATE screening SET screen = ${req.body.screen}, movie_id = ${req.body.movie_id}, show_date = ${req.body.show_date}, show_time = ${req.body.show_time}, WHERE id = ${req.params.id}; `;

    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
})

router.get("/screening/delete/:id",function(req,res,next){
    let sqlQuery = `DELETE from screening WHERE id = ${req.params.id}`
    db.query(sqlQuery, (err,results) => {
        console.log(results);
    });
    res.end();
})

// --- End Points ---
// Create
router.post("/create", create);

// Read
router.get("/read", readAll);

// Update
router.put("/update/:id", update);

// Delete
router.delete("/delete/:id", deleteE);

module.exports = router;