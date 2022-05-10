const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

// routes
const emailRoutes = require('./routes/email.js');
const postRoutes = require("./routes/posts.js");
const bookingRoutes = require("./routes/booking.js");

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

startList = [pathNameFeedback, bodyparser.json(), bodyparser.urlencoded({extended: true}), bodyFeedback];

app.use(startList, cors());

// ---- End points ----

// -- Bookings --
app.use("/booking", bookingRoutes);

// -- Posts --
app.use("/post", postRoutes);

// -- Emails --
app.use("/email", emailRoutes);


app.listen(4005, () => {
    console.log("-- Server Listening ---");
});