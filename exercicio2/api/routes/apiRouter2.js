const express = require ('express')
let apiRouterApi2 = express.Router()

const knex = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: "./db.sqlite"
    }
  });

