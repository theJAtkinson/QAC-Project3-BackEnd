const express = require("express");
const mysql = require("mysql");
const {database} = require("../config.json");


const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions --- 
function create(req,res,next){
    let sqlQuery = `INSERT INTO movie (movie_name, director, actors, img, classification) 
                    VALUES ('${req.body.movie_name}', '${req.body.director}', '${req.body.actors}',
                    '${req.body.img}', '${req.body.classification}');`;
    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
}

function readAll(req,res,next){
    let sqlQuery = `SELECT * FROM movie`
    db.query(sqlQuery, (err, results) => {
        console.log(results);
        res.json(results);
    });
}

function update(req,res,next){
    let sqlQuery = `UPDATE movie SET movie_name = '${req.body.movie_name}', director = '${req.body.director}', actors = '${req.body.actors}', img = '${req.body.img}', classification = '${req.body.classification}' WHERE id = ${req.params.id}; `;

    db.query(sqlQuery, (err, results) => {
        console.log(results);
        console.log(err);
    });
    res.end();
}

function del(req,res,next){
    let sqlQuery = `DELETE from movie WHERE id = ${req.params.id}`
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