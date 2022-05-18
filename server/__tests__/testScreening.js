const { before, describe, it } = require('mocha');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const mysql = require("mysql");
const {database} = require("../config.js");
const { readFileSync } = require("fs");
const server = require("../server.js")

chai.use(chaiHttp);

describe("CRUD route testing for Screenings", () => {
    beforeEach((done) => {
        const db = mysql.createConnection(database);
        db.connect();
        const path = "../cinema-test-schema.sql";
        let file = readFileSync(path, 'utf8');
        let sqlQuery = file.replace(/[\r\n]/gm, '');
        db.query(sqlQuery, (err) => {
            if(err) console.log(err);
            return done();
        });
    });

    it('should create a screening', (done) => {
        chai.request(server).post('/screening/create').send({
            "screen": 3,
            "movie_id": 1,
            "show_date": "2022-06-09T23",
            "show_time": "10:30:00"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(201);
            expect(res.text).to.equal("Screening Created");
            return done();
        });
    });

    it("should read all screenings", (done) => {
        chai.request(server).get('/screening/read').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "screen": 2,
                    "movie_id": 1,
                    "show_date": "2022-06-09T23:00:00.000Z",
                    "show_time": "10:30:00"
                }
            ]);
            return done();
        });
    });

    it("should update a given entry where id = x", (done) => {
        chai.request(server).put("/screening/update/1").send({
            "id": 1,
            "screen": 5,
            "movie_id": 1,
            "show_date": "2022-06-09",
            "show_time": "10:30:00"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(204);
            return done();
        });
    });

    it("should delete an screening where id = x", (done) => {
        chai.request(server).del("/screening/delete/1").end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(204);
            return done();
        });
    });

    after((done) => {
        const db = mysql.createConnection(database);
        db.connect();
        db.query("DROP TABLE IF EXISTS email_form; DROP TABLE IF EXISTS post; DROP TABLE IF EXISTS booking; DROP TABLE IF EXISTS screening;DROP TABLE IF EXISTS movie;", (err) => {
            if(err) console.log(err);
            return done();
        });
    });
});