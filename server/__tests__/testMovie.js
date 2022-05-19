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
        console.log(database);
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

    it('should create a movie', (done) => {
        chai.request(server).post('/movie/create').send({
            movie_name: "Batman the dark knight",
            director: "Gregory",
            actors: "Mohamed, Jonah, Merisa, Denzel",
            img: "testImage",
            classification: "class"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(201);
            expect(res.text).to.equal("Movie Created");
            return done();
        });
    });

    it("should return a movie, when given movie name", (done) => {
        chai.request(server).get('/movie/read/screening/Doctor%20Strange%20in%20the%20Multiverse%20of%20Madness').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "movie_id": 1,
                    "movie_name": "Doctor Strange in the Multiverse of Madness",
                    "screening_id": 1,
                    "screen": 2,
                    "show_date": "2022-06-09T23:00:00.000Z",
                    "show_time": "10:30:00"
                }
            ]);
            return done();
        });
    });

    it("should read all movies", (done) => {
        chai.request(server).get('/movie/read').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    id: 1,
                    movie_name: 'Doctor Strange in the Multiverse of Madness',
                    director: 'Sam Raimi',
                    actors: 'Benedict Cumberbatch, Elizabeth Olsen, Chiwetel Ejiofor, Benedict Wong',
                    img: 'https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_UY1200_CR90,0,630,1200_AL_.jpg',
                    classification: 'PG-13'
                }
            ]);
            return done();
        });
    });

    it("should read by Id", (done) => {
        chai.request(server).get('/movie/read/1').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "movie_name": "Doctor Strange in the Multiverse of Madness",
                    "director": "Sam Raimi",
                    "actors": "Benedict Cumberbatch, Elizabeth Olsen, Chiwetel Ejiofor, Benedict Wong",
                    "img": "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_UY1200_CR90,0,630,1200_AL_.jpg",
                    "classification": "PG-13"
                }
            ]);
            return done();
        });
    });

    it("should seach movies for a movie like", (done) => {
        chai.request(server).get('/movie/searchMovie/Doctor').end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([
                {
                    "id": 1,
                    "movie_name": "Doctor Strange in the Multiverse of Madness",
                    "director": "Sam Raimi",
                    "actors": "Benedict Cumberbatch, Elizabeth Olsen, Chiwetel Ejiofor, Benedict Wong",
                    "img": "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_UY1200_CR90,0,630,1200_AL_.jpg",
                    "classification": "PG-13"
                }
            ]);
            return done();
        });
    });

    it("should update a given entry where id = x", (done) => {
        chai.request(server).put("/movie/update/1").send({
            movie_name: "Batman the dark knight",
            director: "Gregory",
            actors: "Mohamed, Jonah, Merisa, Denzel",
            img: "testImage",
            classification: "class"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(204);
            return done();
        });
    });

    it("should delete a movie where id = x", (done) => {
        chai.request(server).del("/movie/delete/1").end((err, res) => {
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