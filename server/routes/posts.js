const express = require("express");
const mysql = require("mysql");

const router = express.Router();
const db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"root",
        database:"cinema"
    }
);

function addPost(req, res) {
    let sqlQuery = `INSERT INTO post(movie_id, title, body, rating, fullname) VALUES (${req.body.movie_id}, '${req.body.title}', '${req.body.body}', ${req.body.rating}, '${req.body.fullname}');`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function readPosts(req, res) {
    let sqlQuery = "SELECT * FROM post;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
        res.json(results);
    });
}

function updatePost(req, res) {
    let sqlQuery = `UPDATE post SET movie_id = ${req.body.movie_id}, title = '${req.body.title}', body = '${req.body.body}', rating = ${req.body.rating}, fullname = '${req.body.fullname}' WHERE id = ${req.params.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

function deletePost(req, res) {
    let sqlQuery = `DELETE FROM post WHERE id = ${req.params.id}`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        // console.log(err);
    });
    res.end();
}

//default
router.get("", readPosts);

// Create
router.post("/create", addPost);

// Read
router.get("/read", readPosts);

// Update
router.put("/update/:id", updatePost);

// Delete
router.delete("/delete/:id", deletePost);

module.exports = router;