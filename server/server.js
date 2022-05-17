const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const movieRoutes = require('./routes/movie.js');
const screeningRoutes = require('./routes/screening.js');
const bookingRoutes = require("./routes/booking.js");
const postRoutes = require("./routes/post.js");
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

// - Failed endpoints -
app.use("*",(req, res, next) => next({status:404, message: "End Point Doesn't exist, or code is bad :)"}));

// -- Error Handling --
app.use(({status, message}, req, res, next) => {
    if(!status) return res.send(message);
    return res.status(status).send(message);
});


const server = app.listen(4005, () => {
    console.log("-- Server Listening ---");
    console.log("port: ", server.address().port);
});
