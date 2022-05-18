const { before, describe, it } = require('mocha');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const mysql = require("mysql");
const {database} = require("../config.js");
const { readFileSync } = require("fs");
const server = require("../server.js")

chai.use(chaiHttp);

describe("CRUD route testing for movies", () => {
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

    it('should create a booking', (done) => {
        chai.request(server).post('/booking/create').send({
            "fullname": "Sdsfds",
            "email": "test@test.com",
            "no_adult": 1,
            "no_child": 5,
            "no_concession": 2,
            "screening_id": 1
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(201);
            expect(res.text).to.equal("Booking Created");
            return done();
        });
    });

    it("should read all bookings", (done) => {
        chai.request(server).get('/booking/read').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "fullname": "Shafeeq",
                    "email": "shafeeq@shafeeq.com",
                    "no_adult": 10,
                    "no_child": 5,
                    "no_concession": 3,
                    "screening_id": 1
                }
            ]);
            return done();
        });
    });

    it("should read by Id", (done) => {
        chai.request(server).get('/booking/read/1').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "fullname": "Shafeeq",
                    "email": "shafeeq@shafeeq.com",
                    "no_adult": 10,
                    "no_child": 5,
                    "no_concession": 3,
                    "screening_id": 1
                }
            ]);
            return done();
        });
    });


    it("should update a given entry where id = x", (done) => {
        chai.request(server).put("/booking/update/1").send({
            "fullname": "Shafeeq",
            "email": "the@thr.com",
            "no_adult": 10,
            "no_child": 5,
            "no_concession": 3,
            "screening_id": 1
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(204);
            return done();
        });
    });

    it("should delete a booking where id = x", (done) => {
        chai.request(server).del("/booking/delete/1").end((err, res) => {
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