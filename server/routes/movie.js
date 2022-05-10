const express = require("express");
const mysql = require("mysql");
const config = require("../config.js");


const router = express.Router();
const db = mysql.createConnection(config.database);
db.connect();

// --- Functions --- 
router.post("/movies/create",function(req,res,next){
    let sqlQuery = `INSERT INTO movie (movie_name, director, actors, img, classification) 
                    VALUES ('${req.body.movie_name}', '${req.body.director}', '${req.body.actors}',
                    '${req.body.img}', '${req.body.classification}');`;
    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
})

router.get("/movies/readAll",function(req,res,next){
    let sqlQuery = `SELECT * FROM movie`
    db.query(sqlQuery, (err, results) => {
        console.log(results);
        res.json(results);
    });
})

router.put("/movies/update/:id",function(req,res,next){
    let sqlQuery = `UPDATE movie SET movie_name = '${req.body.movie_name}', director = '${req.body.director}', actors = '${req.body.actors}', img = '${req.body.img}', classification = '${req.body.classification}' WHERE id = ${req.params.id}; `;

    db.query(sqlQuery, (err, results) => {
        console.log(results);
        console.log(err);
    });
    res.end();
})

router.get("/movies/delete/:id",function(req,res,next){
    let sqlQuery = `DELETE from movie WHERE id = ${req.params.id}`
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