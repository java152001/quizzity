const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const knexConfig = require('./quizzityDB/knexfile');

const knex = require('knex')(knexConfig[process.env.NODE_ENV.trim()]);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
})

app.post('/api/quiz/create', async (req, res) => {
    const postData = req.body;

    let quizData = {
        title: "Let Us Begin",
        quizStart: postData.quiz.date,
        creationDate: new Date(),
        rounds: postData.rounds,
        joinID: 123456
    }

    try {
        const ids = await knex('quizzes').insert(quizData);
        res.status(201).json(ids);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating new post", error: err })
    }
});

app.get('/api/quiz/:id', async (req, res) => {
    try {
        const ids = await knex('quizzes')
            .where({
                userID: req.params.id
            }).select(
                'id', 'title', 'rounds'
            );
        
            res.status(201).json(ids);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching quiz',  error: err })
    }
})

app.post('/api/user/register', async (req, res) => {
    const postData = req.body;

    let userData = {
        firstName: postData.firstName,
        lastName: postData.lastName,
        email: postData.email,
        password: postData.password
    }

    try {
        const ids = await knex('users').insert(userData);
        res.status(201).json(ids);
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err })
        console.log(err);
    }
});

app.post('/api/user/signin', async (req, res) => {
    const postData = req.body;

    try {
        const userData = await knex('users')
            .where({
                email: postData.email
            }).select(
                'id', 'email', 'password'
            )
        res.status(201).json(userData);
    } catch (err) {
        res.status(500).json({ message: "That user does not exist", error: err });
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('App is listening on http://localhost:' + port);
});

