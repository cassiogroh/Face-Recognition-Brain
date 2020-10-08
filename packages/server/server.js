const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const sqlite3 = require('sqlite3').verbose();

// const newdb = new sqlite3.Database("./database/database.sqlite");

// newdb.run(`
//     CREATE TABLE IF NOT EXISTS login (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         hash VARCHAR(100) NOT NULL,
//         email TEXT UNIQUE
//     )
// `);

// newdb.run(`
//     CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name VARCHAR(100) NOT NULL,
//         email TEXT UNIQUE,
//         entries BIGINT,
//         joined TIMESTAMP
//     )
// `);

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/database.sqlite'
    },
    useNullAsDefault: true,
})
// const db = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: '123',
//         database: 'postgres'
//     }
// });

// db.select('*').from('users');
app.use(express.json()); // enabling req.body
app.use(cors());

app.get('/', (req, res) => {res.send(database.users)});
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.listen(process.env.PORT || 3333, () => {
    console.log(`app is ruinning on port ${process.env.PORT || '3333'}`);
});