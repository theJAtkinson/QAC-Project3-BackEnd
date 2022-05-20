const { before, describe, it } = require('mocha');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const mysql = require("mysql");
const {database} = require("../config.js");
const { readFileSync } = require("fs");
const server = require("../server.js")

chai.use(chaiHttp);

describe("CRUD route testing for Posts", () => {
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

    it('should create a post', (done) => {
        chai.request(server).post('/post/create').send({
            "movie_id": 1,
            "title": "test",
            "body": "Ltest",
            "rating": 5,
            "fullname": "test"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(201);
            expect(res.text).to.equal("Post Created");
            return done();
        });
    });

    it("should read all posts", (done) => {
        chai.request(server).get('/post/read').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "movie_name": "Doctor Strange in the Multiverse of Madness",
                    "title": "Amazing Film",
                    "body": "Look what they've done to my boy",
                    "rating": 5,
                    "fullname": "Mohamed Javaleil"
                }
            ]);
            return done();
        });
    });

    it("should read by Id", (done) => {
        chai.request(server).get('/post/read/1').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "movie_id": 1,
                    "title": "Amazing Film",
                    "body": "Look what they've done to my boy",
                    "rating": 5,
                    "fullname": "Mohamed Javaleil"
                }
            ]);
            return done();
        });
    });


    it("should update a given entry where id = x", (done) => {
        chai.request(server).put("/post/update/1").send({
            "movie_id": 1,
            "title": "test",
            "body": "Ltest",
            "rating": 5,
            "fullname": "test"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(204);
            return done();
        });
    });

    it("should delete an post where id = x", (done) => {
        chai.request(server).del("/post/delete/1").end((err, res) => {
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