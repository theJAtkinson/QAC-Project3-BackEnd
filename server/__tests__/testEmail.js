const { before, describe, it } = require('mocha');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const mysql = require("mysql");
const {database} = require("../config.js");
const { readFileSync } = require("fs");
const server = require("../server.js")

chai.use(chaiHttp);

describe("CRUD route testing for Emails", () => {
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

    it('should create a email', (done) => {
        chai.request(server).post('/email/create').send({
                "fullname": "test",
                "title": "test",
                "body": "test",
                "email": "test"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(201);
            expect(res.text).to.equal("Email Created");
            return done();
        });
    });

    it("should read all emails", (done) => {
        chai.request(server).get('/email/read').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "fullname": "Jenny Jenkins",
                    "title": "Huh?",
                    "body": "How do I use your complicated website?",
                    "email": null
                }
            ]);
            return done();
        });
    });

    it("should read by Id", (done) => {
        chai.request(server).get('/email/read/1').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "fullname": "Jenny Jenkins",
                    "title": "Huh?",
                    "body": "How do I use your complicated website?",
                    "email": null
                }
            ]);
            return done();
        });
    });


    it("should update a given entry where id = x", (done) => {
        chai.request(server).put("/email/update/1").send({
            "fullname": "test2",
            "title": "test2",
            "body": "test2",
            "email": "test"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(204);
            return done();
        });
    });

    it("should delete an email where id = x", (done) => {
        chai.request(server).del("/email/delete/1").end((err, res) => {
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