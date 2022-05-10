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

startList = [pathNameFeedback, bodyparser.json(), bodyparser.urlencoded({extended: true}), bodyFeedback];

app.use(startList, cors());

// End points go here



app.listen(4005);
console.log("-- Server Listening ---");