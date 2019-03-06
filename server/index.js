require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const pg = require('pg');
const pgSession = require('connect-pg-simple')(session)

// CONTROLLERS
const ac = require('./controllers/auth_controller');
const tc = require('./controllers/task_controller');
const gc = require('./controllers/goal_controller');
const thxc = require('./controllers/thanks_controller');
const ec = require ('./controllers/excite_controller');
const stc = require('./controllers/sub_task_controller');
const sgc = require('./controllers/sub_goal_controller');

// .ENV
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

// MIDDLEWARE
const app = express();

const pgPool = new pg.Pool({
    connectionString: CONNECTION_STRING
})

app.use(express.json());

app.use(session({
    store: new pgSession({
        pool: pgPool,
        pruneSessionInterval: 60 * 60 * 24
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
    app.listen(SERVER_PORT, () => {
        console.log(`${SERVER_PORT} birds flying high!`)
    })
})

//// AUTH ENDPOINTS ////
// app.get('/api/current', ac.getUser);
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
// app.post('/auth/logout', ac.logout);