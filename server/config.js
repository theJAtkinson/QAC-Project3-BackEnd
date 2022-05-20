const database = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": process.env.NODE_ENV === 'test' ? "cinematest" : "cinema",
    "multipleStatements": process.env.NODE_ENV === 'test' ? true : false,
};

module.exports = { database };