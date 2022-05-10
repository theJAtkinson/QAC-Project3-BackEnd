let express = require("express");
let bodyparser = require("body-parser");
let mysql = require("mysql");
let cors = require("cors");

let app = express();

let db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"root",
        database:"cinema"
    }
);
db.connect();

// --- Midware functions ---
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

// ---- API Functions ----

// --- Bookings ---
function addBooking(req, res) {
    let sqlQuery = `INSERT INTO booking(fullname, email, no_adult, no_child, no_concession) VALUES ('${req.body.fullname}', '${req.body.email}', ${req.body.no_adult}, ${req.body.no_child}, ${req.body.no_concession});`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function readBookings(req, res) {
    let sqlQuery = "SELECT * FROM booking;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        res.json(results);
    });
}

function updateBooking(req, res) {
    let sqlQuery = `UPDATE booking SET fullname = '${req.body.fullname}', email = '${req.body.email}', no_adult = ${req.body.no_adult}, no_child = ${req.body.no_child}, no_concession = ${req.body.no_concession} WHERE id = ${req.body.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function deleteBooking(req, res) {
    let sqlQuery = `DELETE FROM booking WHERE id = ${req.body.id}`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

// --- Posts ---
function addPost(req, res) {
    let sqlQuery = `INSERT INTO post(movie_id, title, body, rating, fullname) VALUES (${req.body.movie_id}, '${req.body.title}', '${req.body.body}', ${req.body.rating}, '${req.body.fullname}');`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function readPosts(req, res) {
    let sqlQuery = "SELECT * FROM post;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        res.json(results);
    });
}

function updatePost(req, res) {
    let sqlQuery = `UPDATE post SET movie_id = ${req.body.movie_id}, title = '${req.body.title}', body = '${req.body.body}', rating = ${req.body.rating}, fullname = '${req.body.fullname}', WHERE id = ${req.body.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function deletePost(req, res) {
    let sqlQuery = `DELETE FROM post WHERE id = ${req.body.id}`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

// --- Emails ---
function addEmail(req, res) {
    let sqlQuery = `INSERT INTO email_form(fullname, title, body, email) VALUES ('${req.body.fullname}', '${req.body.title}', '${req.body.body}', '${req.body.email}');`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function readEmails(req, res) {
    let sqlQuery = "SELECT * FROM email_form;";
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
        res.json(results);
    });
}

function updateEmail(req, res) {
    let sqlQuery = `UPDATE email_form SET fullname = '${req.body.fullname}' title = '${req.body.title}', body = '${req.body.body}', email = '${req.body.email}', WHERE id = ${req.body.id};`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

function deleteEmail(req, res) {
    let sqlQuery = `DELETE FROM email_form WHERE id = ${req.body.id}`;
    db.query(sqlQuery, (err, results) => {
        // console.log(results);
    });
    res.end();
}

startList = [pathNameFeedback, bodyparser.json(), bodyparser.urlencoded({extended: true}), bodyFeedback];

app.use(startList, cors());

// ---- End points ----


// -- Bookings --
// Create
app.post("/booking/create", addBooking);

// Read
app.get("/booking/read", readBookings);

// Update
app.put("/booking/update", updateBooking);

// Delete
app.delete("/booking/delete", deleteBooking);


// -- Posts --
// Create
app.post("/post/create", addPost);

// Read
app.get("/post/read", readPosts);

// Update
app.put("/post/update", updatePost);

// Delete
app.delete("/post/delete", deletePost);


// -- Emails --
// Create
app.post("/email/create", addEmail);

// Read
app.get("/email/read", readEmails);

// Update
app.put("/email/update", updateEmail);

// Delete
app.delete("/email/delete", deleteEmail);


app.listen(4005);
console.log("-- Server Listening ---");