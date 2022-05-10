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
        console.log(results);
    });
    res.end();
}

function deleteBooking(req, res) {
    let sqlQuery = `DELETE FROM booking WHERE id = ${req.body.id}`;
    db.query(sqlQuery, (err, results) => {
        console.log(results);
    });
    res.end();
}

startList = [pathNameFeedback, bodyparser.json(), bodyparser.urlencoded({extended: true}), bodyFeedback];

app.use(startList, cors());

// End points go here




// --- Bookings ---
// Create
app.post("/bookings/create", addBooking);

// Read
app.get("/bookings/read", readBookings);

// Update
app.put("/bookings/update", updateBooking);

// Delete
app.delete("/bookings/delete", deleteBooking);



app.listen(4005);
console.log("-- Server Listening ---");