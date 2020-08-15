const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '123',
        database: 'postgres'
    }
});

// db.select('*').from('users');
app.use(express.json()); // enabling req.body
app.use(cors());

app.get('/', (req, res) => {res.send(database.users)});
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is ruinning on port ${process.env.PORT || '3000'}`);
});

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//     console.log(`app is ruinning on port ${PORT}`);
// });

// PORT=3000 node server.js