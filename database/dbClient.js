const { Client } = require('pg')
exports.fmcDb = new Client({
    user: "findmyclub",
    host: "findmyclub-psql-prod.cjlpccad0g8q.us-east-2.rds.amazonaws.com",
    database: "findmyclub",
    password: "3v3YBn3bwqtJ",
    port: "5432"
})