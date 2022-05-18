const express = require("express");
const mysql = require("mysql");
const createError = require("http-errors");
const {database} = require("../config.js");
const router = express.Router();
const db = mysql.createConnection(database);
db.connect();

// --- Functions --- 
function create({body},res,next){
    let sqlQuery = `INSERT INTO movie (movie_name, director, actors, img, classification) 
                    VALUES (?, ?, ?, ?, ?);`;
    let values = [body.movie_name, body.director, body.actors, body.img, body.classification]
    db.query(sqlQuery, values, (err, results) => {
        if(err) return next(err);
        return res.status(201).send("Movie Created");
    });
}

function readNameScreenings({params},res, next){
    const movie_name = params.movie_name;
    if (!movie_name) return next(createError(400, `Missing request name!`));

    let sqlQuery = "SELECT m.id AS movie_id, m.movie_name, s.id AS screening_id, s.screen, s.show_date, s.show_time FROM movie AS m JOIN screening AS s ON m.id = s.movie_id WHERE m.movie_name = ?;";
    let read = [movie_name];

    db.query(sqlQuery, read, (err, results) => {
        // console.log(results);
        if(err) return next(err);
        return res.json(results);
    });
}

function readAll(req,res){
    let sqlQuery = `SELECT * FROM movie`
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        res.json(results);
    });
}

function readById(req, res, next){
    let sqlQuery = `SELECT * FROM movie WHERE id=?`
    let id = [parseInt(req.params.id)]

    db.query(sqlQuery,id,(err, results) =>{
        if (err) return next({status:400, message:err.message});
        return res.json(results);
    });
}

function searchMovie(req,res,next){
    const searchText = `%${req.params.bloop}%`
    let sqlQuery = `SELECT * FROM movie WHERE movie_name LIKE(?) OR director LIKE(?) OR actors LIKE(?)`
    let read = [searchText, searchText, searchText]

    db.query(sqlQuery, read, (err, results) =>{
        if (err) return next({status:400, message:err.message});
        return res.json(results);
    });
}

function update({body, params},res,next){
    let sqlQuery = `UPDATE movie SET movie_name = ?, director = ?, actors = ?, img = ?, classification = ? WHERE id = ?; `;

    let values = [body.movie_name, body.director, body.actors, body.img, body.classification, params.id]

    db.query(sqlQuery, values, (err, results) => {
        // console.log(results);
        // console.log(err);
        if(err) return next(err);
        if(results.affectedRows !== 1) return next(createError(400, "Movie not updated, id may not exist in database"));
        return res.status(204).send("Movie Updateded");
    });
}

function del({params},res,next){
    let sqlQuery = `DELETE from movie WHERE id = ?`
    let value = [params.id]
    db.query(sqlQuery, value, (err,results) => {
        if(err) return next({status:400, message:err.message});
        return res.status(204).send();
    });  
}

// --- End Points ---

// Create
router.post("/create", create);

// Read
router.get("/read/screening/:movie_name", readNameScreenings);
router.get("/read", readAll);
router.get("/read/:id", readById);

// Search
router.get("/searchMovie/:bloop", searchMovie);


// Update
router.put("/update/:id", update);

// Delete
router.delete("/delete/:id", del);

module.exports = router;