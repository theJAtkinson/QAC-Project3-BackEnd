const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const movieRoutes = require('./routes/movie.js');
const screeningRoutes = require('./routes/movie.js');
const bookingRoutes = require("./routes/booking.js");
const postRoutes = require("./routes/posts.js");
const emailRoutes = require('./routes/email.js');

let app = express();

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
app.use("/movie", movieRoutes);
app.use("/screening", screeningRoutes);
app.use("/booking", bookingRoutes);
app.use("/post", postRoutes);
app.use("/email", emailRoutes);


// -- Error Handling --
app.use(({status, message}, req, res, next) => {
    if(!status) return next();
    return res.status(status).send(message);
});

// - Failed endpoints -
app.use((req, res) => res.status(404).send("End Point Doesn't exist, or code is bad :)"));

app.listen(4005, () => {
    console.log("-- Server Listening ---");
});