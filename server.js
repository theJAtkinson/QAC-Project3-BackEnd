let express = require("express");
let bodyparser = require("body-parser");
let mysql = require("mysql");
let cors = require("cors");

let app = express();

let db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"password",
        database:"cinema"
    }
);
db.connect();



// - Logger -
// Pathname feedback
function pathNameFeedback(req, res, next) {
    pathName = req._parsedUrl.pathname;
    console.log("----- New Request -----");
    console.log(`Pathname: ${pathName}`);   
    next();
}

// Body feedback
function bodyFeedback(req, res, next) {
    console.log(req.body);
    console.log("-----------------------");
    next();
}

startList = [pathNameFeedback, bodyparser.json(), bodyparser.urlencoded({extended: true}), bodyFeedback];

app.use(startList, cors());

// --- Midware functions ---
app.post("/movies/create",function(req,res,next){
    let sqlQuery = `INSERT INTO movie (movie_name, director, actors, img, classification) 
                    VALUES ('${req.body.movie_name}', '${req.body.director}', '${req.body.actors}',
                    '${req.body.img}', '${req.body.classification}');`;
    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
})

app.get("/movies/readAll",function(req,res,next){
    let sqlQuery = `SELECT * FROM movie`
    db.query(sqlQuery, (err, results) => {
        console.log(results);
        res.json(results);
    });
})

app.put("/movies/update/:id",function(req,res,next){
    let sqlQuery = `UPDATE movie SET movie_name = '${req.body.movie_name}', director = '${req.body.director}', actors = '${req.body.actors}', img = '${req.body.img}', classification = '${req.body.classification}' WHERE id = ${req.params.id}; `;

    db.query(sqlQuery, (err, results) => {
        console.log(results);
        console.log(err);
    });
    res.end();
})

app.get("/movies/delete/:id",function(req,res,next){
    let sqlQuery = `DELETE from movie WHERE id = ${req.params.id}`
    db.query(sqlQuery, (err,results) => {
        console.log(results);
    });
    res.end();
})

app.post("/screening/create",function(req,res,next){
    let sqlQuery = `INSERT INTO screening (screen, movie_id, show_date, show_time) 
                    VALUES (${req.body.screen}, ${req.body.movie_id}, ${req.body.show_date},
                    ${req.body.show_time});`;
    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
})

app.get("/screening/readAll",function(req,res,next){
    let sqlQuery = `SELECT * FROM screening`
    db.query(sqlQuery, (err, results) => {
        console.log(results);
        res.json(results);
    });
})

app.put("/screening/update/:id",function(req,res,next){
    let sqlQuery = `UPDATE screening SET screen = ${req.body.screen}, movie_id = ${req.body.movie_id}, show_date = ${req.body.show_date}, show_time = ${req.body.show_time}, WHERE id = ${req.params.id}; `;

    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
})

app.get("/screening/delete/:id",function(req,res,next){
    let sqlQuery = `DELETE from screening WHERE id = ${req.params.id}`
    db.query(sqlQuery, (err,results) => {
        console.log(results);
    });
    res.end();
})

// End points go here



app.listen(4005);
console.log("-- Server Listening ---");