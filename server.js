const express = require('express');

const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: '',
        user: '',
        password: '',
        database: ''
    },
    console.log(`Connected to the employees_db database.`)
);
