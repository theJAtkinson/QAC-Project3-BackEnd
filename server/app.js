const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

// routes
const movieRoutes = require('./routes/movie.js');
const screeningRoutes = require('./routes/movie.js');
const bookingRoutes = require("./routes/booking.js");
const postRoutes = require("./routes/posts.js");
const emailRoutes = require('./routes/email.js');

let app = express();

// --- Midware functions ---
// - Terminal Loggers -
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

// ---- Routing ----

// -- Movies --
app.use("/movie", movieRoutes);

// -- Screening --
app.use("/screening", screeningRoutes);

// -- Bookings --
app.use("/booking", bookingRoutes);

// -- Posts --
app.use("/post", postRoutes);

// -- Emails --
app.use("/email", emailRoutes);


app.listen(4005, () => {
    console.log("-- Server Listening ---");
});